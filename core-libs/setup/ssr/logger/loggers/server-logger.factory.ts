import { inject } from '@angular/core';
import { DefaultServerLogger } from './default-server-logger';
import { serverLoggerToken } from './server-logger';

/**
 * Factory provides logger that's used for pre-rendering purposes.
 */
export const serverLoggerFactory = () => {
  const originalSsrLogger = inject(serverLoggerToken, {
    skipSelf: true,
    optional: true,
  });
  return originalSsrLogger || new DefaultServerLogger();
};
