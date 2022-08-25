import { createAction, props } from '@ngrx/store';

const SET_PICKUP_OPTION = '[PickupOption] Set Pickup Option';
const SET_PAGE_CONTEXT = '[PickupOption] Set Page Context';

export const SetPickupOption = createAction(
  SET_PICKUP_OPTION,
  props<{ payload: { entryNumber: number; pickupOption: string } }>()
);
export const SetPageContext = createAction(
  SET_PAGE_CONTEXT,
  props<{ payload: { pageContext: string } }>()
);
