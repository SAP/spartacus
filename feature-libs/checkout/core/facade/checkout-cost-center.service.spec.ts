import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CheckFacade, CheckoutDetails } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Cart,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutCostCenterConnector } from '../connectors';
import * as fromCheckoutReducers from '../store/reducers/index';
import { CheckoutCostCenterService } from './checkout-cost-center.service';

const userId = 'testUserId';
const cart: Cart = {
  code: 'testCart',
  costCenter: { code: 'testCostCenterId' },
};

class MockCheckoutCostCenterConnector
  implements Partial<CheckoutCostCenterConnector> {
  setCostCenter() {
    return of({});
  }
}

class MockCheckFacade implements Partial<CheckFacade> {
  getCheckoutDetails() {
    return of({
      data: {
        costCenter: {
          code: 'testCodeCenter',
        },
      },
    } as QueryState<CheckoutDetails>);
  }
}

class ActiveCartServiceStub implements Partial<ActiveCartService> {
  cart: Cart;
  getActiveCartId() {
    return of(cart.code);
  }
}

class UserIdServiceStub implements Partial<UserIdService> {
  userId: string | undefined;
  takeUserId() {
    return of(userId);
  }
}
describe('CheckoutCostCenterService', () => {
  let service: CheckoutCostCenterService;
  let connector: CheckoutCostCenterConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckoutReducers.getReducers()),
      ],
      providers: [
        CheckoutCostCenterService,
        { provide: ActiveCartService, useClass: ActiveCartServiceStub },
        { provide: UserIdService, useClass: UserIdServiceStub },
        {
          provide: CheckoutCostCenterConnector,
          useClass: MockCheckoutCostCenterConnector,
        },
        {
          provide: CheckFacade,
          useClass: MockCheckFacade,
        },
      ],
    });

    service = TestBed.inject(CheckoutCostCenterService);
    connector = TestBed.inject(CheckoutCostCenterConnector);
  });

  it('should CheckoutCostCenterService is injected', inject(
    [CheckoutCostCenterService],
    (checkoutService: CheckoutCostCenterService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get cost center if data exist', (done) => {
    service
      .getCostCenter()
      .pipe(take(1))
      .subscribe((data) => {
        expect(data).toEqual({ code: 'testCodeCenter' });
        done();
      });
  });

  it('should be able to set cost center to cart', (done) => {
    spyOn(connector, 'setCostCenter').and.callThrough();

    service.setCostCenter('testCostCenterId').subscribe(() => {
      expect(connector.setCostCenter).toHaveBeenCalledWith(
        userId,
        cart.code,
        'testCostCenterId'
      );
      done();
    });
  });
});
