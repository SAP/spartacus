import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AsmAuthStorageService, TokenTarget } from '@spartacus/asm/root';
import { AuthToken, StatePersistenceService } from '@spartacus/core';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AsmUi } from '../models/asm.models';
import { AsmActions, AsmSelectors, StateWithAsm } from '../store';

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
@Injectable({
  providedIn: 'root',
})
export class AsmStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithAsm>,
    protected authStorageService: AsmAuthStorageService
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'asm';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getAsmState(),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getAsmState(): Observable<SyncedAsmState> {
    return combineLatest([
      this.store.pipe(
        // Since getAsmState() may be called while the module is lazy loded
        // The asm state slice may not exist yet in the first store emissions.
        filter((store) => !!store.asm),
        select(AsmSelectors.getAsmUi)
      ),
      of(this.authStorageService.getEmulatedUserToken()),
      this.authStorageService.getTokenTarget(),
    ]).pipe(
      map(([ui, emulatedUserToken, tokenTarget]) => {
        let emulatedToken = emulatedUserToken;
        if (emulatedToken) {
          emulatedToken = { ...emulatedUserToken } as AuthToken;
          // To minimize risk of user account hijacking we don't persist emulated user refresh_token
          delete emulatedToken.refresh_token;
        }
        return {
          ui,
          emulatedUserToken: emulatedToken,
          tokenTarget,
        };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: SyncedAsmState | undefined) {
    if (state) {
      if (state.ui) {
        this.store.dispatch(new AsmActions.AsmUiUpdate(state.ui));
      }
      if (state.emulatedUserToken) {
        this.authStorageService.setEmulatedUserToken(state.emulatedUserToken);
      }
      if (state.tokenTarget) {
        this.authStorageService.setTokenTarget(state.tokenTarget);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
