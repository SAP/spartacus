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

    store = TestBed.get(Store as Type<Store<StateWithConfiguration>>);
    configuratorUtils = TestBed.get(GenericConfigUtilsService as Type<
      GenericConfigUtilsService
    >);
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

  it('should return pending changes as zero for an initial call', () => {
    store
      .pipe(select(ConfiguratorSelectors.getPendingChanges))
      .subscribe(pendingChanges => expect(pendingChanges).toBe(0));
  });

  it('should return pending changes as 1 if an update has happenend', () => {
    store.dispatch(new ConfiguratorActions.UpdateConfiguration(configuration));
    store
      .pipe(select(ConfiguratorSelectors.getPendingChanges))
      .subscribe(pendingChanges => expect(pendingChanges).toBe(1));
  });
});
