/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import {
  concatMap,
  delay,
  filter,
  map,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { Translatable } from '../../../i18n/translatable';
import { ObjectComparisonUtils } from '../../../util/object-comparison-utils';
import { isNotUndefined } from '../../../util/type-guards';
import { GlobalMessageConfig } from '../../config/global-message-config';
import { GlobalMessageActions } from '../actions/index';
import { StateWithGlobalMessage } from '../global-message-state';
import { GlobalMessageSelectors } from '../selectors/index';

@Injectable()
export class GlobalMessageEffect {
  removeDuplicated$: Observable<GlobalMessageActions.RemoveMessage> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(GlobalMessageActions.ADD_MESSAGE),
        map((action) => (action as GlobalMessageActions.AddMessage).payload),
        switchMap((message) =>
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
                ObjectComparisonUtils.countOfDeepEqualObjects(text, messages) >
                1
            ),
            map(([text, messages]: [Translatable, Translatable[]]) => {
              const index = ObjectComparisonUtils.indexOfFirstOccurrence(
                text,
                messages
              );
              if (index !== undefined) {
                return new GlobalMessageActions.RemoveMessage({
                  type: message.type,
                  index,
                });
              }
            }),
            filter(isNotUndefined)
          )
        )
      )
    );

  hideAfterDelay$:
    | Observable<GlobalMessageActions.RemoveMessage>
    | (() => Observable<never>) = createEffect(() =>
    isPlatformBrowser(this.platformId) // we don't want to run this logic when doing SSR
      ? this.actions$.pipe(
          ofType(GlobalMessageActions.ADD_MESSAGE),
          map((action) => (action as GlobalMessageActions.AddMessage).payload),
          concatMap((message) => {
            const config = this.config.globalMessages?.[message.type];
            return this.store.pipe(
              select(
                GlobalMessageSelectors.getGlobalMessageCountByType(message.type)
              ),
              take(1),
              filter(
                (count: number) =>
                  ((config && config.timeout !== undefined) ||
                    message.timeout !== undefined) &&
                  count > 0
              ),
              delay((message.timeout as number) || (config?.timeout as number)),
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
      : // workaround is required due to NGRX mutating a global static
        // observable EMPTY, causing to throw an error if we have
        // effect registered on the same observable twice
        () => EMPTY
  );

  constructor(
    private actions$: Actions,
    private store: Store<StateWithGlobalMessage>,
    private config: GlobalMessageConfig,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
}
