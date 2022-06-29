import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { productConfiguration } from '../../testing/configurator-test-data';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions';
import {
  CONFIGURATOR_FEATURE,
  StateWithConfigurator,
} from '../state/configurator-state';
import { getConfiguratorReducers } from '../state/reducers';
import { ConfiguratorVariantSearchService } from './configurator-variant-search.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

const productConfigurationNotYetFullyCreated: Configurator.Configuration = {
  ...productConfiguration,
  variants: [{ productCode: 'CONF_LAPTOP_A' }],
  flatGroups: [],
  overview: undefined,
};

const productConfigurationCreated: Configurator.Configuration = {
  ...productConfiguration,
};

const productConfigurationWithVariantsSearchResult: Configurator.Configuration =
  {
    ...productConfiguration,
    variants: [{ productCode: 'CONF_LAPTOP_A' }],
  };

describe('ConfiguratorVariantSearchService', () => {
  let classUnderTest: ConfiguratorVariantSearchService;
  let store: Store<StateWithConfigurator>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers),
        ],
        providers: [ConfiguratorVariantSearchService, ConfiguratorUtilsService],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorVariantSearchService as Type<ConfiguratorVariantSearchService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);

    spyOn(store, 'dispatch').and.stub();
  });

  it('should create service', () => {
    expect(classUnderTest).toBeDefined();
  });

  describe('searchVariants', () => {
    it('should return variants once fully created and once variant search has succeeded', () => {
      const configurationVariantsAvailable$ = cold('x-y-z', {
        x: productConfigurationNotYetFullyCreated,
        y: productConfigurationCreated,
        z: productConfigurationWithVariantsSearchResult,
      });
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () => configurationVariantsAvailable$
      );
      const configuration$ =
        classUnderTest.searchVariants(productConfiguration);

      expect(configuration$).toBeObservable(
        cold('----z', { z: productConfigurationWithVariantsSearchResult })
      );
    });

    it('should dispatch corresponding action to the store if variants are not yet present', () => {
      const configurationVariantsAvailable$ = cold('x', {
        x: productConfigurationCreated,
      });
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () => configurationVariantsAvailable$
      );

      classUnderTest.searchVariants(productConfiguration).subscribe(() => {
        const expectedAction = new ConfiguratorActions.SearchVariants(
          productConfiguration
        );
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });
    });
  });
});
