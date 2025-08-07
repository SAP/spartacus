import { MonoTypeOperatorFunction, Observable } from 'rxjs';

/**
 * Disconnects the observable emission chain immediately, but delays unsubscribing from
 * the inner observable for the specified time.
 *
 * This will leave the inner observable with an open subscription until the timeout.  None
 * of the emissions from the inner observable will be passed to the outer observable while
 * the timeout is progressing.
 *
 */
export function delayUnsubscribe<T>(options: { delayInMs: number }) {
  const { delayInMs } = options;

  const operator: MonoTypeOperatorFunction<T> = (inner) => {
    return new Observable((subscriber) => {
      let disconnected = false;

      const subscription = inner.subscribe({
        next: (value) => {
          if (disconnected) return;
          subscriber.next(value);
        },
        error: (error) => {
          if (disconnected) return;
          subscriber.error(error);
        },
        complete: () => {
          if (disconnected) return;
          subscriber.complete();
        },
      });
      return {
        unsubscribe() {
          disconnected = true;
          setTimeout(() => subscription.unsubscribe(), delayInMs);
        },
      };
    });
  };
  return operator;
}
