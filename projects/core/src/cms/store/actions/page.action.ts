import { PAGE_DATA_ENTITY } from '../cms-state';
import {
  EntitySuccessAction,
  EntityLoadAction,
  EntityFailAction
} from '../../../state';
import { Page } from '../../model/page.model';
import { PageContext } from '../../../routing/index';

export const LOAD_PAGE_DATA = '[Cms] Load Page Data';
export const LOAD_PAGE_DATA_FAIL = '[Cms] Load Page Data Fail';
export const LOAD_PAGE_DATA_SUCCESS = '[Cms] Load Page Data Success';
export const ADD_PAGEDATA_SUCCESS = '[Cms] Add PageData Success';

export class LoadPageData extends EntityLoadAction {
  readonly type = LOAD_PAGE_DATA;
  constructor(public payload: PageContext) {
    super(payload.type, payload.id);
  }
}

export class LoadPageDataFail extends EntityFailAction {
  readonly type = LOAD_PAGE_DATA_FAIL;
  constructor(pageContext: PageContext, error: any) {
    super(pageContext.type, pageContext.id, error);
  }
}

export class LoadPageDataSuccess extends EntitySuccessAction {
  readonly type = LOAD_PAGE_DATA_SUCCESS;
  constructor(pageContext: PageContext, payload: Page) {
    super(pageContext.type, pageContext.id, payload);
  }
}

export class AddPageDataSuccess extends EntitySuccessAction {
  readonly type = ADD_PAGEDATA_SUCCESS;
  constructor(payload: Page) {
    super(PAGE_DATA_ENTITY, payload.pageId, payload);
  }
}

// action types
export type PageAction =
  | LoadPageData
  | LoadPageDataFail
  | LoadPageDataSuccess
  | AddPageDataSuccess;
