import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { GenericConfigurator } from 'projects/core/src/model';
import { Observable, of, throwError } from 'rxjs';
import { CartModification } from '../../../../model/cart.model';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import { ConfiguratorTextfieldConnector } from '../../connectors/configurator-textfield.connector';
import * as ConfiguratorActions from '../actions/configurator-textfield.action';
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
  let addToCartMock: jasmine.Spy;
  let updateCartEntryMock: jasmine.Spy;

  let configEffects: fromEffects.ConfiguratorTextfieldEffects;

  let actions$: Observable<any>;

  beforeEach(() => {
    createMock = jasmine.createSpy().and.returnValue(of(productConfiguration));
    readFromCartEntryMock = jasmine
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
      fromEffects.ConfiguratorTextfieldEffects as Type<
        fromEffects.ConfiguratorTextfieldEffects
      >
    );
  });

  it('should provide configuration effects', () => {
    expect(configEffects).toBeTruthy();
  });

  it('should emit a success action with content for an action of type createConfiguration', () => {
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfiguration(payloadInput);

    const completion = new ConfiguratorActions.CreateConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('should emit a fail action in case something goes wrong', () => {
    createMock.and.returnValue(throwError(errorResponse));
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfiguration(payloadInput);

    const completionFailure = new ConfiguratorActions.CreateConfigurationFail(
      makeErrorSerializable(errorResponse)
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completionFailure });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('should emit a success action with content for an action of type readConfigurationFromCart if read from cart is successful', () => {
    const payloadInput: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {};
    const action = new ConfiguratorActions.ReadCartEntryConfiguration(
      payloadInput
    );

    const completion = new ConfiguratorActions.ReadCartEntryConfigurationSuccess(
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
    const payloadInput: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {};
    const action = new ConfiguratorActions.ReadCartEntryConfiguration(
      payloadInput
    );

    const completionFailure = new ConfiguratorActions.ReadCartEntryConfigurationFail(
      makeErrorSerializable(errorResponse)
    );
    actions$ = hot('-a', { a: action });
    const expectedObs = cold('-b', { b: completionFailure });

    expect(configEffects.readConfigurationForCartEntry$).toBeObservable(
      expectedObs
    );
  });

  it('must not emit anything in case source action is not covered, createConfiguration', () => {
    const payloadInput = { productCode: productCode };
    const action = new ConfiguratorActions.CreateConfigurationSuccess(
      payloadInput
    );
    actions$ = hot('-a', { a: action });

    configEffects.createConfiguration$.subscribe((emitted) => fail(emitted));
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
      const action = new ConfiguratorActions.AddToCart(payloadInput);
      const cartAddEntrySuccess = new ConfiguratorActions.AddToCartSuccess();

      const removeConfiguration = new ConfiguratorActions.RemoveConfiguration(
        payloadInput
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: removeConfiguration,
        c: cartAddEntrySuccess,
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
      const action = new ConfiguratorActions.AddToCart(payloadInput);
      const cartAddEntryFail = new ConfiguratorActions.AddToCartFail(
        makeErrorSerializable(errorResponse)
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
      const action = new ConfiguratorActions.UpdateCartEntryConfiguration(
        payloadInput
      );
      const cartUpdateEntrySuccess = new ConfiguratorActions.UpdateCartEntryConfigurationSuccess();

      const removeConfiguration = new ConfiguratorActions.RemoveConfiguration(
        payloadInput
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: removeConfiguration,
        c: cartUpdateEntrySuccess,
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
      const action = new ConfiguratorActions.UpdateCartEntryConfiguration(
        payloadInput
      );
      const cartUpdateFail = new ConfiguratorActions.UpdateCartEntryConfigurationFail(
        makeErrorSerializable(errorResponse)
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: cartUpdateFail,
      });
      expect(configEffects.updateCartEntry$).toBeObservable(expected);
    });
  });
});
