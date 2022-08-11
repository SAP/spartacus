import { Action } from '@ngrx/store';
import { PageContext } from '../../../routing/models/page-context.model';

export const CHANGE_NEXT_PAGE_CONTEXT = '[Router] Change Next PageContext';

export class ChangeNextPageContext implements Action {
  readonly type = CHANGE_NEXT_PAGE_CONTEXT;
  constructor(public payload: PageContext) {}
}

export type RoutingAction = ChangeNextPageContext;
