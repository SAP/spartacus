import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import { GenericConfigUtilsService } from '../../../generic/utils/config-utils.service';
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
  let configuratorUtils: GenericConfigUtilsService;
  const productCode = 'CONF_LAPTOP';
  const owner: GenericConfigurator.Owner = {
    type: GenericConfigurator.OwnerType.PRODUCT,
    id: productCode,
  };

  const configuration: Configurator.Configuration = {
    configId: 'a',
    productCode: productCode,
    owner: owner,
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

    store = TestBed.inject(Store as Type<Store<StateWithConfiguration>>);
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    configuratorUtils.setOwnerKey(owner);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return empty content when selecting with content selector initially', () => {
    let result: Configurator.Configuration;
    store
      .pipe(
        select(
          ConfiguratorSelectors.getConfigurationFactory(configuration.owner.key)
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
          ConfiguratorSelectors.getConfigurationFactory(configuration.owner.key)
        )
      )
      .subscribe(value => (result = value));

    store.dispatch(
      new ConfiguratorActions.CreateConfigurationSuccess(configuration)
    );

    expect(result).toEqual(configuration);
  });

  it('should return pending changes as false for an initial call', () => {
    store
      .pipe(
        select(ConfiguratorSelectors.hasPendingChanges(configuration.owner.key))
      )
      .subscribe(hasPendingChanges => expect(hasPendingChanges).toBe(false));
  });

  it('should return pending changes as true if an update has happenend', () => {
    store.dispatch(new ConfiguratorActions.UpdateConfiguration(configuration));
    store
      .pipe(
        select(ConfiguratorSelectors.hasPendingChanges(configuration.owner.key))
      )
      .subscribe(hasPendingChanges => expect(hasPendingChanges).toBe(true));
  });
});
