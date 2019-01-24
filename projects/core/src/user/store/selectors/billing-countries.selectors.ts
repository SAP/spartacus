import { MemoizedSelector, createSelector } from '@ngrx/store';
import {
  UserState,
  BillingCountriesState,
  StateWithUser,
  BillingCountryEntities
} from '../user-state';
import { getUserState } from './feature.selector';
import { Country } from '../../../occ/occ-models/occ.models';

export const getBillingCountriesState: MemoizedSelector<
  StateWithUser,
  BillingCountriesState
> = createSelector(
  getUserState,
  (state: UserState) => state.billingCountries
);

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
> = createSelector(
  getBillingCountriesEntites,
  entites => Object.keys(entites).map(isocode => entites[isocode])
);
