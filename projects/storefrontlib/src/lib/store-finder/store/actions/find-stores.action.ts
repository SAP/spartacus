import { Action } from '@ngrx/store';
import { SearchConfig } from '../../models/search-config';

export const FIND_STORES = '[FindStores] Find Stores';
export const FIND_STORES_FAIL = '[FindStores] Find Stores Fail';
export const FIND_STORES_SUCCESS = '[FindStores] Find Stores Success';

export const FIND_ALL_STORES = '[FindStores] Find All Stores';
export const FIND_ALL_STORES_FAIL = '[FindStores] Find All Stores Fail';
export const FIND_ALL_STORES_SUCCESS = '[FindStores] Find All Stores Success';

export const FIND_ALL_STORES_BY_COUNTRY =
  '[FindStores] Find All Stores by Country';
export const FIND_ALL_STORES_BY_COUNTRY_FAIL =
  '[FindStores] Find All Stores by Country Fail';
export const FIND_ALL_STORES_BY_COUNTRY_SUCCESS =
  '[FindStores] Find All Stores by Country Success';

export const FIND_ALL_STORES_BY_REGION =
  '[FindStores] Find All Stores by Region';
export const FIND_ALL_STORES_BY_REGION_FAIL =
  '[FindStores] Find All Stores by Region Fail';
export const FIND_ALL_STORES_BY_REGION_SUCCESS =
  '[FindStores] Find All Stores by Region Success';

export class FindStores implements Action {
  readonly type = FIND_STORES;
  constructor(
    public payload: { queryText: string; searchConfig?: SearchConfig }
  ) {}
}

export class FindStoresFail implements Action {
  readonly type = FIND_STORES_FAIL;
  constructor(public payload: any) {}
}

export class FindStoresSuccess implements Action {
  readonly type = FIND_STORES_SUCCESS;
  constructor(public payload: any) {}
}

export class FindAllStores implements Action {
  readonly type = FIND_ALL_STORES;
  constructor() {}
}

export class FindAllStoresFail implements Action {
  readonly type = FIND_ALL_STORES_FAIL;
  constructor(public payload: any) {}
}

export class FindAllStoresSuccess implements Action {
  readonly type = FIND_ALL_STORES_SUCCESS;
  constructor(public payload: any) {}
}

export class FindAllStoresByCountry implements Action {
  readonly type = FIND_ALL_STORES_BY_COUNTRY;
  constructor(public payload: { countryIsoCode: string }) {}
}

export class FindAllStoresByCountryFail implements Action {
  readonly type = FIND_ALL_STORES_BY_COUNTRY_FAIL;
  constructor(public payload: any) {}
}

export class FindAllStoresByCountrySuccess implements Action {
  readonly type = FIND_ALL_STORES_BY_COUNTRY_SUCCESS;
  constructor(public payload: any) {}
}

export class FindAllStoresByRegion implements Action {
  readonly type = FIND_ALL_STORES_BY_REGION;
  constructor(
    public payload: { countryIsoCode: string; regionIsoCode: string }
  ) {}
}

export class FindAllStoresByRegionFail implements Action {
  readonly type = FIND_ALL_STORES_BY_REGION_FAIL;
  constructor(public payload: any) {}
}

export class FindAllStoresByRegionSuccess implements Action {
  readonly type = FIND_ALL_STORES_BY_REGION_SUCCESS;
  constructor(public payload: any) {}
}

export type FindStoresAction =
  | FindStores
  | FindStoresFail
  | FindStoresSuccess
  | FindAllStores
  | FindAllStoresFail
  | FindAllStoresSuccess
  | FindAllStoresByCountry
  | FindAllStoresByCountryFail
  | FindAllStoresByCountrySuccess
  | FindAllStoresByRegion
  | FindAllStoresByRegionFail
  | FindAllStoresByRegionSuccess;
