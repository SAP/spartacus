import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing/index';
import { StateUtils } from '../../../state/utils/index';
export declare const LOAD_CMS_COMPONENT = "[Cms] Load Component";
export declare const LOAD_CMS_COMPONENT_FAIL = "[Cms] Load Component Fail";
export declare const LOAD_CMS_COMPONENT_SUCCESS = "[Cms] Load Component Success";
export declare const CMS_GET_COMPONENT_FROM_PAGE = "[Cms] Get Component from Page";
export declare class LoadCmsComponent extends StateUtils.EntityLoadAction {
    payload: {
        uid: string;
        pageContext?: PageContext;
    };
    readonly type = "[Cms] Load Component";
    constructor(payload: {
        uid: string;
        pageContext?: PageContext;
    });
}
export declare class LoadCmsComponentFail extends StateUtils.EntityFailAction {
    payload: {
        uid: string;
        error?: any;
        pageContext: PageContext;
    };
    readonly type = "[Cms] Load Component Fail";
    constructor(payload: {
        uid: string;
        error?: any;
        pageContext: PageContext;
    });
}
export declare class LoadCmsComponentSuccess<T extends CmsComponent> extends StateUtils.EntitySuccessAction {
    payload: {
        component: T;
        uid?: string;
        pageContext: PageContext;
    };
    readonly type = "[Cms] Load Component Success";
    constructor(payload: {
        component: T;
        uid?: string;
        pageContext: PageContext;
    });
}
export declare class CmsGetComponentFromPage<T extends CmsComponent> extends StateUtils.EntitySuccessAction {
    payload: {
        component: T;
        pageContext: PageContext;
    } | {
        component: T;
        pageContext: PageContext;
    }[];
    readonly type = "[Cms] Get Component from Page";
    constructor(payload: {
        component: T;
        pageContext: PageContext;
    } | {
        component: T;
        pageContext: PageContext;
    }[]);
}
export type CmsComponentAction<T extends CmsComponent> = LoadCmsComponent | LoadCmsComponentFail | LoadCmsComponentSuccess<T> | CmsGetComponentFromPage<T>;
