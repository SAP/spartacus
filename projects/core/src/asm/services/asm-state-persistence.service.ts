import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { AsmUi } from '../models/asm.models';
import { AsmActions, AsmSelectors, StateWithAsm } from '../store';

// TODO: Should we declare basic parameters like in UserToken or keep everything custom?
export interface SyncedAsmState {
  ui: AsmUi;
  token: {
    [token_param: string]: any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AsmStatePersistenceService {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithAsm>
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
      this.store.pipe(select(AsmSelectors.getCustomerSupportAgentToken)),
    ]).pipe(map(([ui, token]) => ({ ui, token })));
  }

  protected onRead(state: SyncedAsmState) {
    if (state) {
      if (state.ui) {
        this.store.dispatch(new AsmActions.AsmUiUpdate(state.ui));
      }
      if (state.token) {
        this.store.dispatch(new AsmActions.SetCSAgentTokenData(state.token));
      }
    }
  }
}
