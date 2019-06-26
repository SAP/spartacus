import { PageContext } from '../../../routing/index';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state';
import { Page } from '../../model/page.model';

export const LOAD_CMS_PAGE_DATA = '[Cms] Load Page Data';
export const LOAD_CMS_PAGE_DATA_FAIL = '[Cms] Load Page Data Fail';
export const LOAD_CMS_PAGE_DATA_SUCCESS = '[Cms] Load Page Data Success';
export const CMS_SET_PAGE_FAIL_INDEX = '[Cms] Set Page Fail Index';

export class LoadCmsPageData extends EntityLoadAction {
  readonly type = LOAD_CMS_PAGE_DATA;
  constructor(public payload: PageContext) {
    super(payload.type, payload.id);
  }
}

export class LoadCmsPageDataFail extends EntityFailAction {
  readonly type = LOAD_CMS_PAGE_DATA_FAIL;
  constructor(pageContext: PageContext, error: any) {
    super(pageContext.type, pageContext.id, error);
  }
}

export class LoadCmsPageDataSuccess extends EntitySuccessAction {
  readonly type = LOAD_CMS_PAGE_DATA_SUCCESS;
  constructor(pageContext: PageContext, payload: Page) {
    super(pageContext.type, pageContext.id, payload);
  }
}

export class CmsSetPageFailIndex extends EntityFailAction {
  readonly type = CMS_SET_PAGE_FAIL_INDEX;
  constructor(pageContext: PageContext, public payload: string) {
    super(pageContext.type, pageContext.id);
  }
}

// action types
export type CmsPageAction =
  | LoadCmsPageData
  | LoadCmsPageDataFail
  | LoadCmsPageDataSuccess
  | CmsSetPageFailIndex;
