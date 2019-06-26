import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, filter, mergeMap, pluck, switchMap } from 'rxjs/operators';
import { GlobalMessageConfig } from '../../config/global-message-config';
import { GlobalMessageType } from '../../models/global-message.model';
import { GlobalMessageActions } from '../actions/index';
import { StateWithGlobalMessage } from '../global-message-state';
import { GlobalMessageSelectors } from '../selectors/index';

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
      return this.store.pipe(
        select(GlobalMessageSelectors.getGlobalMessageCountByType(type)),
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
    private store: Store<StateWithGlobalMessage>,
    private config: GlobalMessageConfig
  ) {}
}
