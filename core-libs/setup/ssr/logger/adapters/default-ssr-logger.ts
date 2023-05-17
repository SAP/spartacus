import { inject } from '@angular/core';
import { LogMetadata, SsrLogger, ssrLoggerToken } from '../ssr-logger';

/**
 * Factory provides logger that's used for pre-rendering purposes.
 */
export const ssrLoggerFactory = () => {
  const originalSsrLogger = inject(ssrLoggerToken, {
    skipSelf: true,
    optional: true,
  });
  return originalSsrLogger || new DefaultSsrLogger();
};

export class DefaultSsrLogger extends SsrLogger {
  log(message: string, context?: LogMetadata) {
    console.log({
      message,
      context: { timestamp: new Date().toISOString(), ...context },
    });
  }
  error(message: string, context?: LogMetadata) {
    console.error({ message, context });
  }
  warn(message: string, context?: LogMetadata) {
    console.warn({ message, context });
  }
}
