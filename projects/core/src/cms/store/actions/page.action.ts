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

export class LoadPageIndex extends EntityLoadAction {
  readonly type = LOAD_PAGE_INDEX;
  constructor(public payload: PageContext) {
    super(payload.type, payload.id);
  }
}

export class LoadPageIndexFail extends EntityFailAction {
  readonly type = LOAD_PAGE_INDEX_FAIL;
  constructor(pageContext: PageContext, error: any) {
    super(pageContext.type, pageContext.id, error);
  }
}

export class LoadPageIndexSuccess extends EntitySuccessAction {
  readonly type = LOAD_PAGE_INDEX_SUCCESS;
  constructor(pageContext: PageContext, payload: string) {
    super(pageContext.type, pageContext.id, payload);
  }
}

export class LoadPageData extends EntityLoadAction {
  readonly type = LOAD_PAGEDATA;
  constructor(payload: PageContext) {
    super(PAGE_DATA_ENTITY, payload.id);
  }
}

export class LoadPageDataFail extends EntityFailAction {
  readonly type = LOAD_PAGEDATA_FAIL;
  constructor(pageContext: PageContext, error: any) {
    super(PAGE_DATA_ENTITY, pageContext.id, error);
  }
}

export class LoadPageDataSuccess extends EntitySuccessAction {
  readonly type = LOAD_PAGEDATA_SUCCESS;
  constructor(payload: Page) {
    super(PAGE_DATA_ENTITY, payload.pageId, payload);
  }
}

// action types
export type PageAction =
  | LoadPageIndex
  | LoadPageIndexFail
  | LoadPageIndexSuccess
  | LoadPageData
  | LoadPageDataFail
  | LoadPageDataSuccess;
