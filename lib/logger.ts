import pino from 'pino';

export { Logger } from 'pino';

const prettyPrint = !((Reflect.has(process.env, 'NODE_ENV')) &&
  ((Reflect.get(process.env, 'NODE_ENV') as string).toLowerCase() === 'production'));

export const logger: pino.Logger = pino({ prettyPrint });
