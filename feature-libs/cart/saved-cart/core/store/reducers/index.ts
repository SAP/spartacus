import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { Cart, ListModel, StateUtils } from '@spartacus/core';
import {
  SavedCartManagement,
  SAVED_CART_ENTITIES,
  SAVED_CART_LIST,
} from '../saved-cart-state';
import {
  savedCartEntitiesReducer,
  savedCartListReducer,
} from './saved-cart.reducer';

export function getReducers(): ActionReducerMap<SavedCartManagement> {
  return {
    entities: StateUtils.entityLoaderReducer<Cart>(
      SAVED_CART_ENTITIES,
      savedCartEntitiesReducer
    ),
    list: StateUtils.entityLoaderReducer<ListModel>(
      SAVED_CART_LIST,
      savedCartListReducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  SavedCartManagement
>> = new InjectionToken<ActionReducerMap<SavedCartManagement>>('CartReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
