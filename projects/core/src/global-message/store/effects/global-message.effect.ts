import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  delay,
  filter,
  mergeMap,
  pluck,
  switchMap,
  map,
  withLatestFrom,
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
  deepEqualObjects,
} from '../../../util/compare-equal-objects';

@Injectable()
export class GlobalMessageEffect {
  @Effect()
  removeDuplicated$: Observable<
    GlobalMessageActions.RemoveMessage
  > = this.actions$.pipe(
    ofType(GlobalMessageActions.ADD_MESSAGE),
    pluck('payload'),
    switchMap((message: GlobalMessage) => {
      return of(message.text).pipe(
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
          ([text, messages]: [any, any[]]) =>
            countOfDeepEqualObjects(text, messages) > 1
        ),
        map(([text, messages]: [any, any[]]) => {
          if (countOfDeepEqualObjects(text, messages) > 1) {
            let indexOfDuplicate;
            for (let index = 0; index < messages.length; index++) {
              if (deepEqualObjects(messages[index], text)) {
                indexOfDuplicate = index;
                break;
              }
            }
            return new GlobalMessageActions.RemoveMessage({
              type: message.type,
              index: indexOfDuplicate,
            });
          }
        })
      );
    })
  );

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
        switchMap(() =>
          of(
            new GlobalMessageActions.RemoveMessage({
              type,
              index: 0,
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
