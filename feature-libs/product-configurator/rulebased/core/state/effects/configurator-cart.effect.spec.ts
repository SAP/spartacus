import {
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/base/core';
import { CartModification } from '@spartacus/cart/base/root';
import { LoggerService, tryNormalizeHttpError } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { CONFIG_ID, GROUP_ID_1 } from '../../../testing/configurator-test-data';
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
import * as fromEffects from './configurator-cart.effect';
import { vi } from 'vitest';

const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';
const groupId = 'GROUP-1';
const cartId = 'CART-1234';
const userId = 'theUser';
const quantity = 1;
const entryNumber = 0;
const emptyStatus = '';
const ATTRIBUTE_NAME = 'attr_name';
const GROUP_ID_CONFLICT = Configurator.ConflictIdPrefix + '62541';
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
const ownerCartEntry: CommonConfigurator.Owner = {
  type: CommonConfigurator.OwnerType.CART_ENTRY,
  id: entryNumber.toString(),
  key: 'cartEntry/1',
  configuratorType: ConfiguratorType.VARIANT,
};

const ownerOrderEntry: CommonConfigurator.Owner = {
  type: CommonConfigurator.OwnerType.ORDER_ENTRY,
  id: entryNumber.toString(),
  key: 'orderEntryKey',
  configuratorType: ConfiguratorType.VARIANT,
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
    { id: groupId, attributes: [{ name: ATTRIBUTE_NAME }], subGroups: [] },
  ],
};

const productConfigurationWithConflict: Configurator.Configuration = {
  ...productConfiguration,
  groups: [
    {
      id: 'CONFLICT_HEADER',
      groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
      subGroups: [
        {
          id: GROUP_ID_CONFLICT,
          groupType: Configurator.GroupType.CONFLICT_GROUP,
          subGroups: [],
          attributes: [{ name: ATTRIBUTE_NAME }],
        },
      ],
    },
    {
      id: GROUP_ID_1,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      subGroups: [],
      attributes: [{ name: ATTRIBUTE_NAME }],
    },
  ],
};
ConfiguratorTestUtils.freezeProductConfiguration(productConfiguration);

let payloadInputUpdateConfiguration: Configurator.UpdateConfigurationForCartEntryParameters;

const entry = {
  product: { code: productCode },
  quantity: 1,
  entryNumber: entryNumber,
};

const cartModification: CartModification = {
  quantity: 1,
  quantityAdded: 1,
  deliveryModeChanged: true,
  entry: entry,
  statusCode: emptyStatus,
  statusMessage: emptyStatus,
};

const cartModificationWithoutEntry: CartModification = {};

let readFromCartEntryObs: Observable<Configurator.Configuration>;

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('ConfiguratorCartEffect', () => {
  let addToCartMock: vi.Mock;
  let updateCartEntryMock: vi.Mock;

  let readConfigurationForOrderEntryMock: vi.Mock;
  let configCartEffects: fromEffects.ConfiguratorCartEffects;
  let store: Store<StateWithConfigurator>;

  let actions$: Observable<any>;

  beforeEach(() => {
    addToCartMock = vi.fn().mockReturnValue(of(cartModification));
    updateCartEntryMock = vi.fn().mockReturnValue(of(cartModification));
    readConfigurationForOrderEntryMock = vi
      .fn()
      .mockReturnValue(of(productConfiguration));

    class MockConnector {
      addToCart = addToCartMock;
      updateConfigurationForCartEntry = updateCartEntryMock;
      readConfigurationForCartEntry = () => readFromCartEntryObs;
      readConfigurationForOrderEntry = readConfigurationForOrderEntryMock;
    }
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers()),
      ],
      providers: [
        fromEffects.ConfiguratorCartEffects,
        provideMockActions(() => actions$),
        {
          provide: RulebasedConfiguratorConnector,
          useClass: MockConnector,
        },
        {
          provide: ConfiguratorUtilsService,
          useClass: ConfiguratorUtilsService,
        },
        { provide: LoggerService, useClass: MockLoggerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    configCartEffects = TestBed.inject(
      fromEffects.ConfiguratorCartEffects as Type<fromEffects.ConfiguratorCartEffects>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);

    payloadInputUpdateConfiguration = {
      userId: userId,
      cartId: cartId,
      configuration: productConfiguration,
      cartEntryNumber: entryNumber.toString(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should provide configuration effects', () => {
    expect(configCartEffects).toBeTruthy();
  });

  describe('Effect addOwner', () => {
    it('should emit 2 result actions', () => {
      store.dispatch(
        new ConfiguratorActions.CreateConfigurationSuccess(productConfiguration)
      );
      store.dispatch(
        new ConfiguratorActions.SetInteractionState({
          entityKey: productConfiguration.owner.key,
          interactionState: productConfiguration.interactionState,
        })
      );
      const addOwnerAction = new ConfiguratorActions.AddNextOwner({
        ownerKey: productConfiguration.owner.key,
        cartEntryNo: entryNumber.toString(),
      });

      const setNextOwnerAction = new ConfiguratorActions.SetNextOwnerCartEntry({
        configuration: productConfiguration,
        cartEntryNo: entryNumber.toString(),
      });
      const newCartEntryOwner = ConfiguratorModelUtils.createOwner(
        CommonConfigurator.OwnerType.CART_ENTRY,
        entryNumber.toString()
      );

      const setInteractionStateAction =
        new ConfiguratorActions.SetInteractionState({
          entityKey: newCartEntryOwner.key,
          interactionState: productConfiguration.interactionState,
        });
      actions$ = cold('-a', { a: addOwnerAction });
      const expected = cold('-(bc)', {
        b: setNextOwnerAction,
        c: setInteractionStateAction,
      });

      expect(configCartEffects.addOwner$).toBeObservable(expected);
    });
  });

  describe('Effect removeCartBoundConfigurations', () => {
    it('should emit remove configuration action for configurations that belong to cart entries', () => {
      const configurationCartBound: Configurator.Configuration =
        ConfiguratorTestUtils.createConfiguration('6514', ownerCartEntry);

      store.dispatch(
        new ConfiguratorActions.CreateConfigurationSuccess(productConfiguration)
      );
      store.dispatch(
        new ConfiguratorActions.CreateConfigurationSuccess(
          configurationCartBound
        )
      );

      const removeCartBoundConfigurationsAction =
        new ConfiguratorActions.RemoveCartBoundConfigurations();
      const removeConfigurationAction =
        new ConfiguratorActions.RemoveConfiguration({
          ownerKey: [configurationCartBound.owner.key],
        });

      actions$ = cold('-a', { a: removeCartBoundConfigurationsAction });
      const expected = cold('-(b)', {
        b: removeConfigurationAction,
      });

      expect(configCartEffects.removeCartBoundConfigurations$).toBeObservable(
        expected
      );
    });

    it('should emit remove configuration action for configurations that have been turned into cart configurations', () => {
      const configurationProductBoundObsolete: Configurator.Configuration =
        ConfiguratorTestUtils.createConfiguration('6514', owner);

      configurationProductBoundObsolete.nextOwner = ownerCartEntry;

      store.dispatch(
        new ConfiguratorActions.CreateConfigurationSuccess(
          configurationProductBoundObsolete
        )
      );

      const removeCartBoundConfigurationsAction =
        new ConfiguratorActions.RemoveCartBoundConfigurations();
      const removeConfigurationAction =
        new ConfiguratorActions.RemoveConfiguration({
          ownerKey: [configurationProductBoundObsolete.owner.key],
        });

      actions$ = cold('-a', { a: removeCartBoundConfigurationsAction });
      const expected = cold('-(b)', {
        b: removeConfigurationAction,
      });

      expect(configCartEffects.removeCartBoundConfigurations$).toBeObservable(
        expected
      );
    });

    it('should not emit remove configuration action for configurations that are purely product bound or order bound', () => {
      const configurationProductBound: Configurator.Configuration =
        ConfiguratorTestUtils.createConfiguration('6514', owner);

      const configurationOrderBound: Configurator.Configuration =
        ConfiguratorTestUtils.createConfiguration('6513', ownerOrderEntry);

      store.dispatch(
        new ConfiguratorActions.CreateConfigurationSuccess(
          configurationProductBound
        )
      );
      store.dispatch(
        new ConfiguratorActions.CreateConfigurationSuccess(
          configurationOrderBound
        )
      );

      const removeCartBoundConfigurationsAction =
        new ConfiguratorActions.RemoveCartBoundConfigurations();
      const removeConfigurationAction =
        new ConfiguratorActions.RemoveConfiguration({
          ownerKey: [],
        });

      actions$ = cold('-a', { a: removeCartBoundConfigurationsAction });
      const expected = cold('-(b)', {
        b: removeConfigurationAction,
      });

      expect(configCartEffects.removeCartBoundConfigurations$).toBeObservable(
        expected
      );
    });
  });

  describe('Effect readConfigurationForCartEntry', () => {
    const readFromCartEntry: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
      {
        owner: owner,
      };
    const action = new ConfiguratorActions.ReadCartEntryConfiguration(
      readFromCartEntry
    );

    const readCartEntrySuccessAction =
      new ConfiguratorActions.ReadCartEntryConfigurationSuccess(
        productConfiguration
      );

    const searchVariantsAction = new ConfiguratorActions.SearchVariants(
      productConfiguration
    );

    it('should emit a success action and also trigger the price update and variant search', () => {
      readFromCartEntryObs = of(productConfiguration);
      const updatePriceAction = new ConfiguratorActions.UpdatePriceSummary({
        ...productConfiguration,
        interactionState: { currentGroup: groupId },
      });

      actions$ = cold('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: readCartEntrySuccessAction,
        c: updatePriceAction,
        d: searchVariantsAction,
      });

      expect(configCartEffects.readConfigurationForCartEntry$).toBeObservable(
        expected
      );
    });

    it('should trigger the price action for the first group with attributes even if it is a conflict group', () => {
      readFromCartEntryObs = of(productConfigurationWithConflict);

      const updatePriceActionForConflict =
        new ConfiguratorActions.UpdatePriceSummary({
          ...productConfigurationWithConflict,
          interactionState: { currentGroup: GROUP_ID_CONFLICT },
        });

      const readCartEntrySuccessActionForConflict =
        new ConfiguratorActions.ReadCartEntryConfigurationSuccess(
          productConfigurationWithConflict
        );

      const searchVariantsActionForConflict =
        new ConfiguratorActions.SearchVariants(
          productConfigurationWithConflict
        );

      actions$ = cold('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: readCartEntrySuccessActionForConflict,
        c: updatePriceActionForConflict,
        d: searchVariantsActionForConflict,
      });

      expect(configCartEffects.readConfigurationForCartEntry$).toBeObservable(
        expected
      );
    });

    it('should trigger the price action for the first non-conflict attribute group if immediateConflictResolution is active', () => {
      const productConfigImmediateConflictResolution: Configurator.Configuration =
        {
          ...productConfigurationWithConflict,
          immediateConflictResolution: true,
        };
      readFromCartEntryObs = of(productConfigImmediateConflictResolution);

      const updatePriceActionForConflict =
        new ConfiguratorActions.UpdatePriceSummary({
          ...productConfigImmediateConflictResolution,
          interactionState: { currentGroup: GROUP_ID_1 },
        });

      const readCartEntrySuccessActionForConflict =
        new ConfiguratorActions.ReadCartEntryConfigurationSuccess(
          productConfigImmediateConflictResolution
        );

      const searchVariantsActionForConflict =
        new ConfiguratorActions.SearchVariants(
          productConfigImmediateConflictResolution
        );

      actions$ = cold('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: readCartEntrySuccessActionForConflict,
        c: updatePriceActionForConflict,
        d: searchVariantsActionForConflict,
      });

      expect(configCartEffects.readConfigurationForCartEntry$).toBeObservable(
        expected
      );
    });

    it('should emit a fail action if something goes wrong', () => {
      readFromCartEntryObs = throwError(() => errorResponse);

      const completion = new ConfiguratorActions.ReadCartEntryConfigurationFail(
        {
          ownerKey: productConfiguration.owner.key,
          error: tryNormalizeHttpError(errorResponse, new MockLoggerService()),
        }
      );
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(configCartEffects.readConfigurationForCartEntry$).toBeObservable(
        expected
      );
    });
  });

  describe('Effect readConfigurationForOrderEntry', () => {
    it('should emit a success action with content in case call is successful', () => {
      const readFromOrderEntry: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
        {
          owner: owner,
        };
      const action = new ConfiguratorActions.ReadOrderEntryConfiguration(
        readFromOrderEntry
      );

      const readOrderEntrySuccessAction =
        new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
          productConfiguration
        );

      actions$ = cold('-a', { a: action });
      const expected = cold('-b', {
        b: readOrderEntrySuccessAction,
      });

      expect(configCartEffects.readConfigurationForOrderEntry$).toBeObservable(
        expected
      );
    });

    it('should emit a fail action if something goes wrong', () => {
      readConfigurationForOrderEntryMock.mockReturnValue(
        throwError(() => errorResponse)
      );
      const readFromOrderEntry: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
        {
          owner: owner,
        };
      const action = new ConfiguratorActions.ReadOrderEntryConfiguration(
        readFromOrderEntry
      );

      const completion =
        new ConfiguratorActions.ReadOrderEntryConfigurationFail({
          ownerKey: productConfiguration.owner.key,
          error: tryNormalizeHttpError(errorResponse, new MockLoggerService()),
        });
      actions$ = cold('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(configCartEffects.readConfigurationForOrderEntry$).toBeObservable(
        expected
      );
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
        owner: owner,
      };
      const action = new ConfiguratorActions.AddToCart(payloadInput);
      const cartAddEntrySuccess = new CartActions.CartAddEntrySuccess({
        ...cartModification,
        userId: userId,
        cartId: cartId,
        productCode: payloadInput.productCode,
        quantity: 1,
        deliveryModeChanged: true,
        entry: entry,
        quantityAdded: 1,
        statusCode: emptyStatus,
        statusMessage: emptyStatus,
      });

      const addNextOwner = new ConfiguratorActions.AddNextOwner({
        ownerKey: owner.key,
        cartEntryNo: '' + entryNumber,
      });
      actions$ = cold('-a', { a: action });
      const expected = cold('-(cd)', {
        c: addNextOwner,
        d: cartAddEntrySuccess,
      });
      expect(configCartEffects.addToCart$).toBeObservable(expected);
    });

    it('should emit CartAddEntryFail in case add to cart call does not return entry', () => {
      addToCartMock.mockReturnValue(of(cartModificationWithoutEntry));
      const payloadInput: Configurator.AddToCartParameters = {
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        configId: configId,
        owner: owner,
      };
      const action = new ConfiguratorActions.AddToCart(payloadInput);

      actions$ = cold('-a', { a: action });
      const cartAddEntryFail = new CartActions.CartAddEntryFail({
        userId,
        cartId,
        productCode,
        quantity,
        error: Error(fromEffects.ERROR_MESSAGE_NO_ENTRY_NUMBER_FOUND),
      });

      actions$ = cold('-a', { a: action });
      const expected = cold('-b', {
        b: cartAddEntryFail,
      });
      expect(configCartEffects.addToCart$).toBeObservable(expected);
    });

    it('should emit CartAddEntryFail in case add to cart call is not successful', () => {
      addToCartMock.mockReturnValue(throwError(() => errorResponse));
      const payloadInput: Configurator.AddToCartParameters = {
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        configId: configId,
        owner: owner,
      };
      const action = new ConfiguratorActions.AddToCart(payloadInput);
      const cartAddEntryFail = new CartActions.CartAddEntryFail({
        userId,
        cartId,
        productCode,
        quantity,
        error: tryNormalizeHttpError(errorResponse, new MockLoggerService()),
      });

      actions$ = cold('-a', { a: action });

      const expected = cold('-b', {
        b: cartAddEntryFail,
      });
      expect(configCartEffects.addToCart$).toBeObservable(expected);
    });
  });

  describe('Effect updateCartEntry', () => {
    it('should emit updateCartEntrySuccess on updateCartEntry in case no changes are pending', () => {
      const action = new ConfiguratorActions.UpdateCartEntry(
        payloadInputUpdateConfiguration
      );
      const cartUpdateEntrySuccess = new CartActions.CartUpdateEntrySuccess({
        userId: userId,
        cartId: cartId,
        entryNumber: entryNumber.toString(),
        quantity: 1,
      });

      actions$ = cold('-a', { a: action });
      const expected = cold('-d)', {
        d: cartUpdateEntrySuccess,
      });
      expect(configCartEffects.updateCartEntry$).toBeObservable(expected);
    });

    it('should emit AddToCartFail in case update cart entry call is not successful', () => {
      updateCartEntryMock.mockReturnValue(throwError(() => errorResponse));

      const action = new ConfiguratorActions.UpdateCartEntry(
        payloadInputUpdateConfiguration
      );
      const cartAddEntryFail = new CartActions.CartUpdateEntryFail({
        userId,
        cartId,
        entryNumber: entryNumber.toString(),
        error: tryNormalizeHttpError(errorResponse, new MockLoggerService()),
      });

      actions$ = cold('-a', { a: action });

      const expected = cold('-b', {
        b: cartAddEntryFail,
      });
      expect(configCartEffects.updateCartEntry$).toBeObservable(expected);
    });
  });
});
