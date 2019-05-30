import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { delay, filter, pluck, switchMap } from 'rxjs/operators';

import * as GlobalMessageActions from '../actions/global-message.actions';
import { getGlobalMessageCountByType } from '../selectors/global-message.selectors';
import { GlobalMessage } from '../../models/global-message.model';
import { GlobalMessageConfig } from '../../config/global-message-config';

@Injectable()
export class GlobalMessageEffects {
  @Effect()
  hideAfterDelay$: Observable<
    GlobalMessageActions.RemoveMessage
  > | void = this.actions$.pipe(
    ofType(GlobalMessageActions.ADD_MESSAGE),
    pluck('payload'),
    switchMap((value: GlobalMessage) => {
      const config = this.globalMessageConfig.globalMessages[value.type];
      return this.store.select(getGlobalMessageCountByType(value.type)).pipe(
        filter(
          (count: number) =>
            config && config.timeout !== undefined && count && count > 0
        ),
        switchMap((count: number) => {
          return of(
            new GlobalMessageActions.RemoveMessage({
              type: value.type,
              index: count - 1,
            })
          ).pipe(delay(config.timeout));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<GlobalMessage>,
    private globalMessageConfig: GlobalMessageConfig
  ) {}
}
