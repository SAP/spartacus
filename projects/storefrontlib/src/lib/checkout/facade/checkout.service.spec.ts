import { TestBed, inject } from '@angular/core/testing';

import { StoreModule, Store } from '@ngrx/store';

import * as fromCheckout from '../store';
import { CartDataService } from '../../cart/facade';

import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let cartData: CartDataService;
  let store: Store<fromCheckout.CheckoutState>;
  const userId = 'testUserId';
  const cart = { code: 'testCartId', guid: 'testGuid' };

  const address: any = {
    firstName: 'John',
    lastName: 'Doe',
    titleCode: 'mr',
    line1: 'Toyosaki 2 create on cart'
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
    service.supportedDeliveryModes$.subscribe(data => {
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
    service.selectedDeliveryMode$.subscribe(data => {
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
    service.selectedDeliveryModeCode$.subscribe(data => {
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
    service.cardTypes$.subscribe(data => {
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
    service.deliveryAddress$.subscribe(data => {
      deliveryAddress = data;
    });
    expect(deliveryAddress).toEqual(address);
  });

  it('should be able to get the address verification result', () => {
    store.dispatch(
      new fromCheckout.VerifyAddressSuccess({ decision: 'DECLINE' })
    );

    let result;
    service.addressVerificationResults$.subscribe(data => {
      result = data;
    });
    expect(result).toEqual({ decision: 'DECLINE' });
  });

  it('should be able to get the payment details', () => {
    store.dispatch(
      new fromCheckout.SetPaymentDetailsSuccess({ id: 'payment id' })
    );

    let paymentDetails;
    service.paymentDetails$.subscribe(data => {
      paymentDetails = data;
    });
    expect(paymentDetails).toEqual({ id: 'payment id' });
  });

  it('should be able to get the order details', () => {
    store.dispatch(new fromCheckout.PlaceOrderSuccess({ code: 'testOrder' }));

    let orderDetails;
    service.orderDetails$.subscribe(data => {
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
    const paymentInfo = 'mockInfo';

    service.createPaymentDetails(paymentInfo);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.CreatePaymentDetails({
        userId: userId,
        cartId: cart.code,
        paymentDetails: paymentInfo
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
    cartData.userId = userId;
    cartData.cart = cart;

    service.verifyAddress('mockAddress');

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.VerifyAddress({
        userId: userId,
        address: 'mockAddress'
      })
    );
  });

  it('should set delivery address', () => {
    cartData.userId = userId;
    cartData.cart = cart;

    service.setDeliveryAddress('mockAddress');

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.SetDeliveryAddress({
        userId: userId,
        cartId: cartData.cart.code,
        address: 'mockAddress'
      })
    );
  });

  it('should set payment details', () => {
    cartData.userId = userId;
    cartData.cart = cart;

    service.setPaymentDetails('mockPaymentDetails');

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.SetPaymentDetails({
        userId: userId,
        cartId: cartData.cart.code,
        paymentDetails: 'mockPaymentDetails'
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
