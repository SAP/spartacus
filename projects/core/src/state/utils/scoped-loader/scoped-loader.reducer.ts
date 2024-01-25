/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { EntityScopedLoaderAction } from '../../../product/store/actions/product.action';
import { loaderReducer } from '../loader/loader.reducer';
import { ScopedLoaderState } from './scoped-loader.state';

export const initialScopedLoaderState: ScopedLoaderState<any> = {};

/**
 * Higher order reducer designed to add scope support for loader reducer
 *
 * @param entityType
 * @param reducer
 */
export function scopedLoaderReducer<T>(
  entityType: string,
  reducer?: (state: T | undefined, action: Action) => T
): (
  state: ScopedLoaderState<T>,
  action: EntityScopedLoaderAction
) => ScopedLoaderState<T> {
  const loader = loaderReducer<T>(entityType, reducer);

  return (
    state: ScopedLoaderState<T> = initialScopedLoaderState,
    action: EntityScopedLoaderAction
  ): ScopedLoaderState<T> => {
    if (action && action.meta && action.meta.entityType === entityType) {
      return {
        ...state,
        [action.meta.scope ?? '']: loader(
          state[action.meta.scope ?? ''],
          action
        ),
      };
    }
    return state;
  };
}
