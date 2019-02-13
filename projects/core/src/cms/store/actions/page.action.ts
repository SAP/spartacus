import { Action } from '@ngrx/store';

import { PAGE_DATA_ENTITY } from '../cms-state';
import {
  EntitySuccessAction,
  EntityLoadAction,
  EntityFailAction
} from '../../../state';
import { Page } from '../../model/page.model';
import { PageContext } from '../../../routing/index';

export const LOAD_PAGEDATA = '[Cms] Load PageData';
export const LOAD_PAGEDATA_FAIL = '[Cms] Load PageData Fail';
export const LOAD_PAGEDATA_SUCCESS = '[Cms] Load PageData Success';
export const UPDATE_LATEST_PAGE_ID = '[Cms] Update latest page key';

// TODO:#1135 - update test
export class LoadPageData extends EntityLoadAction {
  readonly type = LOAD_PAGEDATA;
  constructor(public payload: PageContext) {
    super(PAGE_DATA_ENTITY, payload.id);
  }
}

// TODO:#1135 - update test
export class LoadPageDataFail extends EntityFailAction {
  readonly type = LOAD_PAGEDATA_FAIL;
  constructor(public payload: any) {
    super(PAGE_DATA_ENTITY, payload);
  }
}

// TODO:#1135 - update test
export class LoadPageDataSuccess extends EntitySuccessAction {
  readonly type = LOAD_PAGEDATA_SUCCESS;
  constructor(public payload: Page) {
    super(PAGE_DATA_ENTITY, payload.pageId);
  }
}

export class UpdateLatestPageId implements Action {
  readonly type = UPDATE_LATEST_PAGE_ID;
  constructor(public payload: string) {}
}

// action types
export type PageAction =
  | LoadPageData
  | LoadPageDataFail
  | LoadPageDataSuccess
  | UpdateLatestPageId;
