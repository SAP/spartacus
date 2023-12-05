/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable, isDevMode, } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logger';
import { createFrom } from '../util/create-from';
import { CxEvent } from './cx-event';
import { MergingSubject } from './utils/merging-subject';
import * as i0 from "@angular/core";
/**
 * A service to register and observe event sources. Events are driven by event types, which are class signatures
 * for the given event.
 *
 * It is possible to register multiple sources to a single event, even without
 * knowing as multiple decoupled features can attach sources to the same
 * event type.
 */
export class EventService {
    constructor() {
        this.logger = inject(LoggerService);
        /**
         * The various events meta are collected in a map, stored by the event type class
         */
        this.eventsMeta = new Map();
    }
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
    register(eventType, source$) {
        const eventMeta = this.getEventMeta(eventType);
        if (eventMeta.mergingSubject.has(source$)) {
            if (isDevMode()) {
                this.logger.warn(`EventService: the event source`, source$, `has been already registered for the type`, eventType);
            }
        }
        else {
            eventMeta.mergingSubject.add(source$);
        }
        return () => eventMeta.mergingSubject.remove(source$);
    }
    /**
     * Returns a stream of events for the given event type
     * @param eventTypes event type
     */
    get(eventType) {
        let output$ = this.getEventMeta(eventType).mergingSubject.output$;
        if (isDevMode()) {
            output$ = this.getValidatedEventStream(output$, eventType);
        }
        return output$;
    }
    /**
     * Dispatches an instance of an individual event.
     * If the eventType is provided a new event will be created for that type and with the event data.
     *
     * @param event an event
     * @param eventType (optional) - type of event
     */
    dispatch(event, eventType) {
        if (!eventType) {
            eventType = event.constructor;
        }
        else if (!(event instanceof eventType)) {
            event = createFrom(eventType, event);
        }
        const inputSubject$ = this.getInputSubject(eventType);
        inputSubject$.next(event);
    }
    /**
     * Returns the input subject used to dispatch a single event.
     * The subject is created on demand, when it's needed for the first time.
     * @param eventType type of event
     */
    getInputSubject(eventType) {
        const eventMeta = this.getEventMeta(eventType);
        if (!eventMeta.inputSubject$) {
            eventMeta.inputSubject$ = new Subject();
            this.register(eventType, eventMeta.inputSubject$);
        }
        return eventMeta.inputSubject$;
    }
    /**
     * Returns the event meta object for the given event type
     */
    getEventMeta(eventType) {
        if (!this.eventsMeta.get(eventType)) {
            if (isDevMode()) {
                this.validateEventType(eventType);
            }
            this.createEventMeta(eventType);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.eventsMeta.get(eventType);
    }
    createEventMeta(eventType) {
        const eventMeta = {
            inputSubject$: null,
            mergingSubject: new MergingSubject(),
        };
        this.eventsMeta.set(eventType, eventMeta);
        let parentEvent = Object.getPrototypeOf(eventType);
        while (parentEvent !== null &&
            Object.getPrototypeOf(parentEvent) !== Object.getPrototypeOf({})) {
            this.register(parentEvent, eventMeta.mergingSubject.output$);
            parentEvent = Object.getPrototypeOf(parentEvent);
        }
    }
    /**
     * Checks if the event type is a valid type (is a class with constructor).
     *
     * Should be used only in dev mode.
     */
    validateEventType(eventType) {
        if (!eventType?.constructor) {
            throw new Error(`EventService:  ${eventType} is not a valid event type. Please provide a class reference.`);
        }
        this.validateCxEvent(eventType);
    }
    /**
     * Validates if the given type (or its prototype chain) extends from the CxEvent.
     *
     * Should be used only in the dev mode.
     */
    validateCxEvent(eventType) {
        let parentType = eventType;
        while (parentType !== null &&
            Object.getPrototypeOf(parentType) !== Object.getPrototypeOf({})) {
            if (parentType.type === CxEvent.type) {
                return;
            }
            parentType = Object.getPrototypeOf(parentType);
        }
        this.logger.warn(`The ${eventType.name} (or one of its parent classes) does not inherit from the ${CxEvent.type}`);
    }
    /**
     * Returns the given event source with runtime validation whether the emitted values are instances of given event type.
     *
     * Should be used only in dev mode.
     */
    getValidatedEventStream(source$, eventType) {
        return source$.pipe(tap((event) => {
            if (!(event instanceof eventType)) {
                this.logger.warn(`EventService: The stream`, source$, `emitted the event`, event, `that is not an instance of the declared type`, eventType.name);
            }
        }));
    }
}
EventService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EventService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
EventService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EventService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EventService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2V2ZW50L2V2ZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFpQnpEOzs7Ozs7O0dBT0c7QUFJSCxNQUFNLE9BQU8sWUFBWTtJQUh6QjtRQUlZLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekM7O1dBRUc7UUFDSyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQTJDLENBQUM7S0EyS3pFO0lBektDOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxRQUFRLENBQUksU0FBMEIsRUFBRSxPQUFzQjtRQUM1RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekMsSUFBSSxTQUFTLEVBQUUsRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCxnQ0FBZ0MsRUFDaEMsT0FBTyxFQUNQLDBDQUEwQyxFQUMxQyxTQUFTLENBQ1YsQ0FBQzthQUNIO1NB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Q1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQWJzdHJhY3RUeXBlLFxuICBpbmplY3QsXG4gIEluamVjdGFibGUsXG4gIGlzRGV2TW9kZSxcbiAgVHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7IGNyZWF0ZUZyb20gfSBmcm9tICcuLi91dGlsL2NyZWF0ZS1mcm9tJztcbmltcG9ydCB7IEN4RXZlbnQgfSBmcm9tICcuL2N4LWV2ZW50JztcbmltcG9ydCB7IE1lcmdpbmdTdWJqZWN0IH0gZnJvbSAnLi91dGlscy9tZXJnaW5nLXN1YmplY3QnO1xuXG4vKipcbiAqIFRoZSBvYmplY3QgaG9sZHMgcmVnaXN0ZXJlZCBzb3VyY2Ugb2JzZXJ2YWJsZXMgYXMgd2VsbCBhcyB0aGUgbWVyZ2VkIHJlc3VsdCBvYnNlcnZhYmxlLlxuICovXG5pbnRlcmZhY2UgRXZlbnRNZXRhPFQ+IHtcbiAgLyoqXG4gICAqIElucHV0IHN1YmplY3QgdXNlZCBmb3IgZGlzcGF0Y2hpbmcgb2NjYXNpb25hbCBldmVudCAod2l0aG91dCByZWdpc3RlcmluZyBhIHNvdXJjZSlcbiAgICovXG4gIGlucHV0U3ViamVjdCQ6IFN1YmplY3Q8VD4gfCBudWxsO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBzdWJqZWN0IHRoYXQgYWxsb3dzIGZvciBkeW5hbWljIGFkZGluZyBhbmQgcmVtb3Zpbmcgc291cmNlcyB0byBiZSBtZXJnZWQgYXMgYW4gb3V0cHV0XG4gICAqL1xuICBtZXJnaW5nU3ViamVjdDogTWVyZ2luZ1N1YmplY3Q8VD47XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRvIHJlZ2lzdGVyIGFuZCBvYnNlcnZlIGV2ZW50IHNvdXJjZXMuIEV2ZW50cyBhcmUgZHJpdmVuIGJ5IGV2ZW50IHR5cGVzLCB3aGljaCBhcmUgY2xhc3Mgc2lnbmF0dXJlc1xuICogZm9yIHRoZSBnaXZlbiBldmVudC5cbiAqXG4gKiBJdCBpcyBwb3NzaWJsZSB0byByZWdpc3RlciBtdWx0aXBsZSBzb3VyY2VzIHRvIGEgc2luZ2xlIGV2ZW50LCBldmVuIHdpdGhvdXRcbiAqIGtub3dpbmcgYXMgbXVsdGlwbGUgZGVjb3VwbGVkIGZlYXR1cmVzIGNhbiBhdHRhY2ggc291cmNlcyB0byB0aGUgc2FtZVxuICogZXZlbnQgdHlwZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEV2ZW50U2VydmljZSB7XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG4gIC8qKlxuICAgKiBUaGUgdmFyaW91cyBldmVudHMgbWV0YSBhcmUgY29sbGVjdGVkIGluIGEgbWFwLCBzdG9yZWQgYnkgdGhlIGV2ZW50IHR5cGUgY2xhc3NcbiAgICovXG4gIHByaXZhdGUgZXZlbnRzTWV0YSA9IG5ldyBNYXA8QWJzdHJhY3RUeXBlPGFueT4gfCBhbnksIEV2ZW50TWV0YTxhbnk+PigpO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBldmVudCBzb3VyY2UgZm9yIHRoZSBnaXZlbiBldmVudCB0eXBlLlxuICAgKlxuICAgKiBDQVVUSU9OOiBUbyBhdm9pZCBtZW1vcnkgbGVha3MsIHRoZSByZXR1cm5lZCB0ZWFyZG93biBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkXG4gICAqICB3aGVuIHRoZSBldmVudCBzb3VyY2UgaXMgbm8gbG9uZ2VyIG1haW50YWluZWQgYnkgaXRzIGNyZWF0b3JcbiAgICogKGkuZS4gaW4gYG5nT25EZXN0cm95YCBpZiB0aGUgZXZlbnQgc291cmNlIHdhcyByZWdpc3RlcmVkIGluIHRoZSBjb21wb25lbnQpLlxuICAgKlxuICAgKiBAc2luY2UgMy4xIC0gcmVnaXN0ZXJzIHRoZSBnaXZlbiBgc291cmNlJGAgZm9yIHRoZSBwYXJlbnQgY2xhc3NlcyBvZiB0aGUgZ2l2ZW4gYGV2ZW50VHlwZWAuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudFR5cGUgdGhlIGV2ZW50IHR5cGVcbiAgICogQHBhcmFtIHNvdXJjZSQgYW4gb2JzZXJ2YWJsZSB0aGF0IHJlcHJlc2VudHMgdGhlIHNvdXJjZVxuICAgKlxuICAgKiBAcmV0dXJucyBhIHRlYXJkb3duIGZ1bmN0aW9uIHdoaWNoIHVucmVnaXN0ZXJzIHRoZSBnaXZlbiBldmVudCBzb3VyY2VcbiAgICovXG4gIHJlZ2lzdGVyPFQ+KGV2ZW50VHlwZTogQWJzdHJhY3RUeXBlPFQ+LCBzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgZXZlbnRNZXRhID0gdGhpcy5nZXRFdmVudE1ldGEoZXZlbnRUeXBlKTtcbiAgICBpZiAoZXZlbnRNZXRhLm1lcmdpbmdTdWJqZWN0Lmhhcyhzb3VyY2UkKSkge1xuICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgYEV2ZW50U2VydmljZTogdGhlIGV2ZW50IHNvdXJjZWAsXG4gICAgICAgICAgc291cmNlJCxcbiAgICAgICAgICBgaGFzIGJlZW4gYWxyZWFkeSByZWdpc3RlcmVkIGZvciB0aGUgdHlwZWAsXG4gICAgICAgICAgZXZlbnRUeXBlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50TWV0YS5tZXJnaW5nU3ViamVjdC5hZGQoc291cmNlJCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IGV2ZW50TWV0YS5tZXJnaW5nU3ViamVjdC5yZW1vdmUoc291cmNlJCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmVhbSBvZiBldmVudHMgZm9yIHRoZSBnaXZlbiBldmVudCB0eXBlXG4gICAqIEBwYXJhbSBldmVudFR5cGVzIGV2ZW50IHR5cGVcbiAgICovXG4gIGdldDxUPihldmVudFR5cGU6IEFic3RyYWN0VHlwZTxUPik6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBvdXRwdXQkID0gdGhpcy5nZXRFdmVudE1ldGEoZXZlbnRUeXBlKS5tZXJnaW5nU3ViamVjdC5vdXRwdXQkO1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgb3V0cHV0JCA9IHRoaXMuZ2V0VmFsaWRhdGVkRXZlbnRTdHJlYW0ob3V0cHV0JCwgZXZlbnRUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dCQ7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbiBpbnN0YW5jZSBvZiBhbiBpbmRpdmlkdWFsIGV2ZW50LlxuICAgKiBJZiB0aGUgZXZlbnRUeXBlIGlzIHByb3ZpZGVkIGEgbmV3IGV2ZW50IHdpbGwgYmUgY3JlYXRlZCBmb3IgdGhhdCB0eXBlIGFuZCB3aXRoIHRoZSBldmVudCBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgYW4gZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50VHlwZSAob3B0aW9uYWwpIC0gdHlwZSBvZiBldmVudFxuICAgKi9cbiAgZGlzcGF0Y2g8VCBleHRlbmRzIG9iamVjdD4oZXZlbnQ6IFQsIGV2ZW50VHlwZT86IFR5cGU8VD4pOiB2b2lkIHtcbiAgICBpZiAoIWV2ZW50VHlwZSkge1xuICAgICAgZXZlbnRUeXBlID0gZXZlbnQuY29uc3RydWN0b3IgYXMgVHlwZTxUPjtcbiAgICB9IGVsc2UgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBldmVudFR5cGUpKSB7XG4gICAgICBldmVudCA9IGNyZWF0ZUZyb20oZXZlbnRUeXBlLCBldmVudCk7XG4gICAgfVxuICAgIGNvbnN0IGlucHV0U3ViamVjdCQgPSB0aGlzLmdldElucHV0U3ViamVjdChldmVudFR5cGUpO1xuICAgIGlucHV0U3ViamVjdCQubmV4dChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaW5wdXQgc3ViamVjdCB1c2VkIHRvIGRpc3BhdGNoIGEgc2luZ2xlIGV2ZW50LlxuICAgKiBUaGUgc3ViamVjdCBpcyBjcmVhdGVkIG9uIGRlbWFuZCwgd2hlbiBpdCdzIG5lZWRlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAqIEBwYXJhbSBldmVudFR5cGUgdHlwZSBvZiBldmVudFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbnB1dFN1YmplY3Q8VD4oZXZlbnRUeXBlOiBBYnN0cmFjdFR5cGU8VD4pOiBTdWJqZWN0PFQ+IHtcbiAgICBjb25zdCBldmVudE1ldGEgPSB0aGlzLmdldEV2ZW50TWV0YShldmVudFR5cGUpO1xuXG4gICAgaWYgKCFldmVudE1ldGEuaW5wdXRTdWJqZWN0JCkge1xuICAgICAgZXZlbnRNZXRhLmlucHV0U3ViamVjdCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgICB0aGlzLnJlZ2lzdGVyKGV2ZW50VHlwZSwgZXZlbnRNZXRhLmlucHV0U3ViamVjdCQpO1xuICAgIH1cbiAgICByZXR1cm4gZXZlbnRNZXRhLmlucHV0U3ViamVjdCQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXZlbnQgbWV0YSBvYmplY3QgZm9yIHRoZSBnaXZlbiBldmVudCB0eXBlXG4gICAqL1xuICBwcml2YXRlIGdldEV2ZW50TWV0YTxUPihldmVudFR5cGU6IEFic3RyYWN0VHlwZTxUPik6IEV2ZW50TWV0YTxUPiB7XG4gICAgaWYgKCF0aGlzLmV2ZW50c01ldGEuZ2V0KGV2ZW50VHlwZSkpIHtcbiAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlRXZlbnRUeXBlKGV2ZW50VHlwZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmNyZWF0ZUV2ZW50TWV0YShldmVudFR5cGUpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIHJldHVybiB0aGlzLmV2ZW50c01ldGEuZ2V0KGV2ZW50VHlwZSkhO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVFdmVudE1ldGE8VD4oZXZlbnRUeXBlOiBBYnN0cmFjdFR5cGU8VD4pOiB2b2lkIHtcbiAgICBjb25zdCBldmVudE1ldGE6IEV2ZW50TWV0YTxUPiA9IHtcbiAgICAgIGlucHV0U3ViamVjdCQ6IG51bGwsIC8vIHdpbGwgYmUgY3JlYXRlZCBsYXppbHkgYnkgdGhlIGBkaXNwYXRjaGAgbWV0aG9kXG4gICAgICBtZXJnaW5nU3ViamVjdDogbmV3IE1lcmdpbmdTdWJqZWN0PFQ+KCksXG4gICAgfTtcbiAgICB0aGlzLmV2ZW50c01ldGEuc2V0KGV2ZW50VHlwZSwgZXZlbnRNZXRhKTtcblxuICAgIGxldCBwYXJlbnRFdmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihldmVudFR5cGUpO1xuICAgIHdoaWxlIChcbiAgICAgIHBhcmVudEV2ZW50ICE9PSBudWxsICYmXG4gICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YocGFyZW50RXZlbnQpICE9PSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoe30pXG4gICAgKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyKHBhcmVudEV2ZW50LCBldmVudE1ldGEubWVyZ2luZ1N1YmplY3Qub3V0cHV0JCk7XG4gICAgICBwYXJlbnRFdmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwYXJlbnRFdmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZXZlbnQgdHlwZSBpcyBhIHZhbGlkIHR5cGUgKGlzIGEgY2xhc3Mgd2l0aCBjb25zdHJ1Y3RvcikuXG4gICAqXG4gICAqIFNob3VsZCBiZSB1c2VkIG9ubHkgaW4gZGV2IG1vZGUuXG4gICAqL1xuICBwcml2YXRlIHZhbGlkYXRlRXZlbnRUeXBlPFQ+KGV2ZW50VHlwZTogQWJzdHJhY3RUeXBlPFQ+KTogdm9pZCB7XG4gICAgaWYgKCFldmVudFR5cGU/LmNvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBFdmVudFNlcnZpY2U6ICAke2V2ZW50VHlwZX0gaXMgbm90IGEgdmFsaWQgZXZlbnQgdHlwZS4gUGxlYXNlIHByb3ZpZGUgYSBjbGFzcyByZWZlcmVuY2UuYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbGlkYXRlQ3hFdmVudChldmVudFR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyBpZiB0aGUgZ2l2ZW4gdHlwZSAob3IgaXRzIHByb3RvdHlwZSBjaGFpbikgZXh0ZW5kcyBmcm9tIHRoZSBDeEV2ZW50LlxuICAgKlxuICAgKiBTaG91bGQgYmUgdXNlZCBvbmx5IGluIHRoZSBkZXYgbW9kZS5cbiAgICovXG4gIHByaXZhdGUgdmFsaWRhdGVDeEV2ZW50PFQ+KGV2ZW50VHlwZTogQWJzdHJhY3RUeXBlPFQ+KTogdm9pZCB7XG4gICAgbGV0IHBhcmVudFR5cGUgPSBldmVudFR5cGU7XG4gICAgd2hpbGUgKFxuICAgICAgcGFyZW50VHlwZSAhPT0gbnVsbCAmJlxuICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudFR5cGUpICE9PSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoe30pXG4gICAgKSB7XG4gICAgICBpZiAoKHBhcmVudFR5cGUgYXMgYW55KS50eXBlID09PSBDeEV2ZW50LnR5cGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnRUeXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudFR5cGUpO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICBgVGhlICR7ZXZlbnRUeXBlLm5hbWV9IChvciBvbmUgb2YgaXRzIHBhcmVudCBjbGFzc2VzKSBkb2VzIG5vdCBpbmhlcml0IGZyb20gdGhlICR7Q3hFdmVudC50eXBlfWBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGdpdmVuIGV2ZW50IHNvdXJjZSB3aXRoIHJ1bnRpbWUgdmFsaWRhdGlvbiB3aGV0aGVyIHRoZSBlbWl0dGVkIHZhbHVlcyBhcmUgaW5zdGFuY2VzIG9mIGdpdmVuIGV2ZW50IHR5cGUuXG4gICAqXG4gICAqIFNob3VsZCBiZSB1c2VkIG9ubHkgaW4gZGV2IG1vZGUuXG4gICAqL1xuICBwcml2YXRlIGdldFZhbGlkYXRlZEV2ZW50U3RyZWFtPFQ+KFxuICAgIHNvdXJjZSQ6IE9ic2VydmFibGU8VD4sXG4gICAgZXZlbnRUeXBlOiBBYnN0cmFjdFR5cGU8VD5cbiAgKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHNvdXJjZSQucGlwZShcbiAgICAgIHRhcCgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBldmVudFR5cGUpKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAgIGBFdmVudFNlcnZpY2U6IFRoZSBzdHJlYW1gLFxuICAgICAgICAgICAgc291cmNlJCxcbiAgICAgICAgICAgIGBlbWl0dGVkIHRoZSBldmVudGAsXG4gICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgIGB0aGF0IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiB0aGUgZGVjbGFyZWQgdHlwZWAsXG4gICAgICAgICAgICBldmVudFR5cGUubmFtZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19