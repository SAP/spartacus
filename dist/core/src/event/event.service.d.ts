import { AbstractType, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from '../logger';
import * as i0 from "@angular/core";
/**
 * A service to register and observe event sources. Events are driven by event types, which are class signatures
 * for the given event.
 *
 * It is possible to register multiple sources to a single event, even without
 * knowing as multiple decoupled features can attach sources to the same
 * event type.
 */
export declare class EventService {
    protected logger: LoggerService;
    /**
     * The various events meta are collected in a map, stored by the event type class
     */
    private eventsMeta;
    /**
     * Register an event source for the given event type.
     *
     * CAUTION: To avoid memory leaks, the returned teardown function should be called
     *  when the event source is no longer maintained by its creator
     * (i.e. in `ngOnDestroy` if the event source was registered in the component).
     *
     * @since 3.1 - registers the given `source$` for the parent classes of the given `eventType`.
     *
     * @param eventType the event type
     * @param source$ an observable that represents the source
     *
     * @returns a teardown function which unregisters the given event source
     */
    register<T>(eventType: AbstractType<T>, source$: Observable<T>): () => void;
    /**
     * Returns a stream of events for the given event type
     * @param eventTypes event type
     */
    get<T>(eventType: AbstractType<T>): Observable<T>;
    /**
     * Dispatches an instance of an individual event.
     * If the eventType is provided a new event will be created for that type and with the event data.
     *
     * @param event an event
     * @param eventType (optional) - type of event
     */
    dispatch<T extends object>(event: T, eventType?: Type<T>): void;
    /**
     * Returns the input subject used to dispatch a single event.
     * The subject is created on demand, when it's needed for the first time.
     * @param eventType type of event
     */
    private getInputSubject;
    /**
     * Returns the event meta object for the given event type
     */
    private getEventMeta;
    private createEventMeta;
    /**
     * Checks if the event type is a valid type (is a class with constructor).
     *
     * Should be used only in dev mode.
     */
    private validateEventType;
    /**
     * Validates if the given type (or its prototype chain) extends from the CxEvent.
     *
     * Should be used only in the dev mode.
     */
    private validateCxEvent;
    /**
     * Returns the given event source with runtime validation whether the emitted values are instances of given event type.
     *
     * Should be used only in dev mode.
     */
    private getValidatedEventStream;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventService>;
}
