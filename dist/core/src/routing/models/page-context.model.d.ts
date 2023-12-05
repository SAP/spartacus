import { PageType } from '../../model/cms.model';
/**
 * The homepage id for the CMS homepage is not required when we query the backend.
 * CMS business users can have multiple pages, that they might switch quickly without
 * changing the page id. Therefore, we use a constant to keep track of the page in the
 * store, but are able to ignore the id while querying the backend.
 */
export declare const HOME_PAGE_CONTEXT = "__HOMEPAGE__";
/**
 * SmartEdit preview page is loaded by previewToken which is added by interceptor
 */
export declare const SMART_EDIT_CONTEXT = "smartedit-preview";
export declare class PageContext {
    id: string;
    type?: PageType;
    constructor(id: string, type?: PageType);
}
