import { Action } from '@ngrx/store';
import { Region } from '../../../model/address.model';
import { StateUtils } from '../../../state/utils/index';
import { REGIONS } from '../user-state';

export const LOAD_REGIONS = '[User] Load Regions';
export const LOAD_REGIONS_SUCCESS = '[User] Load Regions Success';
export const LOAD_REGIONS_FAIL = '[User] Load Regions Fail';
export const CLEAR_REGIONS = '[User] Clear Regions';

export class LoadRegions extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_REGIONS;
  constructor(public payload: string) {
    super(REGIONS);
  }
}

export class LoadRegionsFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_REGIONS_FAIL;
  constructor(public payload: any) {
    super(REGIONS, payload);
  }
}

export class LoadRegionsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_REGIONS_SUCCESS;
  constructor(public payload: { entities: Region[]; country: string }) {
    super(REGIONS);
  }
}

export class ClearRegions implements Action {
  readonly type = CLEAR_REGIONS;
  constructor() {}
}

export type RegionsAction =
  | LoadRegions
  | LoadRegionsFail
  | LoadRegionsSuccess
  | ClearRegions;
