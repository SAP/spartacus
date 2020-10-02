import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { CheckoutActions } from '../store/actions/index';
import { AuthService } from '../../auth';
import { ActiveCartService } from '../../cart';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { PROCESS_FEATURE } from '@spartacus/core';
import { CheckoutCostCenterService } from './checkout-cost-center.service';
import * as fromProcessReducers from '../../process/store/reducers/index';
import { Cart } from '../../model/cart.model';

const userId = 'testUserId';
const cart: Cart = {
  code: 'testCart',
  costCenter: { code: 'testCostCenterId' },
};

class ActiveCartServiceStub {
  cart;
  getActiveCartId() {
    return of(cart.code);
  }
  getActive() {
    return of(cart);
  }
}

class AuthServiceStub {
  userId;
  invokeWithUserId(cb) {
    cb(userId);
  }
}
describe('CheckoutCostCenterService', () => {
  let service: CheckoutCostCenterService;
  let store: Store<CheckoutState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckoutReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        CheckoutCostCenterService,
        { provide: ActiveCartService, useClass: ActiveCartServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    });

    service = TestBed.inject(
      CheckoutCostCenterService as Type<CheckoutCostCenterService>
    );
    store = TestBed.inject(Store as Type<Store<CheckoutState>>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CheckoutCostCenterService is injected', inject(
    [CheckoutCostCenterService],
    (checkoutService: CheckoutCostCenterService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get cost center if data exist', () => {
    store.dispatch(new CheckoutActions.SetCostCenterSuccess('testCostCenter'));

    let cc: string;
    service.getCostCenter().subscribe((data) => {
      cc = data;
    });
    expect(cc).toEqual('testCostCenter');
  });

  it('should be able to get cost center from cart if data not exist', () => {
    service.getCostCenter().subscribe();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetCostCenterSuccess('testCostCenterId')
    );
  });

  it('should be able to set cost center to cart', () => {
    service.setCostCenter('testCostCenterId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetCostCenter({
        userId: userId,
        cartId: cart.code,
        costCenterId: 'testCostCenterId',
      })
    );
  });
});
