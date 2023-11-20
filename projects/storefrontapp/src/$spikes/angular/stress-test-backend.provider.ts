// stress test caller service

import {
  APP_INITIALIZER,
  inject,
  InjectionToken,
  Provider,
} from '@angular/core';
import { LoggerService, OccConfig } from '@spartacus/core';
import { QueryParamsService } from './query-params.service';
import { StressTestBackendService } from './stress-test-backend.service';

export const STRESS_TEST_URL = new InjectionToken<string>('stressTestUrl', {
  providedIn: 'root',
  factory: () => {
    const queryParams = inject(QueryParamsService).queryParams;
    const occConfig = inject(OccConfig)?.backend?.occ ?? {};

    // build backend URL
    // Default: basesites endpoint
    let url =
      queryParams.backendUrl ??
      `${occConfig.baseUrl}${occConfig.prefix}basesites`;
    url += queryParams.backendUrlFields
      ? `?fields=${queryParams.backendUrlFields}`
      : '';

    return url;
  },
});

export const stressTestBackend_APP_INITIALIZER = () => {
  const stressTestBackendService = inject(StressTestBackendService);
  const url = inject(STRESS_TEST_URL);

  const logger = inject(LoggerService);
  logger.debug({ stressTestBackend_APP_INITIALIZER });

  const queryParams = inject(QueryParamsService).queryParams;
  const numberOfCalls = Number(queryParams.backendCallsNumber ?? 1);

  return () =>
    stressTestBackendService.callBackend(url, numberOfCalls).toPromise();
};

export const stressTestBackendProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: stressTestBackend_APP_INITIALIZER,
  multi: true,
};
