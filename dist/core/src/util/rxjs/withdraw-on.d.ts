import { Observable, OperatorFunction } from 'rxjs';
/**
 *
 * Withdraw from the source observable when notifier emits a value
 *
 * Withdraw will result in resubscribing to the source observable
 * Operator is useful to kill ongoing emission transformation on notifier emission
 *
 * @param notifier
 */
export declare function withdrawOn<T>(notifier: Observable<any>): OperatorFunction<T, T>;
