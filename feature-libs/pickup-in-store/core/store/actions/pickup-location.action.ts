/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createAction, props } from '@ngrx/store';
import { PointOfService } from '@spartacus/core';
import {
  AugmentedPointOfService,
  PickupOption,
} from '@spartacus/pickup-in-store/root';

export const ADD_LOCATION = '[Pickup Locations] Add Location';
export const REMOVE_LOCATION = '[Pickup Locations] Remove Location';
export const SET_PICKUP_OPTION = '[Pickup Locations] Set Pickup Option';
export const GET_STORE_DETAILS = '[Pickup Locations] Get Store Details';
export const STORE_DETAILS_SUCCESS =
  '[Pickup Locations] Get Store Details Success';
export const STORE_DETAILS_FAIL = '[Pickup Locations] Get Store Details Fail';

export const SET_PICKUP_OPTION_TO_DELIVERY =
  '[Pickup Locations] Set Pickup Option To Delivery';
export const SET_PICKUP_OPTION_TO_DELIVERY_SUCCESS =
  '[Pickup Locations] Set Pickup Option To Delivery Success';

export const SET_PICKUP_OPTION_TO_PICKUP_IN_STORE =
  '[Pickup Locations] Set Pickup Option To Pickup In Store';
export const SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS =
  '[Pickup Locations] Set Pickup Option To Pickup In Store Success';
export const CART_RELOAD_SUCCESS = '[Pickup Locations] CART_RELOAD_SUCCESS';
export const DELIVERY_MODE_SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS =
  '[Pickup Locations CHECKOUT] CHECKOUT_SET_PICKUP_OPTION_TO_PICKUP_IN_STORE_SUCCESS';
export type AddLocationProps = {
  payload: {
    productCode: string;
    location: AugmentedPointOfService;
  };
};

export type SetPickupOptionProps = {
  productCode: string;
  pickupOption: PickupOption;
};

/**
 * Add a proposed pickup location for a product code.
 */
export const AddLocation = createAction(
  ADD_LOCATION,
  props<AddLocationProps>()
);

/**
 * Remove a proposed pickup location for a product code.
 */
export const RemoveLocation = createAction(
  REMOVE_LOCATION,
  props<{ payload: string }>()
);

/**
 * Set pickup option for a product code.
 */

export const SetPickupOption = createAction(
  SET_PICKUP_OPTION,
  props<{ payload: SetPickupOptionProps }>()
);

/**
 * Get Store Details By Id
 */
export const GetStoreDetailsById = createAction(
  GET_STORE_DETAILS,
  props<{ payload: string }>()
);

export const SetStoreDetailsSuccess = createAction(
  STORE_DETAILS_SUCCESS,
  props<{ payload: PointOfService }>()
);

export const SetStoreDetailsFailure = createAction(
  STORE_DETAILS_FAIL,
  props<{ payload: any }>()
);
