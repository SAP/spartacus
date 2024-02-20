/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OperatorFunction, timer } from 'rxjs';
import { retry } from 'rxjs/operators';
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
 * @param options such as defining `maxTries`, or `delay`
 * @returns either the original error (if the given `errFn` return `false`), or the
 */
export function backOff<T>(options?: BackOffOptions): OperatorFunction<T, T> {
  const shouldRetry = options?.shouldRetry ?? (() => true);
  const maxTries = options?.maxTries ?? 3;
  const delay = options?.delay ?? 300;

  return (source$) =>
    source$.pipe(
      // retries the source stream in case of an error.
      retry({
        delay: (attemptError: HttpErrorModel | Error, currentRetry) => {
          // if we've re-tried more than the maxTries, OR
          // if the source error is not the one we want to exponentially retry
          if (currentRetry > maxTries || !shouldRetry(attemptError)) {
            throw attemptError;
          }

          // exponential
          const exponent = currentRetry * currentRetry;
          // back-off
          return timer(exponent * delay);
        },
      })
    );
}
