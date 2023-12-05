import { CmsActions } from '../actions/index';
export declare const initialState: string | undefined;
export declare function reducer(entityType: string): (state: string | undefined, action: CmsActions.LoadCmsPageDataSuccess | CmsActions.LoadCmsPageDataFail | CmsActions.CmsSetPageFailIndex) => string | undefined;
