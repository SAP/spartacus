import { inject, TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  Address,
  Cart,
  PROCESS_FEATURE,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import * as fromProcessReducers from '../../../../projects/core/src/process/store/reducers/index';
import { CheckoutDeliveryConnector } from '../connectors/delivery/checkout-delivery.connector';
import { CheckoutActions } from '../store/actions/index';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { CheckoutDeliveryService } from './checkout-delivery.service';

describe('CheckoutDeliveryService', () => {
  let service: CheckoutDeliveryService;
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

  const address: Address = {
    firstName: 'John',
    lastName: 'Doe',
    titleCode: 'mr',
    line1: 'Toyosaki 2 create on cart',
    town: 'Montreal',
    postalCode: 'L6M1P9',
    country: { isocode: 'CA' },
  };

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
          provideMockActions(() => actions$),
        ],
      });

      service = TestBed.inject(CheckoutDeliveryService);
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

    it('should be able to get the code of selected delivery mode', () => {
      store.dispatch(new CheckoutActions.SetDeliveryModeSuccess('mode1'));

      let selectedModeCode: string;
      service.getSelectedDeliveryModeCode().subscribe((data) => {
        selectedModeCode = data;
      });
      expect(selectedModeCode).toEqual('mode1');
    });

    it('should be able to get the delivery address', () => {
      store.dispatch(new CheckoutActions.SetDeliveryAddressSuccess(address));

      let deliveryAddress: Address;
      service
        .getDeliveryAddress()
        .subscribe((data) => {
          deliveryAddress = data;
        })
        .unsubscribe();
      expect(deliveryAddress).toEqual(address);
    });

    it('should be able to clear checkout delivery address', () => {
      service.clearCheckoutDeliveryAddress();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.ClearCheckoutDeliveryAddress({
          userId: userId,
          cartId: cart.code,
        })
      );
    });

    it('should be able to clear checkout delivery mode', () => {
      service.clearCheckoutDeliveryMode();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.ClearCheckoutDeliveryMode({
          userId: userId,
          cartId: cart.code,
        })
      );
    });

    it('should be able to clear checkout delivery details', () => {
      service.clearCheckoutDeliveryDetails();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.ClearCheckoutDeliveryAddress({
          userId: userId,
          cartId: cart.code,
        })
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.ClearCheckoutDeliveryMode({
          userId: userId,
          cartId: cart.code,
        })
      );
    });
  });
});
