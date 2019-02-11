import { Action } from '@ngrx/store';

import { Title } from '../../../occ/occ-models';

export const LOAD_TITLES = '[User] Load Tiltes';
export const LOAD_TITLES_FAIL = '[User] Load Titles Fail';
export const LOAD_TITLES_SUCCESS = '[User] Load Titles Success';

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
  constructor(public payload: Title[]) {}
}

export type TitlesAction = LoadTitles | LoadTitlesFail | LoadTitlesSuccess;
