/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ErrorAction } from '../../../error-handling';
import { StateUtils } from '../../../state/utils/index';
import { DISTRICTS } from '../user-state';

export const LOAD_DISTRICTS = '[User] Load Districts';
export const LOAD_DISTRICTS_SUCCESS = '[User] Load Districts Success';
export const LOAD_DISTRICTS_FAIL = '[User] Load Districts Fail';
export const CLEAR_DISTRICTS = '[User] Clear Districts';

export class LoadDistricts extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_DISTRICTS;

  constructor(public payload: string) {
    super(DISTRICTS);
  }
}

export class LoadDistrictsFail
  extends StateUtils.LoaderFailAction
  implements ErrorAction
{
  readonly type = LOAD_DISTRICTS_FAIL;

  constructor(public payload: any) {
    super(DISTRICTS, payload);
  }
}

export class LoadDistrictsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_DISTRICTS_SUCCESS;

  constructor(
    public payload: {
      entities: { isocode?: string; name?: string }[];
      cityIsocode: string;
    }
  ) {
    super(DISTRICTS);
  }
}

export class ClearDistricts implements Action {
  readonly type = CLEAR_DISTRICTS;
}

export type DistrictsAction =
  | LoadDistricts
  | LoadDistrictsFail
  | LoadDistrictsSuccess
  | ClearDistricts;
