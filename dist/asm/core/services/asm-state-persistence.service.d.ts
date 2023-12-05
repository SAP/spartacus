import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsmAuthStorageService, AsmUi, TokenTarget } from '@spartacus/asm/root';
import { AuthToken, StatePersistenceService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { StateWithAsm } from '../store';
import * as i0 from "@angular/core";
/**
 * ASM state synced to browser storage.
 */
export interface SyncedAsmState {
    ui?: AsmUi;
    emulatedUserToken?: AuthToken;
    tokenTarget?: TokenTarget;
}
/**
 * Responsible for storing ASM state in the browser storage.
 * Uses `StatePersistenceService` mechanism.
 */
export declare class AsmStatePersistenceService implements OnDestroy {
    protected statePersistenceService: StatePersistenceService;
    protected store: Store<StateWithAsm>;
    protected authStorageService: AsmAuthStorageService;
    protected subscription: Subscription;
    constructor(statePersistenceService: StatePersistenceService, store: Store<StateWithAsm>, authStorageService: AsmAuthStorageService);
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
    protected getAsmState(): Observable<SyncedAsmState>;
    /**
     * Function called on each browser storage read.
     * Used to update state from browser -> state.
     */
    protected onRead(state: SyncedAsmState | undefined): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmStatePersistenceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmStatePersistenceService>;
}
