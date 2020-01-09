import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, reduce } from 'rxjs/operators';

export function resolveValuesBy<O extends { [key: string]: IN }, IN, OUT>(
  object: O,
  resolver: (IN) => Observable<OUT>
): Observable<Array<{ [Key in keyof Partial<O>]: OUT }>> {
  return of(object).pipe(
    mergeMap(obj =>
      forkJoin(
        ...Object.keys(obj).map(key =>
          resolver(obj[key]).pipe(map(response => ({ [key]: response })))
        )
      )
    )
  );
}

export function resolveObjectBy<O extends { [key: string]: IN }, IN, OUT>(
  object: O,
  resolver: (IN) => Observable<OUT>
): Observable<{ [Key in keyof O]: OUT }> {
  return resolveValuesBy(object, resolver).pipe(
    reduce((acc, val) => Object.assign(acc, ...val), {})
  );
}

export function resolveKeyAndValueBy<O extends { [key: string]: IN }, IN, OUT>(
  object: O,
  resolver: (IN) => Observable<OUT>
): Observable<Array<{ key: keyof O; value: OUT }>> {
  return resolveValuesBy(object, resolver).pipe(
    map(arr =>
      arr.map(item => {
        const key = Object.keys(item)[0];
        return { key, value: item[key] };
      })
    )
  );
}
