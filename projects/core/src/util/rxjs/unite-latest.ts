import { asapScheduler, combineLatest, defer, Observable } from 'rxjs';
import { audit } from 'rxjs/operators';

type ReturnTypes<T extends Observable<any>[]> = {
  [P in keyof T]: T[P] extends Observable<infer R> ? R : never;
};
type Observables = [Observable<any>] | Observable<any>[];

/**
 * uniteLatest is an alternative to combineLatest. The first emission is
 * emitted synchronously (just like combineLatest) and all following emissions
 * are audited and emitted using asapScheduler.
 *
 * It effectively smooths out emissions when multiple sources will emit at the
 * same time: uniteLatest will have only one emission, where combine latest will
 * have more than one (one per source changed).
 *
 * @param sources
 */
export function uniteLatest<R extends Observables>(
  sources: R
): Observable<ReturnTypes<R>> {
  return defer(() => {
    let subNo = 0;
    const trigger = new Observable((subscriber) => {
      const action = () => {
        subscriber.next();
        subscriber.complete();
      };

      if (subNo) {
        asapScheduler.schedule(action);
      } else {
        action();
      }
      subNo++;
    });

    return combineLatest(sources).pipe(audit(() => trigger));
  }) as any;
}
