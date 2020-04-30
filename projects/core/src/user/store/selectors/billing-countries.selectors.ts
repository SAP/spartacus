import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Country } from '../../../model/address.model';
import {
  BillingCountriesState,
  BillingCountryEntities,
  StateWithUser,
  UserState,
} from '../user-state';
import { getUserState } from './feature.selector';

export const getBillingCountriesState: MemoizedSelector<
  StateWithUser,
  BillingCountriesState
> = createSelector(getUserState, (state: UserState) => state.billingCountries);

export const getBillingCountriesEntites: MemoizedSelector<
  StateWithUser,
  BillingCountryEntities
> = createSelector(
  getBillingCountriesState,
  (state: BillingCountriesState) => state.entities
);

export const getAllBillingCountries: MemoizedSelector<
  StateWithUser,
  Country[]
> = createSelector(getBillingCountriesEntites, (entites) =>
  Object.keys(entites).map((isocode) => entites[isocode])
);
