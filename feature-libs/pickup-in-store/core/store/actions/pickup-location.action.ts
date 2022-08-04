import { createAction, props } from '@ngrx/store';
import { AugmentedPointOfService } from '@spartacus/pickup-in-store/root';

export const ADD_LOCATION = '[Pickup Locations] Add Location';
export const REMOVE_LOCATION = '[Pickup Locations] Remove Location';

export type AddLocationProps = {
  payload: {
    productCode: string;
    location: AugmentedPointOfService;
  };
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
