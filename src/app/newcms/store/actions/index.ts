import { Action } from "@ngrx/store";

export const CLEAR_CMS_STATE = "[Cms] Clear Cms State";

export class ClearCmsState implements Action {
  readonly type = CLEAR_CMS_STATE;
  constructor() {}
}

// action types
export type CmsAction = ClearCmsState;

export * from "./page.action";
export * from "./component.action";
