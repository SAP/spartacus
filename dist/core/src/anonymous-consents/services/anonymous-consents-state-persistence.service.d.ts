import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { StatePersistenceService } from '../../state/index';
import { AnonymousConsentsService } from '../facade/index';
import { AnonymousConsentsState, StateWithAnonymousConsents } from '../store/index';
import * as i0 from "@angular/core";
/**
 * Anonymous consents state synced to browser storage.
 */
export type SyncedAnonymousConsentsState = Partial<AnonymousConsentsState>;
/**
 * Responsible for saving the anonymous consents data in browser storage.
 */
export declare class AnonymousConsentsStatePersistenceService implements OnDestroy {
    protected statePersistenceService: StatePersistenceService;
    protected store: Store<StateWithAnonymousConsents>;
    protected anonymousConsentsService: AnonymousConsentsService;
    protected subscription: Subscription;
    constructor(statePersistenceService: StatePersistenceService, store: Store<StateWithAnonymousConsents>, anonymousConsentsService: AnonymousConsentsService);
    /**
     * Identifier used for storage key.
     */
    protected key: string;
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync(): void;
    /**
     * Gets and transforms state from different sources into the form that should
     * be saved in storage.
     */
    protected getAuthState(): Observable<SyncedAnonymousConsentsState>;
    /**
     * Function called on each browser storage read.
     * Used to update state from browser -> state.
     */
    protected onRead(state: SyncedAnonymousConsentsState | undefined): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnonymousConsentsStatePersistenceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnonymousConsentsStatePersistenceService>;
}
