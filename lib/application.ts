import { ApplicationPackage, FilePath, readPackage } from './application-package';
import { applicationRenderReadme } from './application-render-readme';
import { logger } from './logger';
import * as fastify from 'fastify';
import * as http from 'http';
import symbols = require('fastify/lib/symbols');

type ContentTypeParser = fastify.ContentTypeParser<HttpRequest>;
type Headers = fastify.DefaultHeaders;
type HttpRequest = http.IncomingMessage;
type HttpResponse = http.ServerResponse;
type HttpServer = http.Server;
type Instance = fastify.FastifyInstance<HttpServer, HttpRequest, HttpResponse>;
type Params = fastify.DefaultParams;
type Query = fastify.DefaultQuery;
type Request<T = any> = fastify.FastifyRequest<HttpRequest, Query, Params, Headers, T>;
type Response = fastify.FastifyReply<HttpResponse>;

export enum MimeTypes {
  ApplicationJson = 'application/json',
  ApplicationVndApiJson = 'application/vnd.api+json',
  TextHtml = 'text/html',
  TextPlain = 'text/plain',
}

const AvailableMimeTypes = Reflect.ownKeys(MimeTypes)
  .map(k => Reflect.get(MimeTypes, k.toString()) as string);

const jsonapi = Object.freeze({ version: '1.0' });

const { kContentTypeParser } = symbols;

const jsonapiSerializer = JSON.stringify.bind(JSON);

const isMimeAny = /\*\/\*/;
const isMimeText = /text\/html/;

function mimeTypeForResponse(request: Request, defaultType: MimeTypes = MimeTypes.ApplicationJson): string {
  const { ['content-type']: _contentType } = request.headers;
  const [ contentType, ..._ ] = _contentType.split(';');

  if (AvailableMimeTypes.some(v => v === contentType)) {
    return contentType;
  } else {
    return defaultType;
  }
}

function jsonapiSerializeBasicError(title: string, code: number = 400): Readonly<{}> {
  return Object.freeze({
    jsonapi,
    errors: [{ code, title }]
  });
}

function jsonapiSerializeError({ message: detail, name: title }: Error, code: number = 400): Readonly<{}> {
  return Object.freeze({
    jsonapi,
    errors: [{ code, title, detail }]
  });
}

function jsonapiSerialize<Data = {}>(data: Data): Readonly<{}> {
  return Object.freeze({
    jsonapi,
    data
  });
}

function getContentParser(instance: Instance, as: string): ContentTypeParser {
  const { customParsers } = Reflect.get(instance, kContentTypeParser);
  const { [as]: contentTypeParser } = customParsers;

  return contentTypeParser;
}

function injectContentParser(instance: Instance, as: string, contentTypeParser: ContentTypeParser) {
  Reflect.set(Reflect.get(Reflect.get(instance, kContentTypeParser), 'customParsers'), as, contentTypeParser);
  Reflect.get(Reflect.get(instance, kContentTypeParser), 'parserList').unshift(as);
}

export interface Application<IncomingPayload = {}, OutgoingPayload = {}> {
  beforePerform(): Promise<void>;
  perform(payload: IncomingPayload): Promise<OutgoingPayload>;
  afterPerform(): Promise<void>;
  start(): Promise<string>;
}

export interface ApplicationConstructor<IncomingPayload = {}, OutgoingPayload = {}> {
  new(applicationPackage: ApplicationPackage, applicationPath: FilePath, port?: number): Application<IncomingPayload, OutgoingPayload>;
}

export abstract class AbstractApplication<IncomingPayload = {}, OutgoingPayload = {}> implements Application {
  protected instance: Instance;
  protected applicationPackage: ApplicationPackage;
  protected applicationPath: FilePath;
  protected port: number = 7000;

  constructor(applicationPackage: ApplicationPackage, applicationPath: FilePath, port?: number) {
    this.instance = fastify({ logger });
    this.applicationPackage = applicationPackage;
    this.applicationPath = applicationPath;

    if (port) {
      this.port = port;
    }

    injectContentParser(this.instance, MimeTypes.ApplicationVndApiJson,
      getContentParser(this.instance, MimeTypes.ApplicationJson));

    this.instance.get('*', this.get.bind(this));
    this.instance.post('*', this.post.bind(this));
  }

  async beforePerform(): Promise<void> {

  }

  async perform(payload: IncomingPayload): Promise<OutgoingPayload> {
    return;
  }

  async afterPerform(): Promise<void> {

  }

  async start(): Promise<string> {
    try {
      return await this.instance.listen(this.port, '0.0.0.0');
    } catch (error) {
      logger.error(error);

      throw error;
    }
  }

  protected async get(request: Request, response: Response): Promise<Response> {
    try {
      const accept: string = (Reflect.has(request.headers, 'accept') &&
        Reflect.get(request.headers, 'accept') || '*/*');

      if (isMimeText.test(accept) || isMimeAny.test(accept)) {
        return response
          .code(200)
          .type(MimeTypes.TextHtml)
          .send(await applicationRenderReadme(this.applicationPackage, this.applicationPath));
      } else {
        return response
          .code(404)
          .type(MimeTypes.TextPlain)
          .send('not found');
      }
    } catch(error) {
      logger.error(error);

      throw error;
    }
  }

  protected async post(request: Request<IncomingPayload>, _response: Response): Promise<Response> {
    const response = _response
      .type(mimeTypeForResponse(request))
      .serializer(jsonapiSerializer);

    try {
      await this.beforePerform();

      return response
        .code(201)
        .send(jsonapiSerialize(await this.perform(request.body)));
    } catch (error) {
      if (error instanceof Error) {
        return response
          .code(400)
          .send(jsonapiSerializeError(error));
      } else {
        return response
          .code(400)
          .send(jsonapiSerializeBasicError(error));
      }
    } finally {
      await this.afterPerform();
    }
  }
}
