import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { CartActions } from '../../../../cart/store/actions/';
import { CartModification } from '../../../../model/cart.model';
import { makeErrorSerializable } from '../../../../util/serialization-utils';
import * as fromConfigurationReducers from '../../store/reducers/index';
import { ConfiguratorUiActions } from '../actions';
import * as ConfiguratorActions from '../actions/configurator.action';
import { CONFIGURATION_FEATURE } from '../configuration-state';
import { Configurator } from './../../../../model/configurator.model';
import { ConfiguratorCommonsConnector } from './../../connectors/configurator-commons.connector';
import * as fromEffects from './configurator.effect';

const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';
const groupId = 'GROUP-1';
const cartId = 'CART-1234';
const userId = 'theUser';
const quantity = 1;
const errorResponse: HttpErrorResponse = new HttpErrorResponse({
  error: 'notFound',
  status: 404,
});
const productConfiguration: Configurator.Configuration = {
  configId: 'a',
  productCode: productCode,
  complete: true,
  consistent: true,
  groups: [{ id: groupId, attributes: [{ name: 'attrName' }] }],
};
const cartModification: CartModification = {
  quantity: 1,
  quantityAdded: 1,
  entry: { product: { code: productCode }, quantity: 1 },
};

describe('ConfiguratorEffect', () => {
  let createMock: jasmine.Spy;
  let readMock: jasmine.Spy;
  let addToCartMock: jasmine.Spy;
  let configEffects: fromEffects.ConfiguratorEffects;

  let actions$: Observable<any>;

  beforeEach(() => {
    createMock = jasmine.createSpy().and.returnValue(of(productConfiguration));
    readMock = jasmine.createSpy().and.returnValue(of(productConfiguration));
    addToCartMock = jasmine.createSpy().and.returnValue(of(cartModification));
    class MockConnector {
      createConfiguration = createMock;

      readConfiguration = readMock;

      addToCart = addToCartMock;

      updateConfiguration(): Observable<Configurator.Configuration> {
        return of(productConfiguration);
      }

      readPriceSummary(): Observable<Configurator.Configuration> {
        return of(productConfiguration);
      }
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
      ],
    });

    configEffects = TestBed.get(fromEffects.ConfiguratorEffects as Type<
      fromEffects.ConfiguratorEffects
    >);
  });

  it('should provide configuration effects', () => {
    expect(configEffects).toBeTruthy();
  });

  it('should emit a success action with content for an action of type createConfiguration', () => {
    const action = new ConfiguratorActions.CreateConfiguration(productCode);

    const completion = new ConfiguratorActions.CreateConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('must not emit anything in case source action is not covered, createConfiguration', () => {
    const action = new ConfiguratorActions.CreateConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: action });

    configEffects.createConfiguration$.subscribe(emitted => fail(emitted));
  });

  it('should emit a fail action in case something goes wrong', () => {
    createMock.and.returnValue(throwError(errorResponse));

    const action = new ConfiguratorActions.CreateConfiguration(productCode);

    const completionFailure = new ConfiguratorActions.CreateConfigurationFail(
      productCode,
      makeErrorSerializable(errorResponse)
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completionFailure });

    expect(configEffects.createConfiguration$).toBeObservable(expected);
  });

  it('should emit a success action with content for an action of type readConfiguration', () => {
    const payloadInput = { configId: configId };
    const action = new ConfiguratorActions.ReadConfiguration(payloadInput);

    const completion = new ConfiguratorActions.ReadConfigurationSuccess(
      productConfiguration
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configEffects.readConfiguration$).toBeObservable(expected);
  });

  it('must not emit anything in case source action is not covered, readConfiguration', () => {
    const payloadInput = { configId: configId };
    const action = new ConfiguratorActions.ReadConfigurationSuccess(
      payloadInput
    );
    actions$ = hot('-a', { a: action });

    configEffects.readConfiguration$.subscribe(emitted => fail(emitted));
    // just to get rid of the SPEC_HAS_NO_EXPECTATIONS message.
    // The actual test is done in the subscribe part
    expect(true).toBeTruthy();
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

    it('must not emit anything in case source action is not covered, updateConfiguration', () => {
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfigurationSuccess(
        payloadInput
      );
      actions$ = hot('-a', { a: action });

      configEffects.updateConfiguration$.subscribe(emitted => fail(emitted));
      // just to get rid of the SPEC_HAS_NO_EXPECTATIONS message.
      // The actual test is done in the subscribe part
      expect(true).toBeTruthy();
    });
  });

  describe('Effect updateConfigurationSuccess', () => {
    it('should raise UpdateConfigurationFinalize on UpdateConfigurationSuccess in case no changes are pending', () => {
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
      const setCurrentGroup = new ConfiguratorUiActions.SetCurrentGroup(
        productConfiguration.productCode,
        groupId
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: finalizeSuccess,
        c: updatePrices,
        d: setCurrentGroup,
      });
      expect(configEffects.updateConfigurationSuccess$).toBeObservable(
        expected
      );
    });
  });
  describe('Effect updateConfigurationFail', () => {
    it('should raise UpdateConfigurationFinalizeFail on UpdateConfigurationFail in case no changes are pending', () => {
      const payloadInput = productConfiguration;
      const action = new ConfiguratorActions.UpdateConfigurationFail(
        productConfiguration.productCode,
        payloadInput
      );
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

      configEffects.updateConfigurationFail$.subscribe(emitted =>
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
        configId: productConfiguration.configId,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(configEffects.handleErrorOnUpdate$).toBeObservable(expected);
    });
  });
  describe('Effect groupChange', () => {
    it('should emit ReadConfigurationSuccess and SetCurrentGroup on ChangeGroup in case no changes are pending', () => {
      const payloadInput = {
        configId: configId,
        productCode: productCode,
        groupId: groupId,
      };
      const action = new ConfiguratorActions.ChangeGroup(payloadInput);
      const readConfigurationSuccess = new ConfiguratorActions.ReadConfigurationSuccess(
        productConfiguration
      );
      const setCurrentGroup = new ConfiguratorUiActions.SetCurrentGroup(
        productConfiguration.productCode,
        groupId
      );
      actions$ = hot('-a', { a: action });

      const expected = cold('-(bc)', {
        b: setCurrentGroup,
        c: readConfigurationSuccess,
      });
      expect(configEffects.groupChange$).toBeObservable(expected);
    });
    it('should emit ReadConfigurationFail in case read call is not successful', () => {
      readMock.and.returnValue(throwError(errorResponse));
      const payloadInput = {
        configId: configId,
        productCode: productCode,
        groupId: groupId,
      };
      const action = new ConfiguratorActions.ChangeGroup(payloadInput);
      const readConfigurationFail = new ConfiguratorActions.ReadConfigurationFail(
        productConfiguration.productCode,
        makeErrorSerializable(errorResponse)
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: readConfigurationFail,
      });
      expect(configEffects.groupChange$).toBeObservable(expected);
    });
  });
  /*describe('Effect groupChangeFinalize', () => {
    it('should emit ReadConfigurationSuccess and SetCurrentGroup on ChangeGroupFinalize in case no changes are pending', () => {
      const payloadInput = {
        configId: configId,
        productCode: productCode,
        groupId: groupId,
      };
      const action = new ConfiguratorActions.ChangeGroupFinalize(payloadInput);
      const readConfigurationSuccess = new ConfiguratorActions.ReadConfigurationSuccess(
        productConfiguration
      );
      const setCurrentGroup = new ConfiguratorUiActions.SetCurrentGroup(
        productConfiguration.productCode,
        groupId
      );
      actions$ = hot('-a', { a: action });

      const expected = cold('-(bc)', {
        b: setCurrentGroup,
        c: readConfigurationSuccess,
      });
      expect(configEffects.groupChangeFinalize$).toBeObservable(expected);
    });
    it('should emit ReadConfigurationFail in case read call is not successful', () => {
      readMock.and.returnValue(throwError(errorResponse));
      const payloadInput = {
        configId: configId,
        productCode: productCode,
        groupId: groupId,
      };
      const action = new ConfiguratorActions.ChangeGroupFinalize(payloadInput);
      const readConfigurationFail = new ConfiguratorActions.ReadConfigurationFail(
        productConfiguration.productCode,
        makeErrorSerializable(errorResponse)
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: readConfigurationFail,
      });
      expect(configEffects.groupChangeFinalize$).toBeObservable(expected);
    });
  });*/
  describe('Effect addToCart', () => {
    it('should emit AddToCartSuccess, RemoveUiState and RemoveConfiguration on addToCart in case no changes are pending', () => {
      const payloadInput = {
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        configId: configId,
      };
      const action = new ConfiguratorActions.AddToCart(payloadInput);
      const cartAddEntrySuccess = new CartActions.CartAddEntrySuccess({
        ...cartModification,
        userId: userId,
        cartId: cartId,
      });
      const removeUiState = new ConfiguratorUiActions.RemoveUiState(
        productConfiguration.productCode
      );
      const removeConfiguration = new ConfiguratorActions.RemoveConfiguration(
        productConfiguration.productCode
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-(bcd)', {
        b: removeUiState,
        c: removeConfiguration,
        d: cartAddEntrySuccess,
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
        configId: configId,
      };
      const action = new ConfiguratorActions.AddToCart(payloadInput);
      const cartAddEntryFail = new CartActions.CartAddEntryFail(
        makeErrorSerializable(errorResponse)
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: cartAddEntryFail,
      });
      expect(configEffects.addToCart$).toBeObservable(expected);
    });
  });
  /*describe('Effect addToCartFinalize', () => {
    /*it('should emit AddToCartSuccess, RemoveUiState and RemoveConfiguration on AddToCartFinalize in case no changes are pending', () => {
      const payloadInput = {
        userId: userId,
        cartId: cartId,
        productCode: productCode,
        quantity: quantity,
        configId: configId,
      };
      const action = new ConfiguratorActions.AddToCartFinalize(payloadInput);
      const cartAddEntrySuccess = new CartActions.CartAddEntrySuccess({
        ...cartModification,
        userId: userId,
        cartId: cartId,
      });
      const removeUiState = new ConfiguratorUiActions.RemoveUiState(
        productConfiguration.productCode
      );
      const removeConfiguration = new ConfiguratorActions.RemoveConfiguration(
        productConfiguration.productCode
      );
      actions$ = hot('-a', { a: action });

      const expected = cold('-(bcd)', {
        b: removeUiState,
        c: removeConfiguration,
        d: cartAddEntrySuccess,
      });
      expect(configEffects.addToCartFinalize$).toBeObservable(expected);
    });*/
  /*it('should emit AddToCartFail in case add to cart call is not successful', () => {
      addToCartMock.and.returnValue(throwError(errorResponse));
      const payloadInput = {
        configId: configId,
        productCode: productCode,
        cartId: cartId,
      };
      const action = new ConfiguratorActions.AddToCartFinalize(payloadInput);
      const cartAddEntryFail = new CartActions.CartAddEntryFail(
        makeErrorSerializable(errorResponse)
      );

      actions$ = hot('-a', { a: action });

      const expected = cold('-b', {
        b: cartAddEntryFail,
      });
      expect(configEffects.addToCartFinalize$).toBeObservable(expected);
    });
  });*/
});
