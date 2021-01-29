import { Injectable, OnDestroy } from '@angular/core';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';
import { AuthToken, StatePersistenceService } from '@spartacus/core';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsmUi } from '../models/asm.models';
import { AsmUiService } from './asm-ui.service';

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
    protected asmUiService: AsmUiService,
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
      this.asmUiService.getAsmUiState(),
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
  protected onRead(state: SyncedAsmState) {
    if (state) {
      if (state.ui) {
        this.asmUiService.updateAsmUiState(state.ui);
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
