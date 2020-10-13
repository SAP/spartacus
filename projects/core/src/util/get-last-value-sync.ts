import { Observable } from 'rxjs';

export function getLastValueSync<T>(source: Observable<T>): T | undefined {
  let value: T | undefined;
  source.subscribe((emission) => (value = emission)).unsubscribe();
  return value;
}
