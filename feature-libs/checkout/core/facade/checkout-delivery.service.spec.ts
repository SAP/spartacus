import { inject, TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  Cart,
  PROCESS_FEATURE,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import * as fromProcessReducers from '../../../../projects/core/src/process/store/reducers/index';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutDeliveryConnector } from '../connectors/delivery/checkout-delivery.connector';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { CheckoutDeliveryService } from './checkout-delivery.service';

describe('CheckoutDeliveryService', () => {
  let activeCartService: ActiveCartService;
  let userIdService: UserIdService;
  let store: Store<CheckoutState>;
  const userId = 'testUserId';
  const cart: Cart = { code: 'testCartId', guid: 'testGuid' };

  class ActiveCartServiceStub implements Partial<ActiveCartService> {
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

  class UserIdServiceStub implements Partial<UserIdService> {
    userId;
    getUserId() {
      return of(userId);
    }
    takeUserId() {
      return of(userId);
    }
  }

  class MockCheckoutDeliveryConnector
    implements Partial<CheckoutDeliveryConnector>
  {
    setAddress() {
      return of(true);
    }
  }

  class MockCheckoutConnector implements Partial<CheckoutConnector> {}

  describe('based on store', () => {
    let actions$: Observable<Action>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          StoreModule.forFeature(
            'checkout',
            fromCheckoutReducers.getReducers()
          ),
          StoreModule.forFeature(
            PROCESS_FEATURE,
            fromProcessReducers.getReducers()
          ),
        ],
        providers: [
          CheckoutDeliveryService,
          { provide: UserIdService, useClass: UserIdServiceStub },
          { provide: ActiveCartService, useClass: ActiveCartServiceStub },
          {
            provide: CheckoutDeliveryConnector,
            useClass: MockCheckoutDeliveryConnector,
          },
          {
            provide: CheckoutConnector,
            useClass: MockCheckoutConnector,
          },
          provideMockActions(() => actions$),
        ],
      });

      activeCartService = TestBed.inject(ActiveCartService);
      userIdService = TestBed.inject(UserIdService);
      store = TestBed.inject(Store);
      actions$ = TestBed.inject(Actions);

      userIdService['userId'] = userId;
      activeCartService['cart'] = cart;

      spyOn(store, 'dispatch').and.callThrough();
    });

    it('should CheckoutDeliveryService is injected', inject(
      [CheckoutDeliveryService],
      (checkoutService: CheckoutDeliveryService) => {
        expect(checkoutService).toBeTruthy();
      }
    ));
  });
});
