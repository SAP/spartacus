import { Action } from '@ngrx/store';

export const LOAD_TITLES = '[Checkout] Load Tiltes';
export const LOAD_TITLES_FAIL = '[Checkout] Load Titles Fail';
export const LOAD_TITLES_SUCCESS = '[Checkout] Load Titles Success';

export class LoadTitles implements Action {
  readonly type = LOAD_TITLES;
  constructor() {}
}

export class LoadTitlesFail implements Action {
  readonly type = LOAD_TITLES_FAIL;
  constructor(public payload: any) {}
}

export class LoadTitlesSuccess implements Action {
  readonly type = LOAD_TITLES_SUCCESS;
  constructor(public payload: any) {}
}

export type TitlesAction = LoadTitles | LoadTitlesFail | LoadTitlesSuccess;
