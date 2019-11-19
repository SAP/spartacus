import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, reduce } from 'rxjs/operators';

export function resolveValuesBy(
  object: Object,
  resolver: (any) => Observable<any>
): Observable<any> {
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

export function resolveObjectBy(
  object: Object,
  resolver: (any) => Observable<any>
): Observable<any> {
  return resolveValuesBy(object, resolver).pipe(
    reduce((acc, val) => Object.assign(acc, ...val), {})
  );
}

export function resolveKeyAndValueBy(
  object: Object,
  resolver: (any) => Observable<any>
): Observable<Array<{ key: string; value: string }>> {
  return resolveValuesBy(object, resolver).pipe(
    map(arr =>
      arr.map(item => {
        const key = Object.keys(item)[0];
        return { key, value: item[key] };
      })
    )
  );
}
