import { MemoizedSelector, createSelector } from '@ngrx/store';
import { UserState } from '../user-state';
import * as fromFeature from '../reducers/index';
import * as fromReducer from '../reducers/billing-countries.reducer';

export const getBillingCountriesState = createSelector(
  fromFeature.getUserState,
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
