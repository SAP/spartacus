import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

export function bufferDebounceTime<T>(
  time: number = 0
): OperatorFunction<T, T[]> {
  return (source: Observable<T>) => {
    let bufferedValues: T[] = [];

    return source.pipe(
      tap(value => bufferedValues.push(value)),
      debounceTime(time),
      map(() => bufferedValues),
      tap(() => (bufferedValues = []))
    );
  };
}
