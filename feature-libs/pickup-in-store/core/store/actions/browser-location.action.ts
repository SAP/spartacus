import { createAction, props } from '@ngrx/store';

export const ADD_BROWSER_LOCATION = '[Pickup Locations] Add Browser Location';

export type AddBrowserLocationProps = {
  longitude: number;
  latitude: number;
};

export const AddBrowserLocation = createAction(
  ADD_BROWSER_LOCATION,
  props<{ payload: AddBrowserLocationProps }>()
);
