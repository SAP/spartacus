import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/suggested-addresses.reducer';

export const getSuggestedAddressesState = createSelector(
  fromFeature.getCheckoutState,
  (state: fromFeature.CheckoutState) => state.suggestedAddresses
);

export const getSuggestedAddressesEntites: MemoizedSelector<
  any,
  any
> = createSelector(
  getSuggestedAddressesState,
  fromReducer.getSuggestedAddressesEntites
);
