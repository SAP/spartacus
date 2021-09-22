import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, META_REDUCERS } from '@ngrx/store';
import { ConfigInitializerService, MODULE_INITIALIZER } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { MultiCartStatePersistenceService } from './services/multi-cart-state-persistence.service';
import { activeCartInitialState } from './store/reducers/multi-cart.reducer';

export function cartStatePersistenceFactory(
  cartStatePersistenceService: MultiCartStatePersistenceService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit
      .getStable('context')
      .pipe(
        tap(() => {
          cartStatePersistenceService.initSync();
        })
      )
      .toPromise();
  return result;
}

/**
 * Before `MultiCartStatePersistenceService` restores the active cart id `ActiveCartService`
 * will use `current` cart instead of the one saved in browser. This meta reducer
 * sets the value on store initialization to null cart which holds active cart loading
 * until the data from storage is restored.
 */
export function uninitializeActiveCartMetaReducerFactory(): MetaReducer<any> {
  const metaReducer = (reducer: ActionReducer<any>) => (state, action) => {
    const newState = { ...state };
    if (action.type === '@ngrx/store/init') {
      newState.cart = {
        ...newState.cart,
        ...{ active: activeCartInitialState },
      };
    }
    return reducer(newState, action);
  };
  return metaReducer;
}

/**
 * Complimentary module for cart to store cart id in browser storage.
 * This makes it possible to work on the same anonymous cart even after page refresh.
 */
@NgModule({
  imports: [],
  providers: [
    {
      provide: MODULE_INITIALIZER,
      useFactory: cartStatePersistenceFactory,
      deps: [MultiCartStatePersistenceService, ConfigInitializerService],
      multi: true,
    },
    {
      provide: META_REDUCERS,
      useFactory: uninitializeActiveCartMetaReducerFactory,
      multi: true,
    },
  ],
})
export class CartPersistenceModule {}
