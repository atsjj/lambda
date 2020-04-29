import { SerializerFn } from 'pino';

declare const logger: logger.Logger;

declare namespace logger {
  interface Serializers {
    [key: string]: SerializerFn;
  }

  interface Logger {
    serializers: Serializers;
  }
}

export = logger;
