import { MemoizedSelector, createSelector } from '@ngrx/store';
import { UserState, BillingCountriesState } from '../user-state';
import * as fromReducer from '../reducers/billing-countries.reducer';
import { getUserState } from '../reducers/index';

export const getBillingCountriesState: MemoizedSelector<
  any,
  BillingCountriesState
> = createSelector(
  getUserState,
  (state: UserState) => state.billingCountries
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
> = createSelector(
  getBillingCountriesEntites,
  entites => {
    return Object.keys(entites).map(isocode => entites[isocode]);
  }
);
