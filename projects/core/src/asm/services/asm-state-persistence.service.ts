import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserToken } from '../../auth/user-auth/models/user-token.model';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { AsmUi } from '../models/asm.models';
import { AsmActions, AsmSelectors, StateWithAsm } from '../store';
import { AsmAuthStorageService } from './asm-auth-storage.service';

// TODO: Should we declare basic parameters like in UserToken or keep everything custom?
export interface SyncedAsmState {
  ui: AsmUi;
  token: {
    [token_param: string]: any;
  };
  isEmulated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AsmStatePersistenceService {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithAsm>,
    protected authStorageService: AsmAuthStorageService
  ) {}

  public sync() {
    this.statePersistenceService.syncWithStorage({
      key: 'asm',
      state$: this.getAsmState(),
      onRead: (state) => this.onRead(state),
    });
  }

  protected getAsmState(): Observable<SyncedAsmState> {
    return combineLatest([
      this.store.pipe(select(AsmSelectors.getAsmUi)),
      this.authStorageService.getCSAgentToken(),
      this.authStorageService.isEmulated(),
    ]).pipe(map(([ui, token, isEmulated]) => ({ ui, token, isEmulated })));
  }

  protected onRead(state: SyncedAsmState) {
    if (state) {
      if (state.ui) {
        this.store.dispatch(new AsmActions.AsmUiUpdate(state.ui));
      }
      if (state.token) {
        this.authStorageService.setCSAgentToken(state.token as UserToken);
      }
      if (state.isEmulated) {
        this.authStorageService.switchToEmulated();
      }
    }
  }
}
