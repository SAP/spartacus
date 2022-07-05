import { createAction, props } from '@ngrx/store';
import { PointOfService } from '@spartacus/core';

export const ADD_LOCATION = '[Cart] Add Location';
export const REMOVE_LOCATION = '[Cart] Remove Location';

type AddLocationProps = {
  payload: {
    productCode: string;
    location: PointOfService;
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
