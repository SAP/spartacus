import { Observable, Subscriber, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';

// PRIVATE API

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
export class MergingSubject<T> {
  /**
   * List of already added sources (but not removed yet)
   */
  private sources: Observable<T>[] = [];

  /**
   * For each source: it stores a subscription responsible for
   * passing all values from source to the consumer
   */
  private subscriptionsToSources = new Map<Observable<T>, Subscription>();

  /**
   * Observable with all sources merged.
   *
   * Only after subscribing to it, under the hood it subscribes to the source observables.
   * When the number of subscribers drops to 0, it unsubscribes from all source observables.
   * But if later on something subscribes to it again, it subscribes to the source observables again.
   *
   * It multicasts the emissions for each subscriber.
   */
  readonly output$: Observable<T> = new Observable<T>((consumer) => {
    // There can be only 0 or 1 consumer of this observable coming from the `share()` operator
    // that is piped right after this observable.
    // `share()` not only multicasts the results but also  When all end-subscribers unsubscribe from `share()` operator, it will unsubscribe
    // from this observable (by the nature `refCount`-nature of the `share()` operator).

    this.consumer = consumer;
    this.bindAllSourcesToConsumer(consumer);

    return () => {
      this.consumer = null;
      this.unbindAllSourcesFromConsumer();
    };
  }).pipe(share());

  /**
   * Reference to the subscriber coming from the `share()` operator piped to the `output$` observable.
   * For more, see docs of the `output$` observable;
   */
  private consumer: Subscriber<any> = null;

  /**
   * Registers the given source to pass its values to the `output$` observable.
   *
   * It does nothing, when the source has been already added (but not removed yet).
   */
  add(source: Observable<T>): void {
    if (this.has(source)) {
      return;
    }

    if (this.consumer) {
      this.bindSourceToConsumer(source, this.consumer);
    }
    this.sources.push(source);
  }

  /**
   * Starts passing all values from already added sources to consumer
   */
  private bindAllSourcesToConsumer(consumer: Subscriber<T>) {
    this.sources.forEach((source) =>
      this.bindSourceToConsumer(source, consumer)
    );
  }

  /**
   * Stops passing all values from already added sources to consumer
   * (if any consumer is active at the moment)
   */
  private unbindAllSourcesFromConsumer() {
    this.sources.forEach((source) => this.unbindSourceFromConsumer(source));
  }

  /**
   * Starts passing all values from a single source to consumer
   */
  private bindSourceToConsumer(source: Observable<T>, consumer: Subscriber<T>) {
    const subscriptionToSource = source.subscribe((val) => consumer.next(val)); // passes all emissions from source to consumer
    this.subscriptionsToSources.set(source, subscriptionToSource);
  }

  /**
   * Stops passing all values from a single source to consumer
   * (if any consumer is active at the moment)
   */
  private unbindSourceFromConsumer(source: Observable<T>) {
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

    // remove source from array
    let i: number;
    if ((i = this.sources.findIndex((s) => s === source)) !== -1) {
      this.sources.splice(i, 1);
    }
  }

  /**
   * Returns whether the given source has been already addded
   */
  has(source: Observable<T>): boolean {
    return this.sources.includes(source);
  }
}
