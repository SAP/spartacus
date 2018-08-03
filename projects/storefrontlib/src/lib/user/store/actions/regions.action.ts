import { Action } from '@ngrx/store';

export const LOAD_REGIONS = '[User] Load Regions';
export const LOAD_REGIONS_SUCCESS = '[User] Load Regions Success';
export const LOAD_REGIONS_FAIL = '[User] Load Regions Fail';

export class LoadRegions implements Action {
  readonly type = LOAD_REGIONS;
  constructor(public payload: string) {}
}

export class LoadRegionsFail implements Action {
  readonly type = LOAD_REGIONS_FAIL;
  constructor(public payload: any) {}
}

export class LoadRegionsSuccess implements Action {
  readonly type = LOAD_REGIONS_SUCCESS;
  constructor(public payload: any) {}
}

export type RegionsAction = LoadRegions | LoadRegionsFail | LoadRegionsSuccess;
