import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import {
  CartActions,
  CartModification,
  normalizeHttpError,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { ConfiguratorTextfieldConnector } from '../../connectors/configurator-textfield.connector';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
import { ConfiguratorTextfieldActions } from '../actions/index';
import { CONFIGURATION_TEXTFIELD_FEATURE } from '../configuration-textfield-state';
import * as reducers from '../reducers/index';
import * as fromEffects from './configurator-textfield.effect';

const productCode = 'CONF_LAPTOP';
const cartId = 'CART-1234';
const cartEntryNumber = '1';
const userId = 'theUser';
const quantity = 1;

const productConfiguration: ConfiguratorTextfield.Configuration = {
  configurationInfos: [],
  owner: ConfiguratorModelUtils.createInitialOwner(),
};
const errorResponse: HttpErrorResponse = new HttpErrorResponse({
  error: 'notFound',
  status: 404,
});
const cartModification: CartModification = {
  quantity: 1,
  quantityAdded: 1,
  deliveryModeChanged: true,
  entry: { product: { code: productCode }, quantity: 1 },
  statusCode: '',
  statusMessage: '',
};

describe('ConfiguratorTextfieldEffect', () => {
  let createMock: jasmine.Spy;
  let readFromCartEntryMock: jasmine.Spy;
  let readFromOrderEntryMock: jasmine.Spy;
  let addToCartMock: jasmine.Spy;
  let updateCartEntryMock: jasmine.Spy;

  let configEffects: fromEffects.ConfiguratorTextfieldEffects;

  let actions$: Observable<any>;

  beforeEach(() => {
    createMock = jasmine.createSpy().and.returnValue(of(productConfiguration));
    readFromCartEntryMock = jasmine
      .createSpy()
      .and.returnValue(of(productConfiguration));
    readFromOrderEntryMock = jasmine
      .createSpy()
      .and.returnValue(of(productConfiguration));
    addToCartMock = jasmine.createSpy().and.returnValue(of(cartModification));
    updateCartEntryMock = jasmine
      .createSpy()
      .and.returnValue(of(cartModification));
    class MockConnector {
      createConfiguration = createMock;
      addToCart = addToCartMock;
      readConfigurationForCartEntry = readFromCartEntryMock;
      readConfigurationForOrderEntry = readFromOrderEntryMock;
      updateConfigurationForCartEntry = updateCartEntryMock;
    }

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_TEXTFIELD_FEATURE,
          reducers.getConfiguratorTextfieldReducers()
        ),
      ],

      providers: [
        fromEffects.ConfiguratorTextfieldEffects,
        provideMockActions(() => actions$),
        {
          provide: ConfiguratorTextfieldConnector,
          useClass: MockConnector,
        },
      ],
    });

    configEffects = TestBed.inject(
      fromEffects.ConfiguratorTextfieldEffects as Type<fromEffects.ConfiguratorTextfieldEffects>
    );
  });

  it('should provide configuration effects', () => {
    expect(configEffects).toBeTruthy();
  });

  it('should emit a success action with content for an action of type createConfiguration', () => {
    const payloadInput = {
      productCode: productCode,
      owner: ConfiguratorModelUtils.createInitialOwner(),
    };
    const action = new ConfiguratorTextfieldActions.CreateConfiguration(
      payloadInput
    );

    const completion =
      new ConfiguratorTextfieldActions.CreateConfigurationSuccess(
        productConfiguration
      );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('should emit a fail action in case something goes wrong', () => {
    createMock.and.returnValue(throwError(errorResponse));
    const payloadInput = {
      productCode: productCode,
      owner: ConfiguratorModelUtils.createInitialOwner(),
    };
    const action = new ConfiguratorTextfieldActions.CreateConfiguration(
      payloadInput
    );

    const completionFailure =
      new ConfiguratorTextfieldActions.CreateConfigurationFail(
        normalizeHttpError(errorResponse)
      );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completionFailure });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('should emit a success action with content for an action of type readConfigurationFromCart if read from cart is successful', () => {
    const payloadInput: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
      {
        owner: ConfiguratorModelUtils.createInitialOwner(),
      };
    const action = new ConfiguratorTextfieldActions.ReadCartEntryConfiguration(
      payloadInput
    );

    const completion =
      new ConfiguratorTextfieldActions.ReadCartEntryConfigurationSuccess(
        productConfiguration
      );
    actions$ = hot('-a', { a: action });
    const expectedObs = cold('-b', { b: completion });

    expect(configEffects.readConfigurationForCartEntry$).toBeObservable(
      expectedObs
    );
  });

  it('should emit a fail action in case read from cart leads to an error', () => {
    readFromCartEntryMock.and.returnValue(throwError(errorResponse));
    const payloadInput: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
      {
        owner: ConfiguratorModelUtils.createInitialOwner(),
      };
    const action = new ConfiguratorTextfieldActions.ReadCartEntryConfiguration(
      payloadInput
    );

    const completionFailure =
      new ConfiguratorTextfieldActions.ReadCartEntryConfigurationFail(
        normalizeHttpError(errorResponse)
      );
    actions$ = hot('-a', { a: action });
    const expectedObs = cold('-b', { b: completionFailure });

    expect(configEffects.readConfigurationForCartEntry$).toBeObservable(
      expectedObs
    );
  });

  it('should emit a success action with content for an action of type readOrderEntryConfiguration if read from order entry is successful', () => {
    const payloadInput: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
      {
        owner: ConfiguratorModelUtils.createInitialOwner(),
      };
    const action = new ConfiguratorTextfieldActions.ReadOrderEntryConfiguration(
      payloadInput
    );

    const completion =
      new ConfiguratorTextfieldActions.ReadOrderEntryConfigurationSuccess(
        productConfiguration
      );
    actions$ = cold('-a', { a: action });
    const expectedObs = cold('-b', { b: completion });

    expect(configEffects.readConfigurationForOrderEntry$).toBeObservable(
      expectedObs
    );
  });

  it('should emit a fail action in case read from order entry leads to an error', () => {
    readFromOrderEntryMock.and.returnValue(throwError(errorResponse));
    const payloadInput: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
      {
        owner: ConfiguratorModelUtils.createInitialOwner(),
      };
    const action = new ConfiguratorTextfieldActions.ReadOrderEntryConfiguration(
      payloadInput
    );

    const completionFailure =
      new ConfiguratorTextfieldActions.ReadOrderEntryConfigurationFail(
        normalizeHttpError(errorResponse)
      );
    actions$ = cold('-a', { a: action });
    const expectedObs = cold('-b', { b: completionFailure });

    expect(configEffects.readConfigurationForOrderEntry$).toBeObservable(
      expectedObs
    );
  });

  it('createConfiguration must not emit anything in case source action is not covered', () => {
    const action = new ConfiguratorTextfieldActions.CreateConfigurationSuccess({
      configurationInfos: [],
      owner: ConfiguratorModelUtils.createInitialOwner(),
    });
    actions$ = hot('-a', { a: action });
    const expectedObs = cold('-');

    expect(configEffects.createConfiguration$).toBeObservable(expectedObs);
  });

  describe('Textfield Effect addToCart', () => {
    it('should emit success on addToCart', () => {
      const payloadInput = {
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        configuration: productConfiguration,
      };
      const action = new ConfiguratorTextfieldActions.AddToCart(payloadInput);
      const loadCart = new CartActions.LoadCart({
        cartId: cartId,
        userId: userId,
      });

      const removeConfiguration =
        new ConfiguratorTextfieldActions.RemoveConfiguration();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: removeConfiguration,
        c: loadCart,
      });
      expect(configEffects.addToCart$).toBeObservable(expected);
    });

    it('should emit AddToCartFail in case add to cart call is not successful', () => {
      addToCartMock.and.returnValue(throwError(errorResponse));
      const payloadInput = {
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        configuration: productConfiguration,
      };
      const action = new ConfiguratorTextfieldActions.AddToCart(payloadInput);
      const cartAddEntryFail = new ConfiguratorTextfieldActions.AddToCartFail(
        normalizeHttpError(errorResponse)
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: cartAddEntryFail,
      });
      expect(configEffects.addToCart$).toBeObservable(expected);
    });
  });

  describe('Effect updateCartEntry', () => {
    it('should emit CartUpdateEntrySuccess on updateCartEntry', () => {
      const payloadInput: ConfiguratorTextfield.UpdateCartEntryParameters = {
        userId: userId,
        cartId: cartId,
        cartEntryNumber: cartEntryNumber,
        configuration: productConfiguration,
      };
      const action =
        new ConfiguratorTextfieldActions.UpdateCartEntryConfiguration(
          payloadInput
        );
      const loadCart = new CartActions.LoadCart({
        userId: userId,
        cartId: cartId,
      });

      const removeConfiguration =
        new ConfiguratorTextfieldActions.RemoveConfiguration();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: removeConfiguration,
        c: loadCart,
      });
      expect(configEffects.updateCartEntry$).toBeObservable(expected);
    });

    it('should emit CartUpdateEntryFail in case update cart entry is not successful', () => {
      updateCartEntryMock.and.returnValue(throwError(errorResponse));
      const payloadInput: ConfiguratorTextfield.UpdateCartEntryParameters = {
        userId: userId,
        cartId: cartId,
        cartEntryNumber: cartEntryNumber,
        configuration: productConfiguration,
      };
      const action =
        new ConfiguratorTextfieldActions.UpdateCartEntryConfiguration(
          payloadInput
        );
      const cartUpdateFail =
        new ConfiguratorTextfieldActions.UpdateCartEntryConfigurationFail(
          normalizeHttpError(errorResponse)
        );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: cartUpdateFail,
      });
      expect(configEffects.updateCartEntry$).toBeObservable(expected);
    });
  });
});
