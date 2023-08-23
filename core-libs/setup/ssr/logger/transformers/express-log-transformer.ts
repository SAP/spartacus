import { ExpressServerLogger, ExpressServerLoggerContext } from '../loggers';

export interface ExpressLogTransformer {
  transform(
    message: string,
    context: ExpressServerLoggerContext,
    logger?: ExpressServerLogger
  ): [string, ExpressServerLoggerContext];
}
