import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import {
  concatMap,
  delay,
  filter,
  map,
  pluck,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { Translatable } from '../../../i18n/translatable';
import {
  countOfDeepEqualObjects,
  indexOfFirstOccurrence,
} from '../../../util/compare-equal-objects';
import { GlobalMessageConfig } from '../../config/global-message-config';
import { GlobalMessage } from '../../models/global-message.model';
import { GlobalMessageActions } from '../actions/index';
import { StateWithGlobalMessage } from '../global-message-state';
import { GlobalMessageSelectors } from '../selectors/index';

@Injectable()
export class GlobalMessageEffect {
  @Effect()
  removeDuplicated$: Observable<GlobalMessageActions.RemoveMessage> = this.actions$.pipe(
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
  hideAfterDelay$: Observable<GlobalMessageActions.RemoveMessage> = isPlatformBrowser(
    this.platformId
  ) // we don't want to run this logic when doing SSR
    ? this.actions$.pipe(
        ofType(GlobalMessageActions.ADD_MESSAGE),
        pluck('payload'),
        concatMap((message: GlobalMessage) => {
          const config = this.config.globalMessages[message.type];
          return this.store.pipe(
            select(
              GlobalMessageSelectors.getGlobalMessageCountByType(message.type)
            ),
            take(1),
            filter(
              (count: number) =>
                ((config && config.timeout !== undefined) || message.timeout) &&
                count &&
                count > 0
            ),
            delay(message.timeout || config.timeout),
            switchMap(() =>
              of(
                new GlobalMessageActions.RemoveMessage({
                  type: message.type,
                  index: 0,
                })
              )
            )
          );
        })
      )
    : EMPTY;

  constructor(
    private actions$: Actions,
    private store: Store<StateWithGlobalMessage>,
    private config: GlobalMessageConfig,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
}
