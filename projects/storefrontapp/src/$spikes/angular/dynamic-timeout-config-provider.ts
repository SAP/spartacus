import { inject, Provider } from '@angular/core';
import {
  BackendConfig, LoggerService, provideConfigFactory
} from '@spartacus/core';
import { QueryParamsService } from './query-params.service';

/**
 * Disables the timeout interceptor by default or configures the timeout value, if specified in a query param.
 */
export const dynamicHttpTimeoutConfigProvider: Provider = provideConfigFactory(
  () => {
    const backendTimeoutParam =
      inject(QueryParamsService).queryParams.backendTimeout;

    const backendTimeout = backendTimeoutParam
      ? Number(backendTimeoutParam)
      : undefined;

    // SPIKE TODO REMOVE:
    const logger = inject(LoggerService);
    logger.debug({backendTimeoutParam, backendTimeout});

    return {
      timeout: {
        server: backendTimeout,
      },
    } satisfies BackendConfig as any;
  }
);
