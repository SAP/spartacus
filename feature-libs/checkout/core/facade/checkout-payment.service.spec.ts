import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  CardType,
  Cart,
  QueryService,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CheckoutPaymentConnector } from '../connectors/payment/checkout-payment.connector';
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
    let cardTypes: CardType[] | undefined;
    service.getCardTypes().subscribe((data) => {
      cardTypes = data;
    });
    expect(cardTypes).toEqual([
      { code: 'visa', name: 'visa' },
      { code: 'masterCard', name: 'masterCard' },
    ]);
  });
});
