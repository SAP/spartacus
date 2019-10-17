import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { ConfiguratorActions } from '../actions';
import { Configurator } from './../../../../model/configurator.model';
import {
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
} from './../configuration-state';
import * as fromReducers from './../reducers/index';
import { ConfiguratorSelectors } from './index';

describe('Configurator selectors', () => {
  let store: Store<StateWithConfiguration>;
  const configuration: Configurator.Configuration = {
    configId: 'a',
    productCode: 'CONF_PRODUCT',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_FEATURE,
          fromReducers.getConfiguratorReducers()
        ),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithConfiguration>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return empty content when selecting with content selector initially', () => {
    let result: Configurator.Configuration;
    store
      .pipe(
        select(
          ConfiguratorSelectors.getConfigurationFactory(
            configuration.productCode
          )
        )
      )
      .subscribe(value => (result = value));

    expect(result).toEqual(undefined);
  });

  it('should return configuration content when selecting with content selector when action was successful', () => {
    let result: Configurator.Configuration;
    store
      .pipe(
        select(
          ConfiguratorSelectors.getConfigurationFactory(
            configuration.productCode
          )
        )
      )
      .subscribe(value => (result = value));

    store.dispatch(
      new ConfiguratorActions.CreateConfigurationSuccess(configuration)
    );

    expect(result).toEqual(configuration);
  });
});
