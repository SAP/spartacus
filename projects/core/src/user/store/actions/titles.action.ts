import { Action } from '@ngrx/store';

import { LoaderResetAction } from '../../../state';
import { Title } from '../../../occ/occ-models';

export const LOAD_TITLES = '[User] Load Tiltes';
export const LOAD_TITLES_FAIL = '[User] Load Titles Fail';
export const LOAD_TITLES_SUCCESS = '[User] Load Titles Success';
export const RESET_TITLES = '[User] Reset Tiltes';

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

export class ResetTitles extends LoaderResetAction {
  readonly type = RESET_TITLES;
  constructor() {
    super(RESET_TITLES);
  }
}

export type TitlesAction = LoadTitles | LoadTitlesFail | LoadTitlesSuccess;
