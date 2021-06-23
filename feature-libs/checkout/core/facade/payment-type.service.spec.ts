import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CheckFacade, CheckoutDetails } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Cart,
  PaymentType,
  PROCESS_FEATURE,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { of, Subscription } from 'rxjs';
import * as fromProcessReducers from '../../../../projects/core/src/process/store/reducers/index';
import { PaymentTypeConnector } from '../connectors';
import { CheckoutState } from '../store/checkout-state';
import * as fromCheckoutReducers from '../store/reducers/index';
import { PaymentTypeService } from './payment-type.service';
import createSpy = jasmine.createSpy;

const userId = 'testUserId';
const cart = {
  code: 'testCart',
};

class MockPaymentTypeConnector implements Partial<PaymentTypeConnector> {
  getPaymentTypes() {
    return of([
      { code: 'account', displayName: 'account' },
      { code: 'card', displayName: 'masterCard' },
    ]);
  }
  setPaymentType = createSpy().and.returnValue(of(undefined));
}

class MockCheckFacade implements Partial<CheckFacade> {
  getCheckoutDetails() {
    return of({
      data: {
        paymentType: {
          code: 'ACCOUNT',
        },
        purchaseOrderNumber: 'testNumber',
      },
    } as QueryState<CheckoutDetails>);
  }
}

class ActiveCartServiceStub implements Partial<ActiveCartService> {
  cart: Cart;
  getActiveCartId() {
    return of(cart.code);
  }
  getActive() {
    return of(cart);
  }
}

class UserIdServiceStub implements Partial<UserIdService> {
  userId: string;
  invokeWithUserId(cb: (id: string) => {}) {
    cb(userId);
    return new Subscription();
  }
}
describe('PaymentTypeService', () => {
  let service: PaymentTypeService;
  let store: Store<CheckoutState>;
  let connector: PaymentTypeConnector;

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
        PaymentTypeService,
        { provide: ActiveCartService, useClass: ActiveCartServiceStub },
        { provide: UserIdService, useClass: UserIdServiceStub },
        {
          provide: PaymentTypeConnector,
          useClass: MockPaymentTypeConnector,
        },
        {
          provide: CheckFacade,
          useClass: MockCheckFacade,
        },
      ],
    });

    service = TestBed.inject(PaymentTypeService);
    store = TestBed.inject(Store);
    connector = TestBed.inject(PaymentTypeConnector);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should PaymentTypeService is injected', inject(
    [PaymentTypeService],
    (checkoutService: PaymentTypeService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get the payment types if data exist', () => {
    let paymentTypes: PaymentType[] = [];
    service.getPaymentTypes().subscribe((data) => {
      paymentTypes = data;
    });
    expect(paymentTypes).toEqual([
      { code: 'account', displayName: 'account' },
      { code: 'card', displayName: 'masterCard' },
    ]);
  });

  it('should be able to set selected payment type to cart', () => {
    service.setPaymentType('typeCode', 'poNumber');
    expect(connector.setPaymentType).toHaveBeenCalledWith(
      userId,
      cart.code,
      'typeCode',
      'poNumber'
    );
  });

  it('should be able to get selected payment type if data exist', () => {
    let selected: string | undefined;
    service.getSelectedPaymentType().subscribe((data) => {
      selected = data;
    });
    expect(selected).toEqual('ACCOUNT');
  });

  it('should be able to get whether the selected payment type is ACCOUNT', () => {
    let isAccount = false;
    service.isAccountPayment().subscribe((data) => (isAccount = data));
    expect(isAccount).toEqual(true);
  });

  it('should be able to get po number if data exist', () => {
    let po: string | undefined;
    service.getPoNumber().subscribe((data) => {
      po = data;
    });
    expect(po).toEqual('testNumber');
  });
});
