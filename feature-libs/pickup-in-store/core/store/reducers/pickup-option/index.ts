/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { PickupOptionState } from '../../pickup-option-state';
import { pageContextReducer } from './page-context.reducer';
import { pickupOptionReducer } from './pickup-option.reducer';

function getReducers(): ActionReducerMap<PickupOptionState> {
  return {
    pickupOption: pickupOptionReducer,
    pageContext: pageContextReducer,
  };
}

export const pickupOptionReducersToken: InjectionToken<
  ActionReducerMap<PickupOptionState>
> = new InjectionToken<ActionReducerMap<PickupOptionState>>(
  'PickupOptionReducers'
);
export const pickupOptionReducersProvider: Provider = {
  provide: pickupOptionReducersToken,
  useFactory: getReducers,
};

export const pickupOptionMetaReducers: MetaReducer<any>[] = [];
