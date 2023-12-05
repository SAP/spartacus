import { OperatorFunction } from 'rxjs';
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
export declare function backOff<T>(options?: BackOffOptions): OperatorFunction<T, T>;
