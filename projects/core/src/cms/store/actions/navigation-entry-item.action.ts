import { NAVIGATION_DETAIL_ENTITY } from '../cms-state';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction
} from '../../../state/utils/entity-loader/entity-loader.action';

export const LOAD_NAVIGATION_ITEMS = '[Cms] Load NavigationEntry items';
export const LOAD_NAVIGATION_ITEMS_FAIL =
  '[Cms] Load NavigationEntry items Fail';
export const LOAD_NAVIGATION_ITEMS_SUCCESS =
  '[Cms] Load NavigationEntry items Success';

export class LoadNavigationItems extends EntityLoadAction {
  readonly type = LOAD_NAVIGATION_ITEMS;
  constructor(public payload: { nodeId: string; items: any[] }) {
    super(NAVIGATION_DETAIL_ENTITY, payload.nodeId);
  }
}

export class LoadNavigationItemsFail extends EntityFailAction {
  readonly type = LOAD_NAVIGATION_ITEMS_FAIL;
  constructor(public nodeId: string, public payload: any) {
    super(NAVIGATION_DETAIL_ENTITY, nodeId, payload);
  }
}

export class LoadNavigationItemsSuccess extends EntitySuccessAction {
  readonly type = LOAD_NAVIGATION_ITEMS_SUCCESS;
  constructor(public payload: { nodeId: string; components: any[] }) {
    super(NAVIGATION_DETAIL_ENTITY, payload.nodeId);
  }
}

// action types
export type NavigationEntryItemAction =
  | LoadNavigationItems
  | LoadNavigationItemsFail
  | LoadNavigationItemsSuccess;
