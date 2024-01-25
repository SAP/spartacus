/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Observable,
  of,
  OperatorFunction,
  range,
  throwError,
  timer,
  zip,
} from 'rxjs';
import { map, mergeMap, retryWhen } from 'rxjs/operators';
import { HttpErrorModel } from '../../model/misc.model';

/**
 * Options for the back-off operator.
 */
export interface BackOffOptions {
  /**
   * Function which evaluates if the given error should be handled exponentially.
   *
   * If it returns false, the error is re-thrown.
   * Otherwise, the operation is retried.
   */
  shouldRetry?: (err: HttpErrorModel | Error) => boolean;

  /** how many times to perform the back-off. Default value is 3 times. */
  maxTries?: number;

  /** delay in ms. Default value is 300ms. Assuming the maxTries is set to 3, it means the maximum time spent retrying will be: 1*1*300 + 2*2*300 + 3*3*300 = 4200ms (4.2s) */
  delay?: number;
}

/**
 *
 * An operator which performs exponential back-off on the source stream.
 *
 * Source: https://angular.io/guide/practical-observable-usage#exponential-backoff
 *
 * @param errFn for which to perform exponential back-off
 * @param options such as defining `maxTries`, or `delay`
 * @returns either the original error (if the given `errFn` return `false`), or the
 */
export function backOff<T>(options?: BackOffOptions): OperatorFunction<T, T> {
  const shouldRetry = options?.shouldRetry ?? (() => true);
  const maxTries = options?.maxTries ?? 3;
  const delay = options?.delay ?? 300;

  // creates a range of maximum retries - starting from 1, up until the given `maxTries`
  const retry$ = range(1, maxTries + 1);
  return (source$) =>
    source$.pipe(
      // retries the source stream in case of an error.
      retryWhen<T>((attempts$: Observable<HttpErrorModel | Error>) =>
        // emits only when both emit at the same time. In practice, this means: emit when error happens again and retried
        zip(attempts$, retry$).pipe(
          mergeMap(([attemptError, currentRetry]) => {
            // if we've re-tried more than the maxTries, OR
            // if the source error is not the one we want to exponentially retry
            if (currentRetry > maxTries || !shouldRetry(attemptError)) {
              return throwError(attemptError);
            }

            return of(currentRetry);
          }),
          // exponential
          map((currentRetry) => currentRetry * currentRetry),
          // back-off
          mergeMap((exponent) => timer(exponent * delay))
        )
      )
    );
}
