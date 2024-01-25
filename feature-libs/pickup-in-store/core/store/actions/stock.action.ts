/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createAction, props } from '@ngrx/store';
import { StateUtils, Stock, StoreFinderStockSearchPage } from '@spartacus/core';
import { StockLocationSearchParams } from '@spartacus/pickup-in-store/root';
import { STOCK_DATA } from '../stock-state';

export const STOCK_LEVEL = '[Stock] Get Stock Level';
export const STOCK_LEVEL_ON_HOLD = '[Stock] On Hold';
export const STOCK_LEVEL_FAIL = '[Stock] Get Stock Level Fail';
export const STOCK_LEVEL_SUCCESS = '[Stock] Get Stock Level Success';
export const CLEAR_STOCK_DATA = '[Stock] Clear Data';

export const STOCK_LEVEL_AT_STORE = '[Stock] Get Stock Level at Store';
export const STOCK_LEVEL_AT_STORE_SUCCESS =
  '[Stock] Get Stock Level at Store Success';

export class StockLevel extends StateUtils.LoaderLoadAction {
  readonly type = STOCK_LEVEL;
  constructor(public payload: StockLocationSearchParams) {
    super(STOCK_DATA);
  }
}

export class StockLevelOnHold extends StateUtils.LoaderLoadAction {
  readonly type = STOCK_LEVEL_ON_HOLD;
  constructor() {
    super(STOCK_DATA);
  }
}

export class StockLevelFail extends StateUtils.LoaderFailAction {
  readonly type = STOCK_LEVEL_FAIL;
  constructor(public payload: any) {
    super(STOCK_DATA, payload);
  }
}

export type StockLevelSuccessPayload = {
  productCode: string;
  stockLevels: StoreFinderStockSearchPage;
};

export class StockLevelSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = STOCK_LEVEL_SUCCESS;
  constructor(public payload: StockLevelSuccessPayload) {
    super(STOCK_DATA);
  }
}

export class ClearStockData extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_STOCK_DATA;
  constructor() {
    super(STOCK_DATA);
  }
}

export type StockLevelAction =
  | StockLevel
  | StockLevelOnHold
  | StockLevelFail
  | StockLevelSuccess
  | ClearStockData;

type StockLevelAtStorePayload = { productCode: string; storeName: string };

/**
 * Add a proposed pickup location for a product code.
 */
export const StockLevelAtStore = createAction(
  STOCK_LEVEL_AT_STORE,
  props<{ payload: StockLevelAtStorePayload }>()
);

export type StockLevelAtStoreAction = ReturnType<typeof StockLevelAtStore>;

type StockLevelAtStoreSuccessPayload = StockLevelAtStorePayload & {
  stockLevel: Stock;
};

/**
 * Add the stock level for a product at a store.
 */
export const StockLevelAtStoreSuccess = createAction(
  STOCK_LEVEL_AT_STORE_SUCCESS,
  props<{ payload: StockLevelAtStoreSuccessPayload }>()
);
