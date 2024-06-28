/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ActionErrorProperty, StateUtils } from '@spartacus/core';
import { STORE_FINDER_DATA } from '../store-finder-state';

export const VIEW_ALL_STORES = '[StoreFinder] View All Stores';
export const VIEW_ALL_STORES_FAIL = '[StoreFinder] View All Stores Fail';
export const VIEW_ALL_STORES_SUCCESS = '[StoreFinder] View All Stores Success';
export const CLEAR_STORE_FINDER_DATA = '[StoreFinder] Clear Data';

export class ViewAllStores extends StateUtils.LoaderLoadAction {
  readonly type = VIEW_ALL_STORES;

  constructor() {
    super(STORE_FINDER_DATA);
  }
}

export class ViewAllStoresFail extends StateUtils.LoaderFailAction {
  readonly type = VIEW_ALL_STORES_FAIL;

  constructor(error: ActionErrorProperty);
  /**
   * @deprecated Use the `error` parameter with a non-null, non-undefined value.
   *             Support for `null` or `undefined` will be removed in future versions,
   *             along with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- for distinguishing deprecated constructor
    error: any
  );
  constructor(public error: any) {
    super(STORE_FINDER_DATA, error);
  }
}

export class ViewAllStoresSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = VIEW_ALL_STORES_SUCCESS;

  constructor(public payload: any) {
    super(STORE_FINDER_DATA);
  }
}

export class ClearStoreFinderData implements Action {
  readonly type = CLEAR_STORE_FINDER_DATA;
}

export type ViewAllStoresAction =
  | ViewAllStores
  | ViewAllStoresFail
  | ViewAllStoresSuccess
  | ClearStoreFinderData;
