import { createAction, props } from '@ngrx/store';
import {
  AugmentedPointOfService,
  PickupOption,
} from '@spartacus/pickup-in-store/root';

export const ADD_LOCATION = '[Pickup Locations] Add Location';
export const REMOVE_LOCATION = '[Pickup Locations] Remove Location';
export const SET_PICKUP_OPTION = '[Pickup Locations] Set Pickup Option';

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
 * Setpickup option for a product code.
 */

export const SetPickupOption = createAction(
  SET_PICKUP_OPTION,
  props<{ payload: SetPickupOptionProps }>()
);
