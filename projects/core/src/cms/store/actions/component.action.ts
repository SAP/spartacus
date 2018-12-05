import { Action } from '@ngrx/store';
import { CmsComponent } from '../../../occ-models';

export const LOAD_COMPONENT = '[Cms] Load Component';
export const LOAD_COMPONENT_FAIL = '[Cms] Load Component Fail';
export const LOAD_COMPONENT_SUCCESS = '[Cms] Load Component Success';
export const GET_COMPONENET_FROM_PAGE = '[Cms] Get Component from Page';
export const CLEAN_COMPONENT_STATE = '[Cms] Clean Component State';

export class LoadComponent implements Action {
  readonly type = LOAD_COMPONENT;
  constructor(public payload: string) {}
}

export class LoadComponentFail implements Action {
  readonly type = LOAD_COMPONENT_FAIL;
  constructor(public payload: any) {}
}

export class LoadComponentSuccess<T extends CmsComponent> implements Action {
  readonly type = LOAD_COMPONENT_SUCCESS;
  constructor(public payload: T) {}
}

export class GetComponentFromPage<T extends CmsComponent> implements Action {
  readonly type = GET_COMPONENET_FROM_PAGE;
  constructor(public payload: T[]) {}
}

export class CleanComponentState implements Action {
  readonly type = CLEAN_COMPONENT_STATE;
  constructor() {}
}

// action types
export type ComponentAction<T extends CmsComponent> =
  | LoadComponent
  | LoadComponentFail
  | LoadComponentSuccess<T>
  | GetComponentFromPage<T>
  | CleanComponentState;
