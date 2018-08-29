import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../routing/store';
import * as fromAuthStore from '../../auth/store';

import { OrderConfirmationPageGuard } from './order-confirmation-page.guard';
import { CheckoutService } from '../services';
import { of } from 'rxjs';

class MockCheckoutService {
  orderDetails: any;
}

const mockUserValidToken = {
  access_token: 'Mock Access Token'
};

describe(`OrderConfirmationPageGuard`, () => {
  let router: Router;
  let guard: OrderConfirmationPageGuard;
  let store: Store<fromAuthStore.AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderConfirmationPageGuard,
        { provide: CheckoutService, useClass: MockCheckoutService }
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          auth: combineReducers(fromAuthStore.getReducers())
        })
      ]
    });

    router = TestBed.get(Router);
    guard = TestBed.get(OrderConfirmationPageGuard);
    store = TestBed.get(Store);

    spyOn(router, 'navigate').and.callThrough();
  });

  describe(`when a user is logged in `, () => {
    describe(`and there are NO order details present`, () => {
      it(`should return false and navigate to 'my-account/orders'`, () => {
        spyOn<any>(guard, 'orderDetailsPresent').and.returnValue(false);
        spyOn(store, 'select').and.returnValue(of(mockUserValidToken));

        guard.canActivate().subscribe(result => {
          expect(result).toEqual(false);
          expect(router.navigate).toHaveBeenCalledWith(['/my-account/orders']);
        });
      });
    });

    describe(`and there are order details present`, () => {
      it(`should return true`, () => {
        spyOn<any>(guard, 'orderDetailsPresent').and.returnValue(true);
        spyOn(store, 'select').and.returnValue(of(mockUserValidToken));

        guard.canActivate().subscribe(result => {
          expect(result).toEqual(true);
          expect(router.navigate).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe(`when a user is NOT logged in `, () => {
    describe(`and there are NO order details present`, () => {
      it(`should return false and navigate to home`, () => {
        spyOn<any>(guard, 'orderDetailsPresent').and.returnValue(false);
        spyOn(store, 'select').and.returnValue(of(undefined));

        guard.canActivate().subscribe(result => {
          expect(result).toEqual(false);
          expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
      });
    });
  });
});
