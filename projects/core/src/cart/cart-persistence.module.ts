import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, META_REDUCERS } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../config/config-initializer/config-initializer.service';
import { Config } from '../config/config-tokens';
import { MultiCartStatePersistenceService } from './services/multi-cart-state-persistence.service';
import { activeCartInitialState } from './store/reducers/multi-cart.reducer';

export function cartStatePersistenceFactory(
  cartStatePersistenceService: MultiCartStatePersistenceService,
  configInit: ConfigInitializerService
): () => Promise<Config> {
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
@NgModule()
export class CartPersistenceModule {
  static forRoot(): ModuleWithProviders<CartPersistenceModule> {
    return {
      ngModule: CartPersistenceModule,
      providers: [
        {
          provide: APP_INITIALIZER,
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
    };
  }
}
