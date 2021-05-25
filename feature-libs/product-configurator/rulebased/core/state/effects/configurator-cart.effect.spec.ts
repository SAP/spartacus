import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as ngrxStore from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import {
  CartActions,
  CartModification,
  normalizeHttpError,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ConfiguratorComponentTestUtilsService } from '../../../shared/testing/configurator-component-test-utils.service';
import { RulebasedConfiguratorConnector } from '../../connectors/rulebased-configurator.connector';
import { ConfiguratorUtilsService } from '../../facade/utils/configurator-utils.service';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
import { CONFIGURATOR_FEATURE } from '../configurator-state';
import * as fromConfigurationReducers from '../reducers/index';
import * as fromEffects from './configurator-cart.effect';

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
const owner: CommonConfigurator.Owner = {
  type: CommonConfigurator.OwnerType.PRODUCT,
  id: productCode,
  key: 'product/CONF_LAPTOP',
  configuratorType: ConfiguratorType.VARIANT,
};

const productConfiguration: Configurator.Configuration = {
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
  groups: [{ id: groupId, attributes: [{ name: 'attrName' }], subGroups: [] }],
};
ConfiguratorComponentTestUtilsService.freezeProductConfiguration(
  productConfiguration
);

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

describe('ConfiguratorCartEffect', () => {
  let addToCartMock: jasmine.Spy;
  let updateCartEntryMock: jasmine.Spy;
  let readConfigurationForCartEntryMock: jasmine.Spy;
  let readConfigurationForOrderEntryMock: jasmine.Spy;
  let configCartEffects: fromEffects.ConfiguratorCartEffects;

  let actions$: Observable<any>;

  beforeEach(() => {
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
      addToCart = addToCartMock;
      updateConfigurationForCartEntry = updateCartEntryMock;
      readConfigurationForCartEntry = readConfigurationForCartEntryMock;
      readConfigurationForOrderEntry = readConfigurationForOrderEntryMock;
    }
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATOR_FEATURE,
          fromConfigurationReducers.getConfiguratorReducers()
        ),
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
  });

  it('should provide configuration effects', () => {
    expect(configCartEffects).toBeTruthy();
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
      const newCartEntryOwner = ConfiguratorModelUtils.createOwner(
        CommonConfigurator.OwnerType.CART_ENTRY,
        cartEntryNumber
      );

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

      expect(configCartEffects.addOwner$).toBeObservable(expected);
    });
  });

  describe('Effect readConfigurationForCartEntry', () => {
    it('should emit a success action with content for an action of type readConfigurationForCartEntry', () => {
      const readFromCartEntry: CommonConfigurator.ReadConfigurationFromCartEntryParameters = {
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

      expect(configCartEffects.readConfigurationForCartEntry$).toBeObservable(
        expected
      );
    });

    it('should emit a fail action if something goes wrong', () => {
      readConfigurationForCartEntryMock.and.returnValue(
        throwError(errorResponse)
      );
      const readFromCartEntry: CommonConfigurator.ReadConfigurationFromCartEntryParameters = {
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

      expect(configCartEffects.readConfigurationForCartEntry$).toBeObservable(
        expected
      );
    });
  });

  describe('Effect readConfigurationForOrderEntry', () => {
    it('should emit a success action with content in case call is successful', () => {
      const readFromOrderEntry: CommonConfigurator.ReadConfigurationFromCartEntryParameters = {
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

      expect(configCartEffects.readConfigurationForOrderEntry$).toBeObservable(
        expected
      );
    });

    it('should emit a fail action if something goes wrong', () => {
      readConfigurationForOrderEntryMock.and.returnValue(
        throwError(errorResponse)
      );
      const readFromOrderEntry: CommonConfigurator.ReadConfigurationFromOrderEntryParameters = {
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
      expect(configCartEffects.addToCart$).toBeObservable(expected);
    });

    it('should emit AddToCartFail in case add to cart call is not successful', () => {
      addToCartMock.and.returnValue(throwError(errorResponse));
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
        error: normalizeHttpError(errorResponse),
      });

      actions$ = hot('-a', { a: action });

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
      expect(configCartEffects.updateCartEntry$).toBeObservable(expected);
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
      expect(configCartEffects.updateCartEntry$).toBeObservable(expected);
    });
  });
});
