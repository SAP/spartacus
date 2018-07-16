import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/delivery-countries.reducer';

export const getDeliveryCountriesState = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.countries
);

export const getDeliveryCountriesEntites: MemoizedSelector<
  any,
  any
> = createSelector(
  getDeliveryCountriesState,
  fromReducer.getDeliveryCountriesEntites
);

export const getAllDeliveryCountries: MemoizedSelector<
  any,
  any
> = createSelector(getDeliveryCountriesEntites, entites => {
  return Object.keys(entites).map(isocode => entites[isocode]);
});

export const countrySelectorFactory = (isocode): MemoizedSelector<any, any> => {
  return createSelector(getDeliveryCountriesEntites, entities => {
    if (Object.keys(entities).length !== 0) {
      return entities[isocode];
    } else {
      return null;
    }
  });
};
