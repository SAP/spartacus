import { asapScheduler, defer, Observable, OperatorFunction } from 'rxjs';
import { audit } from 'rxjs/operators';

export function polish<T>(): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    defer(() => {
      let subNo = 0;

      const trigger = new Observable((subscriber) => {
        const action = () => {
          subscriber.next();
          subscriber.complete();
        };

        if (!subNo++) {
          asapScheduler.schedule(action);
        } else {
          action();
        }
      });

      return source.pipe(audit(() => trigger));
    });
}
