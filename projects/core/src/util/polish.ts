import { asapScheduler, defer, Observable, of, OperatorFunction } from 'rxjs';
import { audit } from 'rxjs/operators';

export function polish<T>(): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    defer(() => {
      let subNo = 0;
      const trigger = () => (!subNo++ ? of(0) : of(0, asapScheduler));
      return source.pipe(audit(trigger));
    });
}
