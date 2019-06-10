import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state';
import { Page } from '../../model/page.model';
import { PageContext } from '../../../routing/index';

export const LOAD_PAGE_DATA = '[Cms] Load Page Data';
export const LOAD_PAGE_DATA_FAIL = '[Cms] Load Page Data Fail';
export const LOAD_PAGE_DATA_SUCCESS = '[Cms] Load Page Data Success';
export const SET_PAGE_FAIL_INDEX = '[Cms] Set Page Fail Index';

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

export class SetPageFailIndex extends EntityFailAction {
  readonly type = SET_PAGE_FAIL_INDEX;
  constructor(pageContext: PageContext, public payload: string) {
    super(pageContext.type, pageContext.id);
  }
}

export class LoadPageDataSuccess extends EntitySuccessAction {
  readonly type = LOAD_PAGE_DATA_SUCCESS;
  constructor(pageContext: PageContext, payload: Page) {
    super(pageContext.type, pageContext.id, payload);
  }
}

// action types
export type PageAction =
  | LoadPageData
  | LoadPageDataFail
  | LoadPageDataSuccess
  | SetPageFailIndex;
