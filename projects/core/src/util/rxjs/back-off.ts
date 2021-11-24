import {
  Observable,
  of,
  OperatorFunction,
  range,
  throwError,
  timer,
  zip,
} from 'rxjs';
import { map, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { HttpErrorModel } from '../../model/misc.model';

export interface BackOffOptions {
  /**
   * Function which evaluates if the given error should be handled exponentially.
   *
   * If it returns false, the error is re-thrown.
   * Otherwise, the operation is retried.
   */
  shouldRetry: (err: HttpErrorModel | Error) => boolean;

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
export function backOff<T>(options: BackOffOptions): OperatorFunction<T, T> {
  const maxTries = options.maxTries ?? 3;
  const delay = options.delay ?? 300;

  // creates a range of maximum retries - starting from 1, up until the given `maxTries`
  const maxRetryRange$ = range(1, maxTries + 1);

  return (source$) =>
    source$.pipe(
      // retries the source stream in case of an error.
      retryWhen<T>((sourceError$: Observable<HttpErrorModel | Error>) =>
        // emits only when both emit at the same time. In practice, this means emit when retried and the error happens again
        zip(maxRetryRange$, sourceError$).pipe(
          tap(([x, y]) => console.log('1', [x, y])),
          mergeMap(([currentRetry, sourceError]) => {
            console.log('called', [currentRetry, sourceError]);
            // if we've re-tried more than the maxTries, OR
            // if the source error is not the one we want to exponentially retry
            if (currentRetry > maxTries || !options.shouldRetry(sourceError)) {
              return throwError(sourceError);
            }

            return of(currentRetry);
          }),
          // exponential retries
          map((currentRetry) => currentRetry * currentRetry),
          // exponential back-off
          mergeMap((exponent) => timer(exponent * delay))
        )
      )
    );
}
