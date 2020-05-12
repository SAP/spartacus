import { BehaviorSubject, Observable, Subscriber, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * Allows for dynamic adding and removing source observables
 * and exposes them as one merged observable at a property `output$`.
 *
 * Thanks to the `share()` operator used inside, it subscribes to source observables
 * only when someone subscribes to it. And it unsubscribes from source observables
 * when the counter of consumers drops to 0.
 *
 * **To avoid memory leaks**, all manually added sources should be manually removed
 * when not plan to emit values anymore. In particular closed event sources won't be
 * automatically removed.
 */
export class MergedObservable<T> {
  /**
   * For each source: it stores a subscription responsible for
   * passing all values from source to the consumer
   */

  private subscriptionsToSources = new Map<Observable<T>, Subscription>();

  /**
   * For each source: it stores a subscription responsible for
   * watching if there is an active consumer. Thanks to that,
   * each source can start (or stop) passing values to the consumer
   * appears (or relatively, disappears).
   *
   * We store watchers separately, to allow for disposing them on manual
   * removal of any source, using the method `remove()`.
   */
  private consumerWatchers = new Map<Observable<T>, Subscription>();

  /**
   * Reference to the consumer of the `__output$` observable.
   *
   * Thanks to the `share()` operator piped right after in `$output`,
   * there can be only 0 or 1 consumer of `__output$`.
   *
   * When anyone subscribes to final `output$`, the `share()` operator starts consuming `__output$`.
   * When nobody subscribers to final `output$`, `share()` stops consuming `__output$`.
   */
  private consumer = new BehaviorSubject<Subscriber<any>>(null);

  /**
   * On subscription, it notifies the sources they should pass their values to the consumer.
   * On unsubscription, it notifies the sources they should stop passing values to the consumer.
   */
  readonly __output$: Observable<T> = new Observable<T>((consumer) => {
    this.consumer.next(consumer);
    return () => this.consumer.next(null);
  });

  /**
   * Observable with all sources merged.
   *
   * Only after subscribing to it, under the hood it subscribes to the source observables.
   * When the number of subscribers drops to 0, it unsubscribes from all source observables.
   * But if later on a new subscription starts, it subscribes to the source observables again.
   *
   * It multicasts the emissions, so it subscribes to each source only once,
   * even if there are many subscribers of `output$`.
   */
  readonly output$ = this.__output$.pipe(share());

  /**
   * Registers the given source to pass its values to the `output$` observable.
   *
   * It does nothing, when the source has been already added (but not removed yet).
   */
  add(source: Observable<T>): void {
    if (this.has(source)) {
      return;
    }

    // watch whether the consumer appears or disappears:
    const watcher = this.consumer.subscribe((consumer) => {
      if (consumer) {
        // when appears
        this.bindSourceToConsumer(source, consumer);
      } else {
        // when disappears
        this.unbindSourceFromConsumer(source);
      }
    });

    // store the watcher, so it's possible to dispose it later on demand
    this.consumerWatchers.set(source, watcher);
  }

  /**
   * Starts passing all values from source to consumer
   */
  private bindSourceToConsumer(source: Observable<T>, consumer: Subscriber<T>) {
    const subscriptionToSource = source.subscribe((val) => consumer.next(val)); // passes all emissions from source to consumer
    this.subscriptionsToSources.set(source, subscriptionToSource);
  }

  /**
   * Stops passing all values from source to consumer
   * (if any consumer is active at the moment)
   */
  private unbindSourceFromConsumer(source: Observable<T>) {
    // stop passing all values from source to the consumer
    const subscriptionToSource = this.subscriptionsToSources.get(source);
    if (subscriptionToSource !== undefined) {
      subscriptionToSource.unsubscribe();
      this.subscriptionsToSources.delete(source);
    }
  }

  /**
   * Unregisters the given source so it stops passing its values to `output$` observable.
   *
   * Should be used when a source is no longer maintained **to avoid memory leaks**.
   */
  remove(source: Observable<T>): void {
    // clear binding from source to consumer (if any consumer exists at the moment)
    this.unbindSourceFromConsumer(source);

    // for this source, stop watching the existence of the consumer:
    const watcher = this.consumerWatchers.get(source);
    watcher.unsubscribe();
    this.consumerWatchers.delete(source);
  }

  /**
   * Returns whether the given source has been already addded
   */
  has(source: Observable<T>): boolean {
    return this.consumerWatchers.has(source);
  }
}
