import {
  DefaultExpressServerLogger,
  ExpressServerLoggerContext,
} from '@spartacus/setup/ssr';
import { pino } from 'pino';

class CustomPinoLogger extends DefaultExpressServerLogger {
  protected pino = pino({
    // custom configuration of the Pino logger
    formatters: {
      level: (label) => ({ level: label }),
    },
    level: 'debug',
  });

  info(message: string, context: ExpressServerLoggerContext): void {
    this.pino.info(this.mapContext(context), message);
  }

  log(message: string, context: ExpressServerLoggerContext): void {
    // Because the console.log() function is an alias for console.info(), we can use the same 'logger.info()' method for both log and info. For more information, see: https://nodejs.org/api/console.html#consoleinfodata-args
    this.pino.info(this.mapContext(context), message);
  }

  warn(message: string, context: ExpressServerLoggerContext): void {
    this.pino.warn(this.mapContext(context), message);
  }

  error(message: string, context: ExpressServerLoggerContext): void {
    this.pino.error(this.mapContext(context), message);
  }

  debug(message: string, context: ExpressServerLoggerContext): void {
    this.pino.debug(this.mapContext(context), message);
  }
}

export const pinoLogger = new CustomPinoLogger();
