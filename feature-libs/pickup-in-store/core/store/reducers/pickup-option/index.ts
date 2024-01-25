/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { PickupOptionState } from '../../pickup-option-state';
import { pageContextReducer } from './page-context.reducer';
import { pickupOptionReducer } from './pickup-option.reducer';

export function getPickupReducers(): ActionReducerMap<PickupOptionState> {
  return {
    pageContext: pageContextReducer,
    pickupOption: pickupOptionReducer,
  };
}

export const pickupOptionReducersToken: InjectionToken<
  ActionReducerMap<PickupOptionState>
> = new InjectionToken<ActionReducerMap<PickupOptionState>>(
  'PickupOptionReducers'
);
export const pickupOptionReducersProvider: Provider = {
  provide: pickupOptionReducersToken,
  useFactory: getPickupReducers,
};

export const pickupOptionMetaReducers: MetaReducer<any>[] = [];
