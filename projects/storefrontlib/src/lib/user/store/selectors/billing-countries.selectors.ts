import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/billing-countries.reducer';

export const getBillingCountriesState = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.billingCountries
);

export const getBillingCountriesEntites: MemoizedSelector<
  any,
  any
> = createSelector(
  getBillingCountriesState,
  fromReducer.getBillingCountriesEntites
);

export const getAllBillingCountries: MemoizedSelector<
  any,
  any
> = createSelector(getBillingCountriesEntites, entites => {
  return Object.keys(entites).map(isocode => entites[isocode]);
});
