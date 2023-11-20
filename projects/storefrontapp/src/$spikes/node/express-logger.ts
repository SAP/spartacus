import { ExpressServerLogger } from '@spartacus/setup/ssr';
import { Express } from 'express';

const loggerPropertyKey = 'spike-logger';

export function setLogger(server: Express, logger: ExpressServerLogger) {
  server.set(loggerPropertyKey, logger);
}

export function getLogger(server: Express): ExpressServerLogger {
  return server.get(loggerPropertyKey) as ExpressServerLogger;
}
