/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ErrorAction } from '../../../error-handling';
import { City } from '../../../model/address.model';
import { StateUtils } from '../../../state/utils/index';
import { CITIES } from '../user-state';

export const LOAD_CITIES = '[User] Load Cities';
export const LOAD_CITIES_SUCCESS = '[User] Load Cities Success';
export const LOAD_CITIES_FAIL = '[User] Load Cities Fail';
export const CLEAR_CITIES = '[User] Clear Cities';

export class LoadCities extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CITIES;

  constructor(public payload: string) {
    super(CITIES);
  }
}

export class LoadCitiesFail
  extends StateUtils.LoaderFailAction
  implements ErrorAction
{
  readonly type = LOAD_CITIES_FAIL;

  constructor(public payload: any) {
    super(CITIES, payload);
  }
}

export class LoadCitiesSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_CITIES_SUCCESS;

  constructor(
    public payload: {
      entities: City[];
      regionIsocode: string;
    }
  ) {
    super(CITIES);
  }
}

export class ClearCities implements Action {
  readonly type = CLEAR_CITIES;
}

export type CitiesAction =
  | LoadCities
  | LoadCitiesFail
  | LoadCitiesSuccess
  | ClearCities;
