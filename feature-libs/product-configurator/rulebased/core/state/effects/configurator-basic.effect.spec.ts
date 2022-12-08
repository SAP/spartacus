import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { normalizeHttpError } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { CONFIG_ID } from '../../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { RulebasedConfiguratorConnector } from '../../connectors/rulebased-configurator.connector';
import { ConfiguratorUtilsService } from '../../facade/utils/configurator-utils.service';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
import {
  CONFIGURATOR_FEATURE,
  StateWithConfigurator,
} from '../configurator-state';
import { getConfiguratorReducers } from './../reducers/index';
import * as fromEffects from './configurator-basic.effect';

const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';
const groupId = 'GROUP-1';
const parentGroupid = 'GROUP-PARENT';
const groupIdA = 'a';

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

const group: Configurator.Group = {
  id: groupId,
  attributes: [{ name: 'attrName' }],
  subGroups: [],
};

const groupWithSubGroup: Configurator.Group = {
  id: groupId,
  attributes: [
    {
      name: 'attrName',
      images: [{ url: 'imageAttr' }],
      values: [{ name: 'val', valueCode: '1', images: [{ url: 'imageVal' }] }],
    },
  ],
  subGroups: [group],
};
const productConfiguration: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration('a', owner),
  productCode: productCode,
  complete: true,
  consistent: true,
  overview: {
    configId: CONFIG_ID,
    productCode: productCode,
    groups: [
      {
        id: groupIdA,
        groupDescription: 'a',
        attributes: [
          {
            attribute: 'a',
            value: 'A',
          },
        ],
      },
    ],
  },
  groups: [group, groupWithSubGroup],
  flatGroups: [group],
  priceSummary: {},
  priceSupplements: [],
  pricingEnabled: true,
};

const productConfigurationWithoutPricing: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration('a', owner),
  pricingEnabled: false,
};
ConfiguratorTestUtils.freezeProductConfiguration(productConfiguration);

const parentGroup: Configurator.Group = {
  id: parentGroupid,
  subGroups: [group],
};
const productConfigurationAttributeOnNestedGroup: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration('a', owner),
  groups: [parentGroup],
  flatGroups: [parentGroup],
};
const searchVariantsAction = new ConfiguratorActions.SearchVariants(
  productConfiguration
);

describe('ConfiguratorEffect', () => {
  let createMock: jasmine.Spy;
  let readMock: jasmine.Spy;
  let updateConfigurationMock: jasmine.Spy;
  let readPriceSummaryMock: jasmine.Spy;
  let overviewMock: jasmine.Spy;
  let updateOverviewMock: jasmine.Spy;
  let configEffects: fromEffects.ConfiguratorBasicEffects;

  let store: Store<StateWithConfigurator>;

  let actions$: Observable<any>;

  beforeEach(() => {
    createMock = jasmine.createSpy().and.returnValue(of(productConfiguration));
    updateConfigurationMock = jasmine
      .createSpy()
      .and.returnValue(of(productConfiguration));
    readPriceSummaryMock = jasmine
      .createSpy()
      .and.returnValue(of(productConfiguration));
    readMock = jasmine.createSpy().and.returnValue(of(productConfiguration));
    overviewMock = jasmine
      .createSpy()
      .and.returnValue(of(productConfiguration.overview));
    updateOverviewMock = jasmine
      .createSpy()
      .and.returnValue(of(productConfiguration.overview));

    class MockConnector {
      createConfiguration = createMock;
      readConfiguration = readMock;
      updateConfiguration = updateConfigurationMock;
      readPriceSummary = readPriceSummaryMock;
      getConfigurationOverview = overviewMock;
      updateConfigurationOverview = updateOverviewMock;
    }

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers()),
      ],

      providers: [
        fromEffects.ConfiguratorBasicEffects,
        provideMockActions(() => actions$),
        {
          provide: RulebasedConfiguratorConnector,
          useClass: MockConnector,
        },
        {
          provide: ConfiguratorUtilsService,
          useClass: ConfiguratorUtilsService,
        },
      ],
    });

    configEffects = TestBed.inject(
      fromEffects.ConfiguratorBasicEffects as Type<fromEffects.ConfiguratorBasicEffects>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);
  });

  it('should provide configuration effects', () => {
    expect(configEffects).toBeTruthy();
  });

  it('should emit a success action with content for an action of type createConfiguration', () => {
    const action = new ConfiguratorActions.CreateConfiguration(
      productConfiguration.owner
    );

    const configurationSuccessAction =
      new ConfiguratorActions.CreateConfigurationSuccess(productConfiguration);

    actions$ = hot('-a', { a: action });
    const expected = cold('-(bc)', {
      b: configurationSuccessAction,
      c: searchVariantsAction,
    });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('must not emit anything in case source action is not covered, createConfiguration', () => {
    const actionNotCovered = new ConfiguratorActions.CreateConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: actionNotCovered });
    const expected = cold('-');

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('should emit a fail action in case something goes wrong', () => {
    createMock.and.returnValue(throwError(errorResponse));

    const action = new ConfiguratorActions.CreateConfiguration(
      productConfiguration.owner
    );

    const completionFailure = new ConfiguratorActions.CreateConfigurationFail({
      ownerKey: productConfiguration.owner.key,
      error: normalizeHttpError(errorResponse),
    });
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completionFailure });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  describe('Effect readConfiguration', () => {
    it('should emit a success action with content in case connector call goes fine', () => {
      const payloadInput: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(configId, owner),
      };
      const action = new ConfiguratorActions.ReadConfiguration({
        configuration: payloadInput,
        groupId: '',
      });

      const completion = new ConfiguratorActions.ReadConfigurationSuccess(
        productConfiguration
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(configEffects.readConfiguration$).toBeObservable(expected);
    });

    it('should emit a fail action in case connector raises an error', () => {
      readMock.and.returnValue(throwError(errorResponse));
      const action = new ConfiguratorActions.ReadConfiguration({
        configuration: productConfiguration,
        groupId: '',
      });

      const readConfigurationFailAction =
        new ConfiguratorActions.ReadConfigurationFail({
          ownerKey: productConfiguration.owner.key,
          error: normalizeHttpError(errorResponse),
        });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: readConfigurationFailAction });

      expect(configEffects.readConfiguration$).toBeObservable(expected);
    });

    it('must not emit anything in case source action is not covered', () => {
      const payloadInput = {
        ...ConfiguratorTestUtils.createConfiguration(configId, owner),
      };
      const action = new ConfiguratorActions.ReadConfigurationSuccess(
        payloadInput
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-');
      expect(configEffects.readConfiguration$).toBeObservable(expected);
    });
  });

  describe('Effect getOverview', () => {
    it('should emit a success action with content in case connector call goes well', () => {
      const payloadInput: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(configId, owner),
      };
      const action = new ConfiguratorActions.GetConfigurationOverview(
        payloadInput
      );

      const overviewSuccessAction =
        new ConfiguratorActions.GetConfigurationOverviewSuccess({
          ownerKey: owner.key,
          overview: productConfiguration.overview ?? {
            configId: CONFIG_ID,
            productCode: productCode,
          },
        });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: overviewSuccessAction });

      expect(configEffects.getOverview$).toBeObservable(expected);
    });

    it('should emit a fail action in case something goes wrong', () => {
      overviewMock.and.returnValue(throwError(errorResponse));
      const overviewAction = new ConfiguratorActions.GetConfigurationOverview(
        productConfiguration
      );

      const failAction = new ConfiguratorActions.GetConfigurationOverviewFail({
        ownerKey: productConfiguration.owner.key,
        error: normalizeHttpError(errorResponse),
      });
      actions$ = hot('-a', { a: overviewAction });
      const expected = cold('-b', { b: failAction });

      expect(configEffects.getOverview$).toBeObservable(expected);
    });
  });

  describe('Effect updateOverview', () => {
    it('should emit a success action with content in case connector call goes well', () => {
      const payloadInput: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(configId, owner),
      };
      const action = new ConfiguratorActions.UpdateConfigurationOverview(
        payloadInput
      );

      const overviewSuccessAction =
        new ConfiguratorActions.UpdateConfigurationOverviewSuccess({
          ownerKey: owner.key,
          overview: productConfiguration.overview ?? {
            configId: CONFIG_ID,
            productCode: productCode,
          },
        });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: overviewSuccessAction });

      expect(configEffects.updateOverview$).toBeObservable(expected);
    });

    it('should emit a fail action in case something goes wrong', () => {
      updateOverviewMock.and.returnValue(throwError(errorResponse));
      const overviewAction =
        new ConfiguratorActions.UpdateConfigurationOverview(
          productConfiguration
        );

      const failAction =
        new ConfiguratorActions.UpdateConfigurationOverviewFail({
          ownerKey: productConfiguration.owner.key,
          error: normalizeHttpError(errorResponse),
        });
      actions$ = hot('-a', { a: overviewAction });
      const expected = cold('-b', { b: failAction });

      expect(configEffects.updateOverview$).toBeObservable(expected);
    });
  });

  describe('Effect updateConfiguration', () => {
    it('should emit a success action with content for an action of type updateConfiguration', () => {
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfiguration(payloadInput);

      const completion = new ConfiguratorActions.UpdateConfigurationSuccess(
        productConfiguration
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(configEffects.updateConfiguration$).toBeObservable(expected);
    });

    it('must not emit anything in case source action is not covered', () => {
      const payloadInput = productConfiguration;
      const actionNotCovered =
        new ConfiguratorActions.UpdateConfigurationSuccess(payloadInput);
      actions$ = hot('-a', { a: actionNotCovered });
      const expected = cold('-');
      expect(configEffects.updateConfiguration$).toBeObservable(expected);
    });

    it('should emit a fail action in case something goes wrong', () => {
      updateConfigurationMock.and.returnValue(throwError(errorResponse));
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfiguration(payloadInput);

      const failAction = new ConfiguratorActions.UpdateConfigurationFail({
        configuration: productConfiguration,
        error: normalizeHttpError(errorResponse),
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: failAction });

      expect(configEffects.updateConfiguration$).toBeObservable(expected);
    });
  });

  describe('Effect updatePriceSummary', () => {
    it('should emit a price summary success action in case call is successfull', () => {
      const payloadInput = productConfiguration;
      const updatePriceSummaryAction =
        new ConfiguratorActions.UpdatePriceSummary(payloadInput);

      const updatePriceSummarySuccessAction =
        new ConfiguratorActions.UpdatePriceSummarySuccess(productConfiguration);
      actions$ = hot('-a', { a: updatePriceSummaryAction });
      const expected = cold('-b', { b: updatePriceSummarySuccessAction });

      expect(configEffects.updatePriceSummary$).toBeObservable(expected);
    });

    it('should emit a fail action in case something goes wrong', () => {
      readPriceSummaryMock.and.returnValue(throwError(errorResponse));
      const payloadInput = productConfiguration;
      const updatePriceSummaryAction =
        new ConfiguratorActions.UpdatePriceSummary(payloadInput);

      const failAction = new ConfiguratorActions.UpdatePriceSummaryFail({
        ownerKey: productConfiguration.owner.key,
        error: normalizeHttpError(errorResponse),
      });
      actions$ = hot('-a', { a: updatePriceSummaryAction });
      const expected = cold('-b', { b: failAction });

      expect(configEffects.updatePriceSummary$).toBeObservable(expected);
    });

    it('should do nothing in case pricing is not enabled', () => {
      const updatePriceSummaryAction =
        new ConfiguratorActions.UpdatePriceSummary(
          productConfigurationWithoutPricing
        );

      actions$ = hot('-a', { a: updatePriceSummaryAction });
      const expected = cold('--');

      expect(configEffects.updatePriceSummary$).toBeObservable(expected);
    });
  });

  describe('Effect updateConfigurationSuccess', () => {
    it('should raise UpdateConfigurationFinalize, UpdatePrices and ChangeGroup in case no changes are pending', () => {
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfigurationSuccess(
        payloadInput
      );
      const finalizeSuccess =
        new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
          productConfiguration
        );
      const updatePrices = new ConfiguratorActions.UpdatePriceSummary({
        ...productConfiguration,
        interactionState: { currentGroup: groupId },
      });

      const changeGroup = new ConfiguratorActions.ChangeGroup({
        configuration: productConfiguration,
        groupId: groupId,
        parentGroupId: undefined,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcde)', {
        b: finalizeSuccess,
        c: updatePrices,
        d: searchVariantsAction,
        e: changeGroup,
      });
      expect(configEffects.updateConfigurationSuccess$).toBeObservable(
        expected
      );
    });

    it('should cover deeply nested updates properly', () => {
      const payloadInput = productConfigurationAttributeOnNestedGroup;
      const action = new ConfiguratorActions.UpdateConfigurationSuccess(
        payloadInput
      );
      const finalizeSuccess =
        new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
          productConfigurationAttributeOnNestedGroup
        );
      const updatePrices = new ConfiguratorActions.UpdatePriceSummary({
        ...productConfigurationAttributeOnNestedGroup,
        interactionState: { currentGroup: groupId },
      });
      const searchVariantsActionAttributeOnNestedGroup =
        new ConfiguratorActions.SearchVariants(
          productConfigurationAttributeOnNestedGroup
        );
      const changeGroup = new ConfiguratorActions.ChangeGroup({
        configuration: productConfigurationAttributeOnNestedGroup,
        groupId: groupId,
        parentGroupId: parentGroupid,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcde)', {
        b: finalizeSuccess,
        c: updatePrices,
        d: searchVariantsActionAttributeOnNestedGroup,
        e: changeGroup,
      });
      expect(configEffects.updateConfigurationSuccess$).toBeObservable(
        expected
      );
    });

    it('should not raise ChangeGroup in case current group does not change', () => {
      store.dispatch(
        new ConfiguratorActions.SetCurrentGroup({
          entityKey: productConfiguration.owner.key,
          currentGroup: groupId,
        })
      );
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfigurationSuccess(
        payloadInput
      );
      const finalizeSuccess =
        new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
          productConfiguration
        );
      const updatePrices = new ConfiguratorActions.UpdatePriceSummary({
        ...productConfiguration,
        interactionState: { currentGroup: groupId },
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: finalizeSuccess,
        c: updatePrices,
        d: searchVariantsAction,
      });
      expect(configEffects.updateConfigurationSuccess$).toBeObservable(
        expected
      );
    });
  });

  describe('Effect updateConfigurationFail', () => {
    it('should raise UpdateConfigurationFinalizeFail on UpdateConfigurationFail in case no changes are pending', () => {
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfigurationFail({
        configuration: payloadInput,
        error: undefined,
      });
      const completion =
        new ConfiguratorActions.UpdateConfigurationFinalizeFail(
          productConfiguration
        );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(configEffects.updateConfigurationFail$).toBeObservable(expected);
    });
    it('must not emit anything in case of UpdateConfigurationSuccess', () => {
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfigurationSuccess(
        payloadInput
      );
      actions$ = hot('-a', { a: action });

      configEffects.updateConfigurationFail$.subscribe((emitted) =>
        fail(emitted)
      );
      // just to get rid of the SPEC_HAS_NO_EXPECTATIONS message.
      // The actual test is done in the subscribe part
      expect(true).toBeTruthy();
    });
  });
  describe('Effect handleErrorOnUpdate', () => {
    it('should emit ReadConfiguration on UpdateConfigurationFinalizeFail', () => {
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeFail(
        payloadInput
      );
      const completion = new ConfiguratorActions.ReadConfiguration({
        configuration: productConfiguration,
        groupId: groupId,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(configEffects.handleErrorOnUpdate$).toBeObservable(expected);
    });
  });
  describe('Effect groupChange', () => {
    it('should emit UpdatePriceSummary, ReadConfigurationSuccess and SetCurrentGroup/SetParentGroup on ChangeGroup in case no changes are pending', () => {
      const payloadInput: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(configId, owner),
        productCode: productCode,
      };
      const action = new ConfiguratorActions.ChangeGroup({
        configuration: payloadInput,
        groupId: groupId,
        parentGroupId: undefined,
      });
      const readConfigurationSuccess =
        new ConfiguratorActions.ReadConfigurationSuccess(productConfiguration);
      const setCurrentGroup = new ConfiguratorActions.SetCurrentGroup({
        entityKey: productConfiguration.owner.key,
        currentGroup: groupId,
      });
      const setMenuParentGroup = new ConfiguratorActions.SetMenuParentGroup({
        entityKey: productConfiguration.owner.key,
        menuParentGroup: undefined,
      });
      const updatePriceSummary = new ConfiguratorActions.UpdatePriceSummary({
        ...productConfiguration,
        interactionState: { currentGroup: groupId },
      });

      actions$ = hot('-a', { a: action });

      const expected = cold('-(bcde)', {
        b: setCurrentGroup,
        c: setMenuParentGroup,
        d: readConfigurationSuccess,
        e: updatePriceSummary,
      });
      expect(configEffects.groupChange$).toBeObservable(expected);
    });

    it('should emit ReadConfigurationFail in case read call is not successful', () => {
      readMock.and.returnValue(throwError(errorResponse));
      const payloadInput: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(configId, owner),
        productCode: productCode,
      };
      const action = new ConfiguratorActions.ChangeGroup({
        configuration: payloadInput,
        groupId: groupId,
        parentGroupId: undefined,
      });
      const readConfigurationFail =
        new ConfiguratorActions.ReadConfigurationFail({
          ownerKey: productConfiguration.owner.key,
          error: normalizeHttpError(errorResponse),
        });

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: readConfigurationFail,
      });
      expect(configEffects.groupChange$).toBeObservable(expected);
    });
  });

  describe('Effect removeProductBoundConfigurations', () => {
    let entitiesInConfigurationState: {
      [id: string]: any;
    } = {};
    let configurationState: any;

    beforeEach(() => {
      entitiesInConfigurationState = {};
      configurationState = {
        configurations: { entities: entitiesInConfigurationState },
      };
    });

    it('should emit remove configuration action for configurations that are purely product bound', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () => of(configurationState)
      );

      entitiesInConfigurationState[productConfiguration.owner.key] =
        productConfiguration.owner.key;

      const removeProductBoundConfigurationsAction =
        new ConfiguratorActions.RemoveProductBoundConfigurations();

      const removeConfigurationAction =
        new ConfiguratorActions.RemoveConfiguration({
          ownerKey: [productConfiguration.owner.key],
        });

      actions$ = cold('-a', { a: removeProductBoundConfigurationsAction });
      const expected = cold('-(b)', {
        b: removeConfigurationAction,
      });

      expect(configEffects.removeProductBoundConfigurations$).toBeObservable(
        expected
      );
    });
  });
});
