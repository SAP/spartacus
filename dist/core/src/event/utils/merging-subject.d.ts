import { Observable } from 'rxjs';
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
export declare class MergingSubject<T> {
    /**
     * List of already added sources (but not removed yet)
     */
    private sources;
    /**
     * For each source: it stores a subscription responsible for
     * passing all values from source to the consumer
     */
    private subscriptionsToSources;
    /**
     * Observable with all sources merged.
     *
     * Only after subscribing to it, under the hood it subscribes to the source observables.
     * When the number of subscribers drops to 0, it unsubscribes from all source observables.
     * But if later on something subscribes to it again, it subscribes to the source observables again.
     *
     * It multicasts the emissions for each subscriber.
     */
    readonly output$: Observable<T>;
    /**
     * Reference to the subscriber coming from the `share()` operator piped to the `output$` observable.
     * For more, see docs of the `output$` observable;
     */
    private consumer;
    /**
     * Registers the given source to pass its values to the `output$` observable.
     *
     * It does nothing, when the source has been already added (but not removed yet).
     */
    add(source: Observable<T>): void;
    /**
     * Starts passing all values from already added sources to consumer
     */
    private bindAllSourcesToConsumer;
    /**
     * Stops passing all values from already added sources to consumer
     * (if any consumer is active at the moment)
     */
    private unbindAllSourcesFromConsumer;
    /**
     * Starts passing all values from a single source to consumer
     */
    private bindSourceToConsumer;
    /**
     * Stops passing all values from a single source to consumer
     * (if any consumer is active at the moment)
     */
    private unbindSourceFromConsumer;
    /**
     * Unregisters the given source so it stops passing its values to `output$` observable.
     *
     * Should be used when a source is no longer maintained **to avoid memory leaks**.
     */
    remove(source: Observable<T>): void;
    /**
     * Returns whether the given source has been already addded
     */
    has(source: Observable<T>): boolean;
}
