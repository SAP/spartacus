import { MemoizedSelector, createSelector } from '@ngrx/store';
import {
  UserState,
  DeliveryCountriesState,
  StateWithUser,
  DeliveryCountryEntities
} from '../user-state';
import { Country } from '../../../occ/occ-models/index';
import { getUserState } from './feature.selector';

export const getDeliveryCountriesState: MemoizedSelector<
  StateWithUser,
  DeliveryCountriesState
> = createSelector(
  getUserState,
  (state: UserState) => state.countries
);

export const getDeliveryCountriesEntites: MemoizedSelector<
  StateWithUser,
  DeliveryCountryEntities
> = createSelector(
  getDeliveryCountriesState,
  (state: DeliveryCountriesState) => state.entities
);

export const getAllDeliveryCountries: MemoizedSelector<
  StateWithUser,
  Country[]
> = createSelector(
  getDeliveryCountriesEntites,
  entites => Object.keys(entites).map(isocode => entites[isocode])
);

export const countrySelectorFactory = (
  isocode: string
): MemoizedSelector<StateWithUser, Country> =>
  createSelector(
    getDeliveryCountriesEntites,
    entities => (Object.keys(entities).length !== 0 ? entities[isocode] : null)
  );
