import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import {
  OccConfig,
  DeliveryModeList,
  PaymentDetails,
  LoadUserPaymentMethods,
  LoadUserAddresses,
  ProductImageConverterService,
  OccOrderService,
  GlobalMessageType,
  AddMessage,
  OccCartService,
  Address,
  Order
} from '@spartacus/core';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from '../actions/checkout.action';

import * as fromEffects from './checkout.effect';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  }
};

describe('Checkout effect', () => {
  let cartService: OccCartService;
  let orderService: OccOrderService;
  let entryEffects: fromEffects.CheckoutEffects;
  let actions$: Observable<Action>;
  let productImageConverter: ProductImageConverterService;

  const userId = 'testUserId';
  const cartId = 'testCartId';
  const address: Address = {
    id: 'testAddressId',
    firstName: 'John',
    lastName: 'Doe',
    titleCode: 'mr',
    line1: 'Toyosaki 2 create on cart',
    town: 'Montreal',
    postalCode: 'L6M1P9',
    country: { isocode: 'CA' }
  };
  const modes: DeliveryModeList = {
    deliveryModes: [{ code: 'code1' }, { code: 'code2' }]
  };
  const orderDetails: Order = { entries: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartService,
        OccOrderService,
        ProductImageConverterService,
        fromEffects.CheckoutEffects,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        provideMockActions(() => actions$)
      ]
    });

    entryEffects = TestBed.get(fromEffects.CheckoutEffects);
    cartService = TestBed.get(OccCartService);
    orderService = TestBed.get(OccOrderService);
    productImageConverter = TestBed.get(ProductImageConverterService);

    spyOn(cartService, 'createAddressOnCart').and.returnValue(of(address));
    spyOn(cartService, 'setDeliveryAddress').and.returnValue(of({}));
    spyOn(cartService, 'getSupportedDeliveryModes').and.returnValue(of(modes));
    spyOn(orderService, 'placeOrder').and.returnValue(of(orderDetails));
    spyOn(cartService, 'setDeliveryMode').and.returnValue(of({}));
    spyOn(cartService, 'setPaymentDetails').and.returnValue(of({}));
  });

  describe('addDeliveryAddress$', () => {
    it('should add delivery address to cart', () => {
      const action = new fromActions.AddDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address
      });

      const completion1 = new LoadUserAddresses(userId);
      const completion2 = new fromActions.SetDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(entryEffects.addDeliveryAddress$).toBeObservable(expected);
    });
  });

  describe('setDeliveryAddress$', () => {
    it('should set delivery address to cart', () => {
      const action = new fromActions.SetDeliveryAddress({
        userId: userId,
        cartId: cartId,
        address: address
      });
      const completion = new fromActions.SetDeliveryAddressSuccess(address);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.setDeliveryAddress$).toBeObservable(expected);
    });
  });

  describe('loadSupportedDeliveryModes$', () => {
    it('should load all supported delivery modes from cart', () => {
      const action = new fromActions.LoadSupportedDeliveryModes({
        userId: userId,
        cartId: cartId
      });
      const completion = new fromActions.LoadSupportedDeliveryModesSuccess(
        modes
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.loadSupportedDeliveryModes$).toBeObservable(expected);
    });
  });

  describe('setDeliveryMode$', () => {
    it('should set delivery mode for cart', () => {
      const action = new fromActions.SetDeliveryMode({
        userId: userId,
        cartId: cartId,
        selectedModeId: 'testSelectedModeId'
      });
      const completion = new fromActions.SetDeliveryModeSuccess(
        'testSelectedModeId'
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.setDeliveryMode$).toBeObservable(expected);
    });
  });

  describe('createPaymentDetails$', () => {
    it('should create payment details for cart', () => {
      const mockPaymentDetails: PaymentDetails = {
        accountHolderName: 'test test',
        cardNumber: '4111111111111111',
        cardType: {
          code: 'visa'
        },
        expiryMonth: '01',
        expiryYear: '2019',
        cvn: '123',
        billingAddress: {
          firstName: 'test',
          lastName: 'test',
          line1: 'line1',
          line2: 'line2',
          postalCode: '12345',
          town: 'MainCity',
          country: {
            isocode: 'US'
          }
        }
      };

      const paymentProviderInfo = {
        mappingLabels: {
          entry: [
            {
              key: 'hybris_sop_amount',
              value: 'amount'
            },
            {
              key: 'hybris_sop_currency',
              value: ''
            },
            {
              key: 'hybris_billTo_country',
              value: 'billTo_country'
            },
            {
              key: 'hybris_card_type',
              value: 'card_type'
            },
            {
              key: 'hybris_card_expiration_year',
              value: 'card_expirationYear'
            },
            {
              key: 'hybris_sop_reason_code',
              value: 'reason_code'
            },
            {
              key: 'hybris_combined_expiry_date',
              value: 'false'
            },
            {
              key: 'hybris_sop_decision',
              value: 'decision'
            },
            {
              key: 'hybris_card_expiry_date',
              value: 'card_expirationDate'
            },
            {
              key: 'hybris_card_expiration_month',
              value: 'card_expirationMonth'
            },
            {
              key: 'hybris_billTo_street1',
              value: 'billTo_street1'
            },
            {
              key: 'hybris_sop_card_number',
              value: 'card_accountNumber'
            },
            {
              key: 'hybris_separator_expiry_date',
              value: ''
            },
            {
              key: 'hybris_account_holder_name',
              value: 'mockup_account_holder'
            },
            {
              key: 'hybris_sop_uses_public_signature',
              value: 'false'
            },
            {
              key: 'hybris_card_number',
              value: 'card_accountNumber'
            },
            {
              key: 'hybris_card_cvn',
              value: 'card_cvNumber'
            },
            {
              key: 'hybris_billTo_lastname',
              value: 'billTo_lastName'
            },
            {
              key: 'hybris_billTo_city',
              value: 'billTo_city'
            },
            {
              key: 'hybris_billTo_firstname',
              value: 'billTo_firstName'
            },
            {
              key: 'hybris_billTo_postalcode',
              value: 'billTo_postalCode'
            }
          ]
        },
        parameters: {
          entry: []
        },
        postUrl: 'https://testurl'
      };

      const paymentDetails: PaymentDetails = {
        accountHolderName: 'test',
        billingAddress: {
          line1: '123 Montreal'
        }
      };

      const html =
        '<form id="silentOrderPostForm" name="silentOrderPostForm" action="javascript:false;" method="post">' +
        '<div id="postFormItems">' +
        '<dl>' +
        '<input type="hidden" id="billTo_city" name="billTo_city" value="MainCity" />' +
        '<input type="hidden" id="amount" name="amount" value="0" />' +
        '<input type="hidden" id="decision_publicSignature" name="decision_publicSignature" value="mEhlMRLCsuPimhp50ElrY94zFyc=" />' +
        '<input type="hidden" id="decision" name="decision" value="ACCEPT" />' +
        '<input type="hidden" id="billTo_country" name="billTo_country" value="US" />' +
        '<input type="hidden" id="billTo_lastName" name="billTo_lastName" value="test" />' +
        '<input type="hidden" id="ccAuthReply_cvCode" name="ccAuthReply_cvCode" value="M" />' +
        '<input type="hidden" id="billTo_postalCode" name="billTo_postalCode" value="12345" />' +
        '<input type="hidden" id="billTo_street1" name="billTo_street1" value="999 de Maisonneuve" />' +
        '<input type="hidden" id="billTo_firstName" name="billTo_firstName" value="test" />' +
        '<input type="hidden" id="card_cardType" name="card_cardType" value="visa" />' +
        '<input type="hidden" id="card_expirationMonth" name="card_expirationMonth" value="12" />' +
        '<input type="hidden" id="card_expirationYear" name="card_expirationYear" value="2020" />' +
        '<input type="hidden" id="reasonCode" name="reasonCode" value="100" />' +
        '<input type="hidden" id="card_accountNumber" name="card_accountNumber" value="************1111" />' +
        '</dl>' +
        '</div>' +
        '</form>';

      spyOn(cartService, 'getPaymentProviderSubInfo').and.returnValue(
        of(paymentProviderInfo)
      );
      spyOn(cartService, 'createSubWithPaymentProvider').and.returnValue(
        of(html)
      );
      spyOn(cartService, 'createPaymentDetails').and.returnValue(
        of(paymentDetails)
      );

      const action = new fromActions.CreatePaymentDetails({
        userId: userId,
        cartId: cartId,
        paymentDetails: mockPaymentDetails
      });
      const completion1 = new LoadUserPaymentMethods(userId);
      const completion2 = new fromActions.CreatePaymentDetailsSuccess(
        paymentDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(entryEffects.createPaymentDetails$).toBeObservable(expected);
    });
  });

  describe('setPaymentDetails$', () => {
    it('should set payment details', () => {
      const paymentDetails: PaymentDetails = {
        id: '123',
        billingAddress: {
          town: 'MainCity',
          country: { isocode: 'US' },
          lastName: 'test'
        }
      };

      const action = new fromActions.SetPaymentDetails({
        userId: userId,
        cartId: cartId,
        paymentDetails
      });
      const completion = new fromActions.SetPaymentDetailsSuccess(
        paymentDetails
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(entryEffects.setPaymentDetails$).toBeObservable(expected);
    });
  });

  describe('placeOrder$', () => {
    it('should place order', () => {
      spyOn(productImageConverter, 'convertProduct').and.returnValue(
        orderDetails
      );

      const action = new fromActions.PlaceOrder({
        userId: userId,
        cartId: cartId
      });
      const completion1 = new fromActions.PlaceOrderSuccess(orderDetails);
      const completion2 = new AddMessage({
        text: 'Order placed successfully',
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(entryEffects.placeOrder$).toBeObservable(expected);
    });
  });
});
