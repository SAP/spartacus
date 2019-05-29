import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ObservableInput, of } from 'rxjs';
import { delay, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

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
  // @Effect({ dispatch: false })
  // navigate$: Observable<any> = this.actions$.pipe(
  //   ofType(RouterActions.GO),
  //   map((action: RouterActions.Go) => action.payload),
  //   tap(({ path, query: queryParams, extras }) => {
  //     this.router.navigate(path, { queryParams, ...extras });
  //   })
  // );

  @Effect()
  timeout$: ObservableInput<
    GlobalMessageActions.RemoveMessagesByType
  > | void = this.actions$.pipe(
    ofType(GlobalMessageActions.ADD_MESSAGE),
    map((action: GlobalMessageActions.AddMessage) => action.payload),
    switchMap((value: GlobalMessage) => {
      return this.store.select(getGlobalMessageCountByType(value.type)).pipe(
        withLatestFrom(this.getConfigForType(value.type)),
        filter(
          ([count, config]: [number, GlobalMessageConfig]) =>
            config && config.timeout !== undefined && count && count > 0
        ),
        switchMap(([count, config]: [number, GlobalMessageConfig]) => {
          console.log('yo', value.type, count - 1, config.timeout);
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
