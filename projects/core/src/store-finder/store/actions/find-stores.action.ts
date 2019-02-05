import { StoreFinderSearchConfig } from '../../model/search-config';
import { LongitudeLatitude } from '../../model/longitude-latitude';
import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction
} from '../../../state/utils/loader/loader.action';
import { STORE_FINDER_DATA } from '../store-finder-state';

export const ON_HOLD = '[StoreFinder] On Hold';
export const FIND_STORES = '[StoreFinder] Find Stores';
export const FIND_STORES_FAIL = '[StoreFinder] Find Stores Fail';
export const FIND_STORES_SUCCESS = '[StoreFinder] Find Stores Success';

export const FIND_STORE_BY_ID = '[StoreFinder] Find a Store by Id';
export const FIND_STORE_BY_ID_FAIL = '[StoreFinder] Find a Store by Id Fail';
export const FIND_STORE_BY_ID_SUCCESS =
  '[StoreFinder] Find a Store by Id Success';
export const FIND_ALL_STORES_BY_COUNTRY =
  '[StoreFinder] Find All Stores by Country';
export const FIND_ALL_STORES_BY_COUNTRY_FAIL =
  '[StoreFinder] Find All Stores by Country Fail';
export const FIND_ALL_STORES_BY_COUNTRY_SUCCESS =
  '[StoreFinder] Find All Stores by Country Success';

export const FIND_ALL_STORES_BY_REGION =
  '[StoreFinder] Find All Stores by Region';
export const FIND_ALL_STORES_BY_REGION_FAIL =
  '[StoreFinder] Find All Stores by Region Fail';
export const FIND_ALL_STORES_BY_REGION_SUCCESS =
  '[StoreFinder] Find All Stores by Region Success';

export class OnHold extends LoaderLoadAction {
  readonly type = ON_HOLD;
  constructor() {
    super(STORE_FINDER_DATA);
  }
}

export class FindStores extends LoaderLoadAction {
  readonly type = FIND_STORES;
  constructor(
    public payload: {
      queryText: string;
      longitudeLatitude?: LongitudeLatitude;
      useMyLocation?: boolean;
      searchConfig?: StoreFinderSearchConfig;
    }
  ) {
    super(STORE_FINDER_DATA);
  }
}

export class FindStoresFail extends LoaderFailAction {
  readonly type = FIND_STORES_FAIL;
  constructor(public payload: any) {
    super(STORE_FINDER_DATA, payload);
  }
}

export class FindStoresSuccess extends LoaderSuccessAction {
  readonly type = FIND_STORES_SUCCESS;
  constructor(public payload: any) {
    super(STORE_FINDER_DATA);
  }
}

export class FindStoreById extends LoaderLoadAction {
  readonly type = FIND_STORE_BY_ID;
  constructor(public payload: { storeId: string }) {
    super(STORE_FINDER_DATA);
  }
}

export class FindStoreByIdFail extends LoaderFailAction {
  readonly type = FIND_STORE_BY_ID_FAIL;
  constructor(public payload: any) {
    super(STORE_FINDER_DATA, payload);
  }
}

export class FindStoreByIdSuccess extends LoaderSuccessAction {
  readonly type = FIND_STORE_BY_ID_SUCCESS;
  constructor(public payload: any) {
    super(STORE_FINDER_DATA);
  }
}

export class FindAllStoresByCountry extends LoaderLoadAction {
  readonly type = FIND_ALL_STORES_BY_COUNTRY;
  constructor(public payload: { countryIsoCode: string }) {
    super(STORE_FINDER_DATA);
  }
}

export class FindAllStoresByCountryFail extends LoaderFailAction {
  readonly type = FIND_ALL_STORES_BY_COUNTRY_FAIL;
  constructor(public payload: any) {
    super(STORE_FINDER_DATA, payload);
  }
}

export class FindAllStoresByCountrySuccess extends LoaderSuccessAction {
  readonly type = FIND_ALL_STORES_BY_COUNTRY_SUCCESS;
  constructor(public payload: any) {
    super(STORE_FINDER_DATA);
  }
}

export class FindAllStoresByRegion extends LoaderLoadAction {
  readonly type = FIND_ALL_STORES_BY_REGION;
  constructor(
    public payload: { countryIsoCode: string; regionIsoCode: string }
  ) {
    super(STORE_FINDER_DATA);
  }
}

export class FindAllStoresByRegionFail extends LoaderFailAction {
  readonly type = FIND_ALL_STORES_BY_REGION_FAIL;
  constructor(public payload: any) {
    super(STORE_FINDER_DATA, payload);
  }
}

export class FindAllStoresByRegionSuccess extends LoaderSuccessAction {
  readonly type = FIND_ALL_STORES_BY_REGION_SUCCESS;
  constructor(public payload: any) {
    super(STORE_FINDER_DATA);
  }
}

export type FindStoresAction =
  | OnHold
  | FindStores
  | FindStoresFail
  | FindStoresSuccess
  | FindStoreById
  | FindStoreByIdFail
  | FindStoreByIdSuccess
  | FindAllStoresByCountry
  | FindAllStoresByCountryFail
  | FindAllStoresByCountrySuccess
  | FindAllStoresByRegion
  | FindAllStoresByRegionFail
  | FindAllStoresByRegionSuccess;
