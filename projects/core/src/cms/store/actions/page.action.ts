import { Action } from '@ngrx/store';
import { Page } from '../../model/page.model';
import { PageContext } from '../../../routing/index';

export const LOAD_PAGEDATA = '[Cms] Load PageData';
export const LOAD_PAGEDATA_FAIL = '[Cms] Load PageData Fail';
export const LOAD_PAGEDATA_SUCCESS = '[Cms] Load PageData Success';
export const REFRESH_LATEST_PAGE = '[Cms] Refresh latest page';
export const UPDATE_LATEST_PAGE_KEY = '[Cms] Update latest page key';
export const CLEAN_PAGE_STATE = '[Cms] Clean Page State;';

export class LoadPageData implements Action {
  readonly type = LOAD_PAGEDATA;
  constructor(public payload: PageContext) {}
}

export class LoadPageDataFail implements Action {
  readonly type = LOAD_PAGEDATA_FAIL;
  constructor(public payload: any) {}
}

export class LoadPageDataSuccess implements Action {
  readonly type = LOAD_PAGEDATA_SUCCESS;
  constructor(public payload: { key: string; value: Page }) {}
}

export class RefreshLatestPage implements Action {
  readonly type = REFRESH_LATEST_PAGE;
}

export class UpdateLatestPageKey implements Action {
  readonly type = UPDATE_LATEST_PAGE_KEY;
  constructor(public payload: string) {}
}

export class CleanPageState implements Action {
  readonly type = CLEAN_PAGE_STATE;
  constructor() {}
}

// action types
export type PageAction =
  | LoadPageData
  | LoadPageDataFail
  | LoadPageDataSuccess
  | RefreshLatestPage
  | UpdateLatestPageKey
  | CleanPageState;
