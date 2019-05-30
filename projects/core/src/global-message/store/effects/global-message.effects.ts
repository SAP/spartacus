import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { delay, filter, switchMap, withLatestFrom } from 'rxjs/operators';

import * as GlobalMessageActions from '../actions/global-message.actions';
import { getGlobalMessageCountByType } from '../selectors/global-message.selectors';
import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import { defaultGlobalMessageConfig } from '../../config/default-global-message.config';
import { GlobalMessageConfig } from '../../config/globalMessageConfigs';

@Injectable()
export class GlobalMessageEffects {
  @Effect()
  hideAfterDelay$: Observable<
    GlobalMessageActions.RemoveMessage
  > | void = this.actions$.pipe(
    ofType(GlobalMessageActions.ADD_MESSAGE),
    switchMap((value: GlobalMessage) => {
      return this.store.select(getGlobalMessageCountByType(value.type)).pipe(
        withLatestFrom(this.getConfigForType(value.type)),
        filter(
          ([count, config]: [number, GlobalMessageConfig]) =>
            config && config.timeout !== undefined && count && count > 0
        ),
        switchMap(([count, config]: [number, GlobalMessageConfig]) => {
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

  private getConfigForType(type: GlobalMessageType) {
    return of(defaultGlobalMessageConfig[type]);
  }

  constructor(private actions$: Actions, private store: Store<GlobalMessage>) {}
}
