import { ExpressServerLogger, ExpressServerLoggerContext } from '../../loggers';
import { parseTraceparent } from '../../loggers/w3c-trace-context/parse-traceparent';
import { ExpressLogTransformer } from '../express-log-transformer';

export class DefaultTraceparentTransformer implements ExpressLogTransformer {
  transform(
    message: string,
    context: ExpressServerLoggerContext,
    logger?: ExpressServerLogger
  ): [string, ExpressServerLoggerContext] {
    const request = context.request;
    if (!request) {
      return [message, context];
    }

    try {
      const traceContext = parseTraceparent(request.header('traceparent'));
      if (traceContext) {
        context.traceContext = traceContext;
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error && e.message
          ? e.message
          : 'Unexpected error while parsing traceparent header';
      logger?.error(errorMessage, context);
    }

    return [message, context];
  }
}
