import { OnDestroy, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CxEvent } from '../../event/cx-event';
import { EventService } from '../../event/event.service';
import * as i0 from "@angular/core";
export type QueryNotifier = Observable<unknown> | Type<CxEvent>;
export interface QueryState<T> {
    loading: boolean;
    error: false | Error;
    data: T | undefined;
}
export interface Query<RESULT, PARAMS extends unknown[] = []> {
    get(...params: PARAMS): Observable<RESULT | undefined>;
    getState(...params: PARAMS): Observable<QueryState<RESULT>>;
}
export declare class QueryService implements OnDestroy {
    protected eventService: EventService;
    protected subscriptions: Subscription;
    constructor(eventService: EventService);
    create<T>(loaderFactory: () => Observable<T>, options?: {
        /** Reloads the query, while preserving the `data` until the new data is loaded */
        reloadOn?: QueryNotifier[];
        /** Resets the query to the initial state */
        resetOn?: QueryNotifier[];
    }): Query<T>;
    protected getTriggersStream(triggers: QueryNotifier[]): Observable<unknown>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QueryService>;
}
