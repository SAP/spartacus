import { Provider } from '@angular/core';
import { dynamicHttpTimeoutConfigProvider } from './dynamic-timeout-config-provider';
import { HttpLoggerInterceptorProvider } from './http-logger.interceptor';
import { stressTestBackendProvider } from './stress-test-backend.provider';
/**
 * Providers with spike scripts useful for troubleshooting
 */
export const $spikeProviders: Provider[] = [
  dynamicHttpTimeoutConfigProvider,
  HttpLoggerInterceptorProvider,
  stressTestBackendProvider,
];
