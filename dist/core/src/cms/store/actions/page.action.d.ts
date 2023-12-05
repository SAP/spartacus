import { PageContext } from '../../../routing/index';
import { StateUtils } from '../../../state/utils/index';
import { Page } from '../../model/page.model';
export declare const LOAD_CMS_PAGE_DATA = "[Cms] Load Page Data";
export declare const LOAD_CMS_PAGE_DATA_FAIL = "[Cms] Load Page Data Fail";
export declare const LOAD_CMS_PAGE_DATA_SUCCESS = "[Cms] Load Page Data Success";
export declare const CMS_SET_PAGE_SUCCESS_INDEX = "[Cms] Set Page Success Index";
export declare const CMS_SET_PAGE_FAIL_INDEX = "[Cms] Set Page Fail Index";
export declare class LoadCmsPageData extends StateUtils.EntityLoadAction {
    payload: PageContext;
    readonly type = "[Cms] Load Page Data";
    constructor(payload: PageContext);
}
export declare class LoadCmsPageDataFail extends StateUtils.EntityFailAction {
    readonly type = "[Cms] Load Page Data Fail";
    constructor(pageContext: PageContext, error: any);
}
export declare class LoadCmsPageDataSuccess extends StateUtils.EntitySuccessAction {
    readonly type = "[Cms] Load Page Data Success";
    constructor(pageContext: PageContext, payload: Page);
}
export declare class CmsSetPageSuccessIndex extends StateUtils.EntitySuccessAction {
    readonly type = "[Cms] Set Page Success Index";
    constructor(pageContext: PageContext, payload: Page);
}
export declare class CmsSetPageFailIndex extends StateUtils.EntityFailAction {
    payload: string;
    readonly type = "[Cms] Set Page Fail Index";
    constructor(pageContext: PageContext, payload: string);
}
export type CmsPageAction = LoadCmsPageData | LoadCmsPageDataFail | LoadCmsPageDataSuccess | CmsSetPageFailIndex;
