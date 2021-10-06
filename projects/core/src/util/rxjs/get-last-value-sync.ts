import { Observable } from 'rxjs';

/**
 * Will grab last synchronously available value from the observable stream
 * at the time of the call.
 *
 * Should be used with caution, as it's not a legitimate way for getting value
 * from the observable. Observable composition or standard subscribe method
 * should be used for most of the cases.
 *
 * @param source
 */
export function getLastValueSync<T>(source: Observable<T>): T | undefined {
  let value: T | undefined;
  source.subscribe((emission) => (value = emission)).unsubscribe();
  return value;
}
