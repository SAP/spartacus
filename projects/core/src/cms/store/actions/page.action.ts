import { PAGE_DATA_ENTITY } from '../cms-state';
import {
  EntitySuccessAction,
  EntityLoadAction,
  EntityFailAction
} from '../../../state';
import { Page } from '../../model/page.model';
import { PageContext } from '../../../routing/index';

export const LOAD_PAGE_INDEX = '[Cms] Load Page Index';
export const LOAD_PAGE_INDEX_FAIL = '[Cms] Load Page Index Fail';
export const LOAD_PAGE_INDEX_SUCCESS = '[Cms] Load Page Index Success';
export const LOAD_PAGEDATA = '[Cms] Load PageData';
export const LOAD_PAGEDATA_FAIL = '[Cms] Load PageData Fail';
export const LOAD_PAGEDATA_SUCCESS = '[Cms] Load PageData Success';

// TODO:#1135v2 - test
export class LoadPageIndex extends EntityLoadAction {
  readonly type = LOAD_PAGE_INDEX;
  constructor(public payload: PageContext) {
    super(payload.type, payload.id);
  }
}

// TODO:#1135 - test
export class LoadPageIndexFail extends EntityFailAction {
  readonly type = LOAD_PAGE_INDEX_FAIL;
  constructor(public pageContext: PageContext, public payload: any) {
    super(pageContext.type, pageContext.id, payload);
  }
}

// TODO:#1135 - test
export class LoadPageIndexSuccess extends EntitySuccessAction {
  readonly type = LOAD_PAGE_INDEX_SUCCESS;
  constructor(public pageContext: PageContext, public payload: string) {
    super(pageContext.type, pageContext.id, payload);
  }
}

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

// action types
export type PageAction =
  | LoadPageIndex
  | LoadPageData
  | LoadPageDataFail
  | LoadPageDataSuccess;
