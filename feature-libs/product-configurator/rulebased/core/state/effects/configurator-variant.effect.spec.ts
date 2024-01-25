import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { ConfiguratorCoreConfig } from '../../config/configurator-core.config';
import { RulebasedConfiguratorConnector } from '../../connectors/rulebased-configurator.connector';
import { ConfiguratorUtilsService } from '../../facade/utils/configurator-utils.service';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
import { CONFIGURATOR_FEATURE } from '../configurator-state';
import { getConfiguratorReducers } from '../reducers/index';
import * as fromEffects from './configurator-variant.effect';

const productCode = 'CONF_LAPTOP';

const errorResponse: HttpErrorResponse = new HttpErrorResponse({
  error: 'notFound',
  status: 404,
});
const owner: CommonConfigurator.Owner = {
  type: CommonConfigurator.OwnerType.PRODUCT,
  id: productCode,
  key: 'product/CONF_LAPTOP',
  configuratorType: ConfiguratorType.VARIANT,
};

const productConfiguration: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration('a', owner),
  productCode: productCode,
};

const variants: Configurator.Variant[] = [
  { productCode: 'CONF_LAPTOP_A' },
  { productCode: 'CONF_LAPTOP_B' },
];

let configuratorCoreConfig: ConfiguratorCoreConfig;

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('ConfiguratorVariantEffect', () => {
  let searchVariantsMock: jasmine.Spy;

  let configEffects: fromEffects.ConfiguratorVariantEffects;

  let actions$: Observable<any>;

  beforeEach(() => {
    searchVariantsMock = jasmine.createSpy().and.returnValue(of(variants));
    configuratorCoreConfig = {
      productConfigurator: { enableVariantSearch: true },
    };
    productConfiguration.owner.configuratorType = ConfiguratorType.VARIANT;

    class MockConnector {
      searchVariants = searchVariantsMock;
    }

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers()),
      ],

      providers: [
        fromEffects.ConfiguratorVariantEffects,
        provideMockActions(() => actions$),
        {
          provide: RulebasedConfiguratorConnector,
          useClass: MockConnector,
        },
        {
          provide: ConfiguratorUtilsService,
          useClass: ConfiguratorUtilsService,
        },
        {
          provide: ConfiguratorCoreConfig,
          useValue: configuratorCoreConfig,
        },
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });

    configEffects = TestBed.inject(
      fromEffects.ConfiguratorVariantEffects as Type<fromEffects.ConfiguratorVariantEffects>
    );
  });

  it('should provide configuration variant effects', () => {
    expect(configEffects).toBeTruthy();
  });

  it('should emit a success action with content for an action of type searchVariants', () => {
    const action = new ConfiguratorActions.SearchVariants(productConfiguration);

    const completion = new ConfiguratorActions.SearchVariantsSuccess({
      ownerKey: productConfiguration.owner.key,
      variants: variants,
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.searchVariants$).toBeObservable(expected);
  });

  it('should not emit anything if variant search is disabled per configuration', () => {
    const action = new ConfiguratorActions.SearchVariants(productConfiguration);
    if (configuratorCoreConfig.productConfigurator) {
      configuratorCoreConfig.productConfigurator.enableVariantSearch = false;
    }

    actions$ = hot('-a', { a: action });
    const expected = cold('-');

    expect(configEffects.searchVariants$).toBeObservable(expected);
  });

  it('should not emit anything for wrong configurator type', () => {
    const action = new ConfiguratorActions.SearchVariants(productConfiguration);
    productConfiguration.owner.configuratorType = ConfiguratorType.CPQ;

    actions$ = hot('-a', { a: action });
    const expected = cold('-');

    expect(configEffects.searchVariants$).toBeObservable(expected);
  });

  it('should not emit anything if variant search configuration is incomplete', () => {
    const action = new ConfiguratorActions.SearchVariants(productConfiguration);

    configuratorCoreConfig.productConfigurator = undefined;

    actions$ = hot('-a', { a: action });
    const expected = cold('-');

    expect(configEffects.searchVariants$).toBeObservable(expected);
  });

  it('should not emit anything in case source action is not covered', () => {
    const actionNotCovered = new ConfiguratorActions.CreateConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: actionNotCovered });
    const expected = cold('-');

    expect(configEffects.searchVariants$).toBeObservable(expected);
  });

  it('should emit a fail action in case something goes wrong', () => {
    searchVariantsMock.and.returnValue(throwError(() => errorResponse));

    const action = new ConfiguratorActions.SearchVariants(productConfiguration);

    const completionFailure = new ConfiguratorActions.SearchVariantsFail({
      ownerKey: productConfiguration.owner.key,
      error: normalizeHttpError(errorResponse, new MockLoggerService()),
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completionFailure });

    expect(configEffects.searchVariants$).toBeObservable(expected);
  });
});
