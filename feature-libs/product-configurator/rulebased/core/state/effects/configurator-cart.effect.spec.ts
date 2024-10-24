import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as ngrxStore from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
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
import { CONFIGURATOR_FEATURE } from '../configurator-state';
import { getConfiguratorReducers } from './../reducers/index';
import * as fromEffects from './configurator-cart.effect';

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
let entitiesInConfigurationState: {
  [id: string]: any;
} = {};
let configurationState: any;

let readFromCartEntryObs: Observable<Configurator.Configuration>;

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('ConfiguratorCartEffect', () => {
  let addToCartMock: jasmine.Spy;
  let updateCartEntryMock: jasmine.Spy;

  let readConfigurationForOrderEntryMock: jasmine.Spy;
  let configCartEffects: fromEffects.ConfiguratorCartEffects;

  let actions$: Observable<any>;

  beforeEach(() => {
    addToCartMock = jasmine.createSpy().and.returnValue(of(cartModification));
    updateCartEntryMock = jasmine
      .createSpy()
      .and.returnValue(of(cartModification));

    readConfigurationForOrderEntryMock = jasmine
      .createSpy()
      .and.returnValue(of(productConfiguration));

    class MockConnector {
      addToCart = addToCartMock;
      updateConfigurationForCartEntry = updateCartEntryMock;
      readConfigurationForCartEntry = () => readFromCartEntryObs;
      readConfigurationForOrderEntry = readConfigurationForOrderEntryMock;
    }
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers),
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
      ],
    });

    configCartEffects = TestBed.inject(
      fromEffects.ConfiguratorCartEffects as Type<fromEffects.ConfiguratorCartEffects>
    );

    payloadInputUpdateConfiguration = {
      userId: userId,
      cartId: cartId,
      configuration: productConfiguration,
      cartEntryNumber: entryNumber.toString(),
    };

    entitiesInConfigurationState = {};
    configurationState = {
      configurations: { entities: entitiesInConfigurationState },
    };
  });

  it('should provide configuration effects', () => {
    expect(configCartEffects).toBeTruthy();
  });

  describe('Effect addOwner', () => {
    it('should emit 2 result actions', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () => of(productConfiguration)
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
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () => of(configurationState)
      );

      const configurationCartBound: Configurator.Configuration =
        ConfiguratorTestUtils.createConfiguration('6514', ownerCartEntry);

      entitiesInConfigurationState[productConfiguration.owner.key] =
        productConfiguration.owner.key;
      entitiesInConfigurationState[configurationCartBound.owner.key] =
        configurationCartBound.owner.key;

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
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () => of(configurationState)
      );
      const configurationProductBoundObsolete: Configurator.Configuration =
        ConfiguratorTestUtils.createConfiguration('6514', owner);

      configurationProductBoundObsolete.nextOwner = ownerCartEntry;

      entitiesInConfigurationState[
        configurationProductBoundObsolete.owner.key
      ] = {
        value: configurationProductBoundObsolete,
      };

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
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () => of(configurationState)
      );
      const configurationProductBound: Configurator.Configuration =
        ConfiguratorTestUtils.createConfiguration('6514', owner);

      const configurationOrderBound: Configurator.Configuration =
        ConfiguratorTestUtils.createConfiguration('6513', ownerOrderEntry);

      entitiesInConfigurationState[configurationProductBound.owner.key] = {
        value: configurationProductBound,
      };

      entitiesInConfigurationState[configurationOrderBound.owner.key] = {
        value: configurationOrderBound,
      };

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
      readConfigurationForOrderEntryMock.and.returnValue(
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
      addToCartMock.and.returnValue(of(cartModificationWithoutEntry));
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
      addToCartMock.and.returnValue(throwError(() => errorResponse));
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
      updateCartEntryMock.and.returnValue(throwError(() => errorResponse));

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
