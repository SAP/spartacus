import { Action } from '@ngrx/store';
import { PageContext } from '../../../routing/models/page-context.model';
export declare const CHANGE_NEXT_PAGE_CONTEXT = "[Router] Change Next PageContext";
export declare class ChangeNextPageContext implements Action {
    payload: PageContext;
    readonly type = "[Router] Change Next PageContext";
    constructor(payload: PageContext);
}
export type RoutingAction = ChangeNextPageContext;
