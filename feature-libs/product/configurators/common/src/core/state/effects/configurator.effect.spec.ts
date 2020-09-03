import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import {
  CartActions,
  CartModification,
  Configurator,
  ConfiguratorCommonsConnector,
  GenericConfigurator,
  GenericConfigUtilsService,
  normalizeHttpError,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ConfiguratorActions } from '../actions/index';
import {
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
} from '../configuration-state';
import * as fromConfigurationReducers from '../reducers/index';
import { ConfiguratorUtilsService } from './../../facade/utils/configurator-utils.service';
import * as fromEffects from './configurator.effect';

const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';
const groupId = 'GROUP-1';
const cartId = 'CART-1234';
const cartEntryNumber = '1';
const userId = 'theUser';
const quantity = 1;
const entryNumber = 47;
const errorResponse: HttpErrorResponse = new HttpErrorResponse({
  error: 'notFound',
  status: 404,
});
let owner: GenericConfigurator.Owner = {};
let productConfiguration: Configurator.Configuration = {
  configId: 'a',
};

let payloadInputUpdateConfiguration: Configurator.UpdateConfigurationForCartEntryParameters;

const cartModification: CartModification = {
  quantity: 1,
  quantityAdded: 1,
  deliveryModeChanged: true,
  entry: {
    product: { code: productCode },
    quantity: 1,
    entryNumber: entryNumber,
  },
  statusCode: '',
  statusMessage: '',
};

describe('ConfiguratorEffect', () => {
  let createMock: jasmine.Spy;
  let readMock: jasmine.Spy;
  let addToCartMock: jasmine.Spy;
  let updateCartEntryMock: jasmine.Spy;
  let updateConfigurationMock: jasmine.Spy;
  let readPriceSummaryMock: jasmine.Spy;
  let readConfigurationForCartEntryMock: jasmine.Spy;
  let readConfigurationForOrderEntryMock: jasmine.Spy;
  let overviewMock: jasmine.Spy;
  let configEffects: fromEffects.ConfiguratorEffects;
  let configuratorUtils: GenericConfigUtilsService;
  let store: Store<StateWithConfiguration>;

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
    addToCartMock = jasmine.createSpy().and.returnValue(of(cartModification));
    updateCartEntryMock = jasmine
      .createSpy()
      .and.returnValue(of(cartModification));
    readConfigurationForCartEntryMock = jasmine
      .createSpy()
      .and.returnValue(of(productConfiguration));
    readConfigurationForOrderEntryMock = jasmine
      .createSpy()
      .and.returnValue(of(productConfiguration));

    class MockConnector {
      createConfiguration = createMock;
      readConfiguration = readMock;
      addToCart = addToCartMock;
      updateConfigurationForCartEntry = updateCartEntryMock;
      readConfigurationForCartEntry = readConfigurationForCartEntryMock;
      readConfigurationForOrderEntry = readConfigurationForOrderEntryMock;
      updateConfiguration = updateConfigurationMock;
      readPriceSummary = readPriceSummaryMock;
      getConfigurationOverview = overviewMock;
    }
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_FEATURE,
          fromConfigurationReducers.getConfiguratorReducers()
        ),
      ],

      providers: [
        fromEffects.ConfiguratorEffects,
        provideMockActions(() => actions$),
        {
          provide: ConfiguratorCommonsConnector,
          useClass: MockConnector,
        },
        {
          provide: ConfiguratorUtilsService,
          useClass: ConfiguratorUtilsService,
        },
      ],
    });

    configEffects = TestBed.inject(
      fromEffects.ConfiguratorEffects as Type<fromEffects.ConfiguratorEffects>
    );
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfiguration>>);

    owner = {
      type: GenericConfigurator.OwnerType.PRODUCT,
      id: productCode,
    };

    productConfiguration = {
      configId: 'a',
      productCode: productCode,
      owner: owner,
      complete: true,
      consistent: true,
      overview: {
        groups: [
          {
            id: 'a',
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
      groups: [
        { id: groupId, attributes: [{ name: 'attrName' }], subGroups: [] },
      ],
    };

    payloadInputUpdateConfiguration = {
      userId: userId,
      cartId: cartId,
      configuration: productConfiguration,
      cartEntryNumber: entryNumber.toString(),
    };
    configuratorUtils.setOwnerKey(owner);
  });

  it('should provide configuration effects', () => {
    expect(configEffects).toBeTruthy();
  });

  it('should emit a success action with content for an action of type createConfiguration', () => {
    const action = new ConfiguratorActions.CreateConfiguration(
      productConfiguration.owner
    );

    const completion = new ConfiguratorActions.CreateConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

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
        configId: configId,
        owner: owner,
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

      const readConfigurationFailAction = new ConfiguratorActions.ReadConfigurationFail(
        {
          ownerKey: productConfiguration.owner.key,
          error: normalizeHttpError(errorResponse),
        }
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: readConfigurationFailAction });

      expect(configEffects.readConfiguration$).toBeObservable(expected);
    });

    it('must not emit anything in case source action is not covered', () => {
      const payloadInput = { configId: configId, owner: owner };
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
        configId: configId,
        owner: owner,
      };
      const action = new ConfiguratorActions.GetConfigurationOverview(
        payloadInput
      );

      const overviewSuccessAction = new ConfiguratorActions.GetConfigurationOverviewSuccess(
        {
          ownerKey: owner.key,
          overview: productConfiguration.overview,
        }
      );
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

  describe('Effect addOwner', () => {
    it('should emit 2 result actions', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfiguration)
      );
      const addOwnerAction = new ConfiguratorActions.AddNextOwner({
        ownerKey: productConfiguration.owner.key,
        cartEntryNo: cartEntryNumber,
      });

      const setNextOwnerAction = new ConfiguratorActions.SetNextOwnerCartEntry({
        configuration: productConfiguration,
        cartEntryNo: cartEntryNumber,
      });
      const newCartEntryOwner: GenericConfigurator.Owner = {
        type: GenericConfigurator.OwnerType.CART_ENTRY,
        id: cartEntryNumber,
      };
      configuratorUtils.setOwnerKey(newCartEntryOwner);
      const setInteractionStateAction = new ConfiguratorActions.SetInteractionState(
        {
          entityKey: newCartEntryOwner.key,
          interactionState: productConfiguration.interactionState,
        }
      );
      actions$ = hot('-a', { a: addOwnerAction });
      const expected = cold('-(bc)', {
        b: setNextOwnerAction,
        c: setInteractionStateAction,
      });

      expect(configEffects.addOwner$).toBeObservable(expected);
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
      const actionNotCovered = new ConfiguratorActions.UpdateConfigurationSuccess(
        payloadInput
      );
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
      const updatePriceSummaryAction = new ConfiguratorActions.UpdatePriceSummary(
        payloadInput
      );

      const updatePriceSummarySuccessAction = new ConfiguratorActions.UpdatePriceSummarySuccess(
        productConfiguration
      );
      actions$ = hot('-a', { a: updatePriceSummaryAction });
      const expected = cold('-b', { b: updatePriceSummarySuccessAction });

      expect(configEffects.updatePriceSummary$).toBeObservable(expected);
    });

    it('should emit a fail action in case something goes wrong', () => {
      readPriceSummaryMock.and.returnValue(throwError(errorResponse));
      const payloadInput = productConfiguration;
      const updatePriceSummaryAction = new ConfiguratorActions.UpdatePriceSummary(
        payloadInput
      );

      const failAction = new ConfiguratorActions.UpdatePriceSummaryFail({
        ownerKey: productConfiguration.owner.key,
        error: normalizeHttpError(errorResponse),
      });
      actions$ = hot('-a', { a: updatePriceSummaryAction });
      const expected = cold('-b', { b: failAction });

      expect(configEffects.updatePriceSummary$).toBeObservable(expected);
    });
  });

  describe('Effect readConfigurationForCartEntry', () => {
    it('should emit a success action with content for an action of type readConfigurationForCartEntry', () => {
      const readFromCartEntry: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
        owner: owner,
      };
      const action = new ConfiguratorActions.ReadCartEntryConfiguration(
        readFromCartEntry
      );

      const readCartEntrySuccessAction = new ConfiguratorActions.ReadCartEntryConfigurationSuccess(
        productConfiguration
      );

      const updatePriceAction = new ConfiguratorActions.UpdatePriceSummary(
        productConfiguration
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: readCartEntrySuccessAction,
        c: updatePriceAction,
      });

      expect(configEffects.readConfigurationForCartEntry$).toBeObservable(
        expected
      );
    });

    it('should emit a fail action if something goes wrong', () => {
      readConfigurationForCartEntryMock.and.returnValue(
        throwError(errorResponse)
      );
      const readFromCartEntry: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
        owner: owner,
      };
      const action = new ConfiguratorActions.ReadCartEntryConfiguration(
        readFromCartEntry
      );

      const completion = new ConfiguratorActions.ReadCartEntryConfigurationFail(
        {
          ownerKey: productConfiguration.owner.key,
          error: normalizeHttpError(errorResponse),
        }
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(configEffects.readConfigurationForCartEntry$).toBeObservable(
        expected
      );
    });
  });

  describe('Effect readConfigurationForOrderEntry', () => {
    it('should emit a success action with content in case call is successful', () => {
      const readFromOrderEntry: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
        owner: owner,
      };
      const action = new ConfiguratorActions.ReadOrderEntryConfiguration(
        readFromOrderEntry
      );

      const readOrderEntrySuccessAction = new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
        productConfiguration
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: readOrderEntrySuccessAction,
      });

      expect(configEffects.readConfigurationForOrderEntry$).toBeObservable(
        expected
      );
    });

    it('should emit a fail action if something goes wrong', () => {
      readConfigurationForOrderEntryMock.and.returnValue(
        throwError(errorResponse)
      );
      const readFromOrderEntry: GenericConfigurator.ReadConfigurationFromOrderEntryParameters = {
        owner: owner,
      };
      const action = new ConfiguratorActions.ReadOrderEntryConfiguration(
        readFromOrderEntry
      );

      const completion = new ConfiguratorActions.ReadOrderEntryConfigurationFail(
        {
          ownerKey: productConfiguration.owner.key,
          error: normalizeHttpError(errorResponse),
        }
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(configEffects.readConfigurationForOrderEntry$).toBeObservable(
        expected
      );
    });
  });

  describe('Effect updateConfigurationSuccess', () => {
    it('should raise UpdateConfigurationFinalize, UpdatePrices and ChangeGroup in case no changes are pending', () => {
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfigurationSuccess(
        payloadInput
      );
      const finalizeSuccess = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        productConfiguration
      );
      const updatePrices = new ConfiguratorActions.UpdatePriceSummary(
        productConfiguration
      );
      const changeGroup = new ConfiguratorActions.ChangeGroup({
        configuration: productConfiguration,
        groupId: groupId,
        parentGroupId: undefined,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: finalizeSuccess,
        c: updatePrices,
        d: changeGroup,
      });
      expect(configEffects.updateConfigurationSuccess$).toBeObservable(
        expected
      );
    });

    it('should not raise ChangeGroup in case current group does not change', () => {
      store.dispatch(
        new ConfiguratorActions.SetCurrentGroup({
          entityKey: productConfiguration.owner.key,
          currentGroup: productConfiguration.groups[0].id,
        })
      );
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfigurationSuccess(
        payloadInput
      );
      const finalizeSuccess = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        productConfiguration
      );
      const updatePrices = new ConfiguratorActions.UpdatePriceSummary(
        productConfiguration
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: finalizeSuccess,
        c: updatePrices,
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
      const completion = new ConfiguratorActions.UpdateConfigurationFinalizeFail(
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
        groupId: undefined,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(configEffects.handleErrorOnUpdate$).toBeObservable(expected);
    });
  });
  describe('Effect groupChange', () => {
    it('should emit ReadConfigurationSuccess and SetCurrentGroup/SetParentGroup on ChangeGroup in case no changes are pending', () => {
      const payloadInput: Configurator.Configuration = {
        configId: configId,
        productCode: productCode,
        owner: owner,
      };
      const action = new ConfiguratorActions.ChangeGroup({
        configuration: payloadInput,
        groupId: groupId,
        parentGroupId: null,
      });
      const readConfigurationSuccess = new ConfiguratorActions.ReadConfigurationSuccess(
        productConfiguration
      );
      const setCurrentGroup = new ConfiguratorActions.SetCurrentGroup({
        entityKey: productConfiguration.owner.key,
        currentGroup: groupId,
      });
      const setMenuParentGroup = new ConfiguratorActions.SetMenuParentGroup({
        entityKey: productConfiguration.owner.key,
        menuParentGroup: null,
      });

      actions$ = hot('-a', { a: action });

      const expected = cold('-(bcd)', {
        b: setCurrentGroup,
        c: setMenuParentGroup,
        d: readConfigurationSuccess,
      });
      expect(configEffects.groupChange$).toBeObservable(expected);
    });

    it('should emit ReadConfigurationFail in case read call is not successful', () => {
      readMock.and.returnValue(throwError(errorResponse));
      const payloadInput: Configurator.Configuration = {
        configId: configId,
        productCode: productCode,
        owner: owner,
      };
      const action = new ConfiguratorActions.ChangeGroup({
        configuration: payloadInput,
        groupId: groupId,
        parentGroupId: null,
      });
      const readConfigurationFail = new ConfiguratorActions.ReadConfigurationFail(
        {
          ownerKey: productConfiguration.owner.key,
          error: normalizeHttpError(errorResponse),
        }
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: readConfigurationFail,
      });
      expect(configEffects.groupChange$).toBeObservable(expected);
    });
  });

  describe('Effect addToCart', () => {
    it('should emit AddToCartSuccess, AddOwner on addToCart in case no changes are pending', () => {
      const payloadInput: Configurator.AddToCartParameters = {
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        configId: configId,
        ownerKey: owner.key,
      };
      const action = new ConfiguratorActions.AddToCart(payloadInput);
      const cartAddEntrySuccess = new CartActions.CartAddEntrySuccess({
        ...cartModification,
        userId: userId,
        cartId: cartId,
        productCode: payloadInput.productCode,
        quantity: cartModification.quantity,
        deliveryModeChanged: cartModification.deliveryModeChanged,
        entry: cartModification.entry,
        quantityAdded: cartModification.quantityAdded,
        statusCode: cartModification.statusCode,
        statusMessage: cartModification.statusMessage,
      });

      const addNextOwner = new ConfiguratorActions.AddNextOwner({
        ownerKey: owner.key,
        cartEntryNo: '' + entryNumber,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-(cd)', {
        c: addNextOwner,
        d: cartAddEntrySuccess,
      });
      expect(configEffects.addToCart$).toBeObservable(expected);
    });

    it('should emit AddToCartFail in case add to cart call is not successful', () => {
      addToCartMock.and.returnValue(throwError(errorResponse));
      const payloadInput: Configurator.AddToCartParameters = {
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        configId: configId,
        ownerKey: owner.key,
      };
      const action = new ConfiguratorActions.AddToCart(payloadInput);
      const cartAddEntryFail = new CartActions.CartAddEntryFail({
        userId,
        cartId,
        productCode,
        quantity,
        error: normalizeHttpError(errorResponse),
      });

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: cartAddEntryFail,
      });
      expect(configEffects.addToCart$).toBeObservable(expected);
    });
  });

  describe('Effect updateCartEntry', () => {
    it('should emit updateCartEntrySuccess on updateCartEntry in case no changes are pending', () => {
      const action = new ConfiguratorActions.UpdateCartEntry(
        payloadInputUpdateConfiguration
      );
      const cartUpdateEntrySuccess = new CartActions.CartUpdateEntrySuccess({
        ...cartModification,
        userId: userId,
        cartId: cartId,
        entryNumber: cartModification.entry.entryNumber.toString(),
        quantity: cartModification.quantity,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-d)', {
        d: cartUpdateEntrySuccess,
      });
      expect(configEffects.updateCartEntry$).toBeObservable(expected);
    });

    it('should emit AddToCartFail in case update cart entry call is not successful', () => {
      updateCartEntryMock.and.returnValue(throwError(errorResponse));

      const action = new ConfiguratorActions.UpdateCartEntry(
        payloadInputUpdateConfiguration
      );
      const cartAddEntryFail = new CartActions.CartUpdateEntryFail({
        userId,
        cartId,
        entryNumber: entryNumber.toString(),
        quantity: 1,
        error: normalizeHttpError(errorResponse),
      });

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: cartAddEntryFail,
      });
      expect(configEffects.updateCartEntry$).toBeObservable(expected);
    });
  });

  describe('getGroupWithAttributes', () => {
    it('should find group in single level config', () => {
      expect(
        configEffects.getGroupWithAttributes(productConfiguration.groups)
      ).toBe(groupId);
    });

    it('should find group in multi level config', () => {
      const groups: Configurator.Group[] = [
        {
          attributes: [],
          subGroups: [
            {
              attributes: [],
              subGroups: [],
            },
            {
              attributes: [],
              subGroups: [],
            },
          ],
        },
        {
          attributes: [],
          subGroups: productConfiguration.groups,
        },
        {
          attributes: [],
          subGroups: [
            {
              attributes: [],
              subGroups: [],
            },
          ],
        },
      ];
      expect(configEffects.getGroupWithAttributes(groups)).toBe(groupId);
    });

    it('should find no group in multi level config in case no attributes exist at all', () => {
      const groups: Configurator.Group[] = [
        {
          attributes: [],
          subGroups: [
            {
              attributes: [],
              subGroups: [],
            },
            {
              attributes: [],
              subGroups: [],
            },
          ],
        },
        {
          attributes: [],
          subGroups: productConfiguration.groups,
        },
        {
          attributes: [],
          subGroups: [
            {
              attributes: [],
              subGroups: [],
            },
          ],
        },
      ];
      productConfiguration.groups[0].attributes = [];
      expect(configEffects.getGroupWithAttributes(groups)).toBeUndefined();
    });
  });
});
