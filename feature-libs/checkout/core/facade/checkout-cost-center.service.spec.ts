import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  Cart,
  PROCESS_FEATURE,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import * as fromProcessReducers from '../../../../projects/core/src/process/store/reducers/index';
import { CheckoutActions } from '../store/actions/index';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { CheckoutCostCenterService } from './checkout-cost-center.service';

const userId = 'testUserId';
const cart: Cart = {
  code: 'testCart',
  costCenter: { code: 'testCostCenterId' },
};

class ActiveCartServiceStub implements Partial<ActiveCartService> {
  cart;
  getActiveCartId() {
    return of(cart.code);
  }
  getActive() {
    return of(cart);
  }
}

class UserIdServiceStub implements Partial<UserIdService> {
  takeUserId() {
    return of(userId);
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
        { provide: UserIdService, useClass: UserIdServiceStub },
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
