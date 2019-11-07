import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  delay,
  filter,
  pluck,
  switchMap,
  map,
  withLatestFrom,
  take,
  concatMap,
} from 'rxjs/operators';

import { GlobalMessageConfig } from '../../config/global-message-config';
import {
  GlobalMessage,
  GlobalMessageType,
} from '../../models/global-message.model';
import { GlobalMessageActions } from '../actions/index';
import { StateWithGlobalMessage } from '../global-message-state';
import { GlobalMessageSelectors } from '../selectors/index';
import {
  countOfDeepEqualObjects,
  indexOfFirstOccurrence,
} from '../../../util/compare-equal-objects';
import { Translatable } from '../../../i18n/translatable';

@Injectable()
export class GlobalMessageEffect {
  @Effect()
  removeDuplicated$: Observable<
    GlobalMessageActions.RemoveMessage
  > = this.actions$.pipe(
    ofType(GlobalMessageActions.ADD_MESSAGE),
    pluck('payload'),
    switchMap((message: GlobalMessage) =>
      of(message.text).pipe(
        withLatestFrom(
          this.store.pipe(
            select(
              GlobalMessageSelectors.getGlobalMessageEntitiesByType(
                message.type
              )
            )
          )
        ),
        filter(
          ([text, messages]: [Translatable, Translatable[]]) =>
            countOfDeepEqualObjects(text, messages) > 1
        ),
        map(
          ([text, messages]: [Translatable, Translatable[]]) =>
            new GlobalMessageActions.RemoveMessage({
              type: message.type,
              index: indexOfFirstOccurrence(text, messages),
            })
        )
      )
    )
  );

  @Effect()
  hideAfterDelay$: Observable<
    GlobalMessageActions.RemoveMessage
  > = this.actions$.pipe(
    ofType(GlobalMessageActions.ADD_MESSAGE),
    pluck('payload', 'type'),
    concatMap((type: GlobalMessageType) => {
      const config = this.config.globalMessages[type];
      return this.store.pipe(
        select(GlobalMessageSelectors.getGlobalMessageCountByType(type)),
        take(1),
        filter(
          (count: number) =>
            config && config.timeout !== undefined && count && count > 0
        ),
        delay(config.timeout),
        switchMap(() =>
          of(
            new GlobalMessageActions.RemoveMessage({
              type,
              index: 0,
            })
          )
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
