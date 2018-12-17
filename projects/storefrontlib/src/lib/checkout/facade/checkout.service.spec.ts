import { TestBed, inject } from '@angular/core/testing';

import { StoreModule, Store } from '@ngrx/store';
import * as fromCheckout from '../store';
import { CartDataService } from '../../cart/facade';
import { CheckoutService } from './checkout.service';
import { Address, PaymentDetails } from '@spartacus/core';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let cartData: CartDataService;
  let store: Store<fromCheckout.CheckoutState>;
  const userId = 'testUserId';
  const cart = { code: 'testCartId', guid: 'testGuid' };

  const paymentDetails: PaymentDetails = {
    id: 'mockPaymentDetails'
  };

  const address: Address = {
    firstName: 'John',
    lastName: 'Doe',
    titleCode: 'mr',
    line1: 'Toyosaki 2 create on cart',
    town: 'Montreal',
    postalCode: 'L6M1P9',
    country: { isocode: 'CA' }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckout.getReducers())
      ],
      providers: [CheckoutService, CartDataService]
    });

    service = TestBed.get(CheckoutService);
    cartData = TestBed.get(CartDataService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CheckoutService is injected', inject(
    [CheckoutService],
    (checkoutService: CheckoutService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get supported delivery modes', () => {
    store.dispatch(
      new fromCheckout.LoadSupportedDeliveryModesSuccess({
        deliveryModes: [{ code: 'mode1' }, { code: 'mode2' }]
      })
    );

    let deliveryModes;
    service.getSupportedDeliveryModes().subscribe(data => {
      deliveryModes = data;
    });
    expect(deliveryModes).toEqual([{ code: 'mode1' }, { code: 'mode2' }]);
  });

  it('should be able to get selected delivery mode', () => {
    store.dispatch(
      new fromCheckout.LoadSupportedDeliveryModesSuccess({
        deliveryModes: [{ code: 'mode1' }, { code: 'mode2' }]
      })
    );
    store.dispatch(new fromCheckout.SetDeliveryModeSuccess('mode1'));

    let selectedMode;
    service.getSelectedDeliveryMode().subscribe(data => {
      selectedMode = data;
    });
    expect(selectedMode).toEqual({ code: 'mode1' });
  });

  it('should be able to get the code of selected delivery mode', () => {
    store.dispatch(
      new fromCheckout.LoadSupportedDeliveryModesSuccess({
        deliveryModes: [{ code: 'mode1' }, { code: 'mode2' }]
      })
    );
    store.dispatch(new fromCheckout.SetDeliveryModeSuccess('mode1'));

    let selectedModeCode;
    service.getSelectedDeliveryModeCode().subscribe(data => {
      selectedModeCode = data;
    });
    expect(selectedModeCode).toEqual('mode1');
  });

  it('should be able to get the card types', () => {
    store.dispatch(
      new fromCheckout.LoadCardTypesSuccess([
        { code: 'visa', name: 'visa' },
        { code: 'masterCard', name: 'masterCard' }
      ])
    );

    let cardTypes;
    service.getCardTypes().subscribe(data => {
      cardTypes = data;
    });
    expect(cardTypes).toEqual([
      { code: 'visa', name: 'visa' },
      { code: 'masterCard', name: 'masterCard' }
    ]);
  });

  it('should be able to get the delivery address', () => {
    store.dispatch(new fromCheckout.SetDeliveryAddressSuccess(address));

    let deliveryAddress;
    service.getDeliveryAddress().subscribe(data => {
      deliveryAddress = data;
    });
    expect(deliveryAddress).toEqual(address);
  });

  it('should be able to get the address verification result', () => {
    store.dispatch(
      new fromCheckout.VerifyAddressSuccess({ decision: 'DECLINE' })
    );

    let result;
    service.getAddressVerificationResults().subscribe(data => {
      result = data;
    });
    expect(result).toEqual({ decision: 'DECLINE' });
  });

  it('should be able to get the payment details', () => {
    store.dispatch(new fromCheckout.SetPaymentDetailsSuccess(paymentDetails));

    let tempPaymentDetails;
    service.getPaymentDetails().subscribe(data => {
      tempPaymentDetails = data;
    });
    expect(tempPaymentDetails).toEqual(paymentDetails);
  });

  it('should be able to get the order details', () => {
    store.dispatch(new fromCheckout.PlaceOrderSuccess({ code: 'testOrder' }));

    let orderDetails;
    service.getOrderDetails().subscribe(data => {
      orderDetails = data;
    });
    expect(orderDetails).toEqual({ code: 'testOrder' });
  });

  it('should be able to create and set address to cart', () => {
    cartData.userId = userId;
    cartData.cart = cart;

    service.createAndSetAddress(address);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.AddDeliveryAddress({
        userId: userId,
        cartId: cart.code,
        address: address
      })
    );
  });

  it('should be able to load the supported delivery modes', () => {
    cartData.userId = userId;
    cartData.cart = cart;

    service.loadSupportedDeliveryModes();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.LoadSupportedDeliveryModes({
        userId: userId,
        cartId: cart.code
      })
    );
  });

  it('should be able to set the delivery mode', () => {
    cartData.userId = userId;
    cartData.cart = cart;

    const modeId = 'testId';
    service.setDeliveryMode(modeId);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.SetDeliveryMode({
        userId: userId,
        cartId: cart.code,
        selectedModeId: modeId
      })
    );
  });

  it('should be able to load supported cart types', () => {
    service.loadSupportedCardTypes();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.LoadCardTypes()
    );
  });

  it('should be able to create payment details', () => {
    cartData.userId = userId;
    cartData.cart = cart;

    service.createPaymentDetails(paymentDetails);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.CreatePaymentDetails({
        userId: userId,
        cartId: cart.code,
        paymentDetails
      })
    );
  });

  it('should be able to place order', () => {
    cartData.userId = userId;
    cartData.cart = cart;

    service.placeOrder();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.PlaceOrder({
        userId: userId,
        cartId: cart.code
      })
    );
  });

  it('should load address verification results', () => {
    const testAddress: Address = {
      id: 'testAddress1'
    };
    cartData.userId = userId;
    cartData.cart = cart;

    service.verifyAddress(testAddress);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.VerifyAddress({
        userId: userId,
        address: testAddress
      })
    );
  });

  it('should set delivery address', () => {
    cartData.userId = userId;
    cartData.cart = cart;
    service.setDeliveryAddress(address);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.SetDeliveryAddress({
        userId: userId,
        cartId: cartData.cart.code,
        address: address
      })
    );
  });

  it('should set payment details', () => {
    cartData.userId = userId;
    cartData.cart = cart;

    service.setPaymentDetails(paymentDetails);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.SetPaymentDetails({
        userId: userId,
        cartId: cartData.cart.code,
        paymentDetails
      })
    );
  });

  it('should be able to clear address verification result', () => {
    service.clearAddressVerificationResults();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.ClearAddressVerificationResults()
    );
  });

  it('should be able to clear checkout data', () => {
    service.clearCheckoutData();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.ClearCheckoutData()
    );
  });

  it('should be able to clear checkout step', () => {
    service.clearCheckoutStep(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.ClearCheckoutStep(2)
    );
  });
});
