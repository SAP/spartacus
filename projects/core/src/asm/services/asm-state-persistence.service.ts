import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthToken } from '../../auth/user-auth/models/auth-token.model';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { AsmUi } from '../models/asm.models';
import { AsmActions, AsmSelectors, StateWithAsm } from '../store';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';

// TODO: Should we declare basic parameters like in UserToken or keep everything custom?
export interface SyncedAsmState {
  ui: AsmUi;
  emulatedUserToken: {
    [token_param: string]: any;
  };
  tokenTarget: TokenTarget;
}

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

  public sync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: 'asm',
        state$: this.getAsmState(),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  protected getAsmState(): Observable<SyncedAsmState> {
    return combineLatest([
      this.store.pipe(select(AsmSelectors.getAsmUi)),
      of(this.authStorageService.getEmulatedUserToken()),
      this.authStorageService.getTokenTarget(),
    ]).pipe(
      map(([ui, emulatedUserToken, tokenTarget]) => ({
        ui,
        emulatedUserToken,
        tokenTarget,
      }))
    );
  }

  protected onRead(state: SyncedAsmState) {
    if (state) {
      if (state.ui) {
        this.store.dispatch(new AsmActions.AsmUiUpdate(state.ui));
      }
      if (state.emulatedUserToken) {
        this.authStorageService.setEmulatedUserToken(
          state.emulatedUserToken as AuthToken
        );
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
