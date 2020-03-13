import { Injectable, isDevMode, Type } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { share, switchMap, tap } from 'rxjs/operators';

/**
 * The object holds registered source observables as well as the merged result observable.
 */
interface EventMeta<T> {
  /**
   * Input subject used for dispatching occasional event (without registering a source)
   */
  inputSubject$: Subject<T>;

  /**
   * Observable with array of sources of the event
   */
  sources$: BehaviorSubject<Observable<T>[]>;

  /**
   * Output observable with merged all event sources
   */
  output$: Observable<T>;
}

/**
 * A service to register and observe event sources. Events are driven by event types, which are class signatures
 * for the given event.
 *
 * It is possible to register multiple sources to a single event, even without
 * knowing as multiple decoupled features can attach sources to the same
 * event type.
 */
@Injectable({
  providedIn: 'root',
})
export class EventService {
  /**
   * The various events meta are collected in a map, stored by the event type class
   */
  protected eventsMeta = new Map<Type<any>, EventMeta<any>>();

  /**
   * Register an event source for the given event type.
   *
   * CAUTION: To avoid memory leaks, the returned teardown function should be called
   *  when the event source is no longer maintained by its creator
   * (i.e. in `ngOnDestroy` if the event source was registered in the component).
   *
   * @param eventType the event type
   * @param source$ an observable that represents the source
   *
   * @returns a teardown function which unregisters the given event source
   */
  register<T>(eventType: Type<T>, source$: Observable<T>): () => void {
    const event = this.getEventMeta(eventType);
    const sources: Observable<T>[] = event.sources$.value;
    event.sources$.next([...sources, source$]);

    return () => this.unregister(eventType, source$);
  }

  /**
   * Unregisters an event source for the given event type
   *
   * @param eventType the event type
   * @param source$ an observable that represents the source
   */
  private unregister<T>(eventType: Type<T>, source$: Observable<T>): void {
    const event = this.getEventMeta(eventType);
    const newSources: Observable<T>[] = event.sources$.value.filter(
      s$ => s$ !== source$
    );
    event.sources$.next(newSources);
  }

  /**
   * Returns a stream of events for the given event type
   * @param eventTypes event type
   */
  get<T>(eventType: Type<T>): Observable<T> {
    return this.getEventMeta(eventType).output$;
  }

  /**
   * Dispatches a single event.
   *
   * However, it's recommended to use method `register` instead, whenever the event can come from some stream.
   *  It allows for lazy computations on the input event stream -
   *  if noone subscribes to the event, the logic of the input stream is not evaluated.
   */
  dispatch(event: Object): void {
    const eventType = event.constructor as Type<any>;
    return this.getEventMeta(eventType).inputSubject$.next(event);
  }

  /**
   * Returns the event meta object for the given event type
   */
  protected getEventMeta<T>(eventType: Type<T>): EventMeta<T> {
    if (isDevMode()) {
      this.validateEventType(eventType);
    }

    if (!this.eventsMeta.get(eventType)) {
      this.createEventMeta(eventType);
    }
    return this.eventsMeta.get(eventType);
  }

  /**
   * Creates the event meta object for the given event type
   */
  protected createEventMeta<T>(eventType: Type<T>): void {
    const inputSubject$ = new Subject<T>();
    const sources$ = new BehaviorSubject<Observable<T>[]>([inputSubject$]);
    let output$ = sources$.pipe(
      switchMap((sources: Observable<T>[]) => merge(...sources)),
      share() // share the result observable to avoid merging sources for each subscriber
    );

    if (isDevMode()) {
      output$ = this.validateEventStream(output$, eventType);
    }

    this.eventsMeta.set(eventType, {
      inputSubject$,
      sources$,
      output$,
    });
  }

  /**
   * Checks if the event type is a valid type (is a class with constructor). Runs only in dev mode.
   */
  protected validateEventType<T>(eventType: Type<T>): void {
    if (!eventType?.constructor) {
      throw new Error(
        `EventService:  ${eventType} is not a valid event type. Please provide a class reference.`
      );
    }
  }

  /**
   * Returns the given event source with runtime validation whether the emitted values are instances of given event type.
   */
  protected validateEventStream<T>(
    source$: Observable<T>,
    eventType: Type<T>
  ): Observable<T> {
    return source$.pipe(
      tap(event => {
        if (!(event instanceof eventType)) {
          console.warn(
            `EventService: A stream emitted an event that is not an instance of declared type. Event type:`,
            eventType.name,
            `. Event:`,
            event,
            `. Stream:`,
            source$
          );
        }
      })
    );
  }
}
