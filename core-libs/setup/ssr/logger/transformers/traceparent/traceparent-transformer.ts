import { ExpressServerLogger, ExpressServerLoggerContext } from '../../loggers';
import { ExpressLogTransformer } from '../express-log-transformer';

export abstract class TraceparentTransformer implements ExpressLogTransformer {
  abstract transform(
    message: string,
    context: ExpressServerLoggerContext,
    logger?: ExpressServerLogger
  ): [string, ExpressServerLoggerContext];
}
