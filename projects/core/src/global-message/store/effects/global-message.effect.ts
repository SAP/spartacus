import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { delay, filter, mergeMap, pluck, switchMap } from 'rxjs/operators';

import * as GlobalMessageActions from '../actions/global-message.actions';
import { getGlobalMessageCountByType } from '../selectors/global-message.selectors';
import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import { GlobalMessageConfig } from '../../config/global-message-config';

@Injectable()
export class GlobalMessageEffect {
  @Effect()
  hideAfterDelay$: Observable<
    GlobalMessageActions.RemoveMessage
  > = this.actions$.pipe(
    ofType(GlobalMessageActions.ADD_MESSAGE),
    pluck('payload', 'type'),
    mergeMap((type: GlobalMessageType) => {
      const config = this.config.globalMessages[type];
      return this.store.select(getGlobalMessageCountByType(type)).pipe(
        filter(
          (count: number) =>
            config && config.timeout !== undefined && count && count > 0
        ),
        switchMap((count: number) =>
          of(
            new GlobalMessageActions.RemoveMessage({
              type,
              index: count - 1,
            })
          ).pipe(delay(config.timeout))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<GlobalMessage>,
    private config: GlobalMessageConfig
  ) {}
}
