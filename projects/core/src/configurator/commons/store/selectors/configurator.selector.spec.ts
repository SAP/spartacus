import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as ConfiguratorActions from '../actions/configurator.action';
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
  });

  it('should return empty content when selecting with content selector initially', () => {
    let result: Configurator.Configuration;
    store
      .pipe(select(ConfiguratorSelectors.getConfigurationContent))
      .subscribe(value => (result = value));

    expect(result).toEqual(null);
  });

  it('should return content from state when selecting with content selector', () => {
    let result: Configurator.Configuration;
    store.dispatch(
      new ConfiguratorActions.CreateConfigurationSuccess(configuration)
    );

    store
      .pipe(select(ConfiguratorSelectors.getConfigurationContent))
      .subscribe(value => (result = value));

    expect(result).toEqual(configuration);
  });
});
