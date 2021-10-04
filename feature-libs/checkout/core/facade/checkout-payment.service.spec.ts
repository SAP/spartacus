import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  CardType,
  Cart,
  PaymentDetails,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CheckoutPaymentConnector } from '../connectors/payment/checkout-payment.connector';
import { CheckoutActions } from '../store/actions/index';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { CheckoutPaymentService } from './checkout-payment.service';

describe('CheckoutPaymentService', () => {
  let service: CheckoutPaymentService;
  let userIdService: UserIdService;
  let activeCartService: ActiveCartService;
  let store: Store<CheckoutState>;
  const userId = 'testUserId';
  const cart: Cart = { code: 'testCartId', guid: 'testGuid' };

  const paymentDetails: PaymentDetails = {
    id: 'mockPaymentDetails',
  };

  class ActiveCartServiceStub {
    cart;
    isGuestCart() {
      return true;
    }

    getActiveCartId() {
      return of(cart.code);
    }

    getActive() {
      return of(cart);
    }
  }

  class UserIdServiceStub {
    userId;
    getUserId() {
      return of(userId);
    }
  }

  class MockCheckoutPaymentConnector
    implements Partial<CheckoutPaymentConnector>
  {
    getCardTypes() {
      return of([
        { code: 'visa', name: 'visa' },
        { code: 'masterCard', name: 'masterCard' },
      ]);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckoutReducers.getReducers()),
      ],
      providers: [
        CheckoutPaymentService,
        QueryService,
        { provide: ActiveCartService, useClass: ActiveCartServiceStub },
        { provide: UserIdService, useClass: UserIdServiceStub },
        {
          provide: CheckoutPaymentConnector,
          useClass: MockCheckoutPaymentConnector,
        },
      ],
    });

    service = TestBed.inject(CheckoutPaymentService);
    userIdService = TestBed.inject(UserIdService);
    activeCartService = TestBed.inject(ActiveCartService);
    store = TestBed.inject(Store);

    userIdService['userId'] = userId;
    activeCartService['cart'] = cart;

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CheckoutPaymentService is injected', inject(
    [CheckoutPaymentService],
    (checkoutService: CheckoutPaymentService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get the card types', () => {
    let cardTypes: CardType[];
    service.getCardTypes().subscribe((data) => {
      cardTypes = data;
    });
    expect(cardTypes).toEqual([
      { code: 'visa', name: 'visa' },
      { code: 'masterCard', name: 'masterCard' },
    ]);
  });

  it('should be able to get the payment details', () => {
    store.dispatch(
      new CheckoutActions.SetPaymentDetailsSuccess(paymentDetails)
    );

    let tempPaymentDetails: PaymentDetails;
    service
      .getPaymentDetails()
      .subscribe((data) => {
        tempPaymentDetails = data;
      })
      .unsubscribe();
    expect(tempPaymentDetails).toEqual(paymentDetails);
  });

  it('should be able to create payment details', () => {
    service.createPaymentDetails(paymentDetails);

    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.CreatePaymentDetails({
        userId: userId,
        cartId: cart.code,
        paymentDetails,
      })
    );
  });

  it('should set payment details', () => {
    service.setPaymentDetails(paymentDetails);

    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetPaymentDetails({
        userId: userId,
        cartId: cart.code,
        paymentDetails,
      })
    );
  });

  it('should allow actions for login user or guest user', () => {
    userIdService['userId'] = 'anonymous';
    expect(service['actionAllowed']()).toBeTruthy();
  });
});
