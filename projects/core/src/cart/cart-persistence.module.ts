import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, META_REDUCERS } from '@ngrx/store';
import { ConfigInitializerService } from '../config/config-initializer/config-initializer.service';
import { MultiCartStatePersistenceService } from './services/multi-cart-state-persistence.service';

export function cartStatePersistenceFactory(
  cartStatePersistenceService: MultiCartStatePersistenceService,
  configInit: ConfigInitializerService
) {
  const result = () =>
    configInit.getStableConfig('context').then(() => {
      cartStatePersistenceService.sync();
    });
  return result;
}

export function uninitializeActiveCartMetaReducerFactory(): MetaReducer<any> {
  return (reducer: ActionReducer<any>) => (state, action) => {
    const newState = { ...state };
    if (action.type === '@ngrx/store/init') {
      newState.cart = { ...newState.cart, ...{ active: undefined } };
    }
    return reducer(newState, action);
  };
}

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
