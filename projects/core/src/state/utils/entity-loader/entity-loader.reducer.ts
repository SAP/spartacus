/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { entityReducer } from '../entity/entity.reducer';
import { LoaderAction } from '../loader/loader.action';
import { loaderReducer } from '../loader/loader.reducer';
import { EntityLoaderState } from './entity-loader-state';
import { EntityLoaderAction } from './entity-loader.action';

/**
 * Higher order reducer that wraps LoaderReducer and EntityReducer enhancing
 * single state reducer to support multiple entities with generic loading flags
 */
export function entityLoaderReducer<T, V extends LoaderAction = LoaderAction>(
  entityType: string,
  reducer?: (state: T | undefined, action: V | LoaderAction) => T | undefined
): (
  state: EntityLoaderState<T> | undefined,
  action: EntityLoaderAction
) => EntityLoaderState<T> {
  return entityReducer(entityType, loaderReducer(entityType, reducer));
}
