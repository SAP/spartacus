import { Action } from '@ngrx/store';

export const LOAD_NAVIGATION_ITEMS = '[Cms] Load NavigationEntry items';
export const LOAD_NAVIGATION_ITEMS_FAIL =
  '[Cms] Load NavigationEntry items Fail';
export const LOAD_NAVIGATION_ITEMS_SUCCESS =
  '[Cms] Load NavigationEntry items Success';

export class LoadNavigationItems implements Action {
  readonly type = LOAD_NAVIGATION_ITEMS;
  constructor(public payload: { nodeId: string; items: any[] }) {}
}

export class LoadNavigationItemsFail implements Action {
  readonly type = LOAD_NAVIGATION_ITEMS_FAIL;
  constructor(public payload: any) {}
}

export class LoadNavigationItemsSuccess implements Action {
  readonly type = LOAD_NAVIGATION_ITEMS_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type NavigationEntryItemAction =
  | LoadNavigationItems
  | LoadNavigationItemsFail
  | LoadNavigationItemsSuccess;
