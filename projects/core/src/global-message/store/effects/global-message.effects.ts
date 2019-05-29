import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { delay, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as GlobalMessageActions from '../actions/global-message.actions';
import * as RouterActions from '../../../routing/store/actions/router.action';
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
    ofType(RouterActions.GO),
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

  @Effect()
  hideAfterNavigate$: Observable<
    Observable<GlobalMessageActions.RemoveMessagesByType>
  > = this.actions$.pipe(
    ofType(GlobalMessageActions.ADD_MESSAGE),
    switchMap(() => [
      this.getConfigForType(GlobalMessageType.MSG_TYPE_CONFIRMATION).pipe(
        filter(
          (config: GlobalMessageConfig) => config && config.hideOnRouteChange
        ),
        map(
          () =>
            new GlobalMessageActions.RemoveMessagesByType(
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            )
        )
      ),
      this.getConfigForType(GlobalMessageType.MSG_TYPE_INFO).pipe(
        filter(
          (config: GlobalMessageConfig) => config && config.hideOnRouteChange
        ),
        map(
          () =>
            new GlobalMessageActions.RemoveMessagesByType(
              GlobalMessageType.MSG_TYPE_INFO
            )
        )
      ),
      this.getConfigForType(GlobalMessageType.MSG_TYPE_ERROR).pipe(
        filter(
          (config: GlobalMessageConfig) => config && config.hideOnRouteChange
        ),
        map(
          () =>
            new GlobalMessageActions.RemoveMessagesByType(
              GlobalMessageType.MSG_TYPE_ERROR
            )
        )
      ),
    ])
  );

  private getConfigForType(type: GlobalMessageType) {
    const config = defaultGlobalMessageConfig;
    const configForType = {
      [GlobalMessageType.MSG_TYPE_CONFIRMATION]: config.confirmation,
      [GlobalMessageType.MSG_TYPE_INFO]: config.information,
      [GlobalMessageType.MSG_TYPE_ERROR]: config.error,
    };
    return of(configForType[type]);
  }

  constructor(private actions$: Actions, private store: Store<GlobalMessage>) {}
}
