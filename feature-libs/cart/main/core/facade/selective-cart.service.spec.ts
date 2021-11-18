import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OrderEntry } from '@spartacus/cart/main/root';
import {
  BaseSiteService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  StateWithProcess,
  User,
  UserIdService,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fromProcessReducers from '../../../../../projects/core/src/process/store/reducers/index';
import { MULTI_CART_FEATURE, StateWithMultiCart } from '../store';
import * as fromReducers from '../store/reducers/index';
import { MultiCartService } from './multi-cart.service';
import { SelectiveCartService } from './selective-cart.service';

const TEST_USER_ID = 'test@test.com';
const TEST_CUSTOMER_ID = '-test-customer-id';
const TEST_PRODUCT_CODE = 'test-product-code';

const testUser: User = {
  uid: TEST_USER_ID,
  customerId: TEST_CUSTOMER_ID,
};

const mockCartEntry: OrderEntry = {
  entryNumber: 0,
  product: { code: TEST_PRODUCT_CODE },
  quantity: 1,
};

class UserIdServiceStub implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MultiCartServiceStub {
  loadCart() {}
  getCart() {}
  getEntry() {
    return of({});
  }
  updateEntry() {}
  removeEntry() {}
  getEntries() {}

  addEntry() {}
  isStable() {}
  getCartIdByType(): Observable<string> {
    return of('selectivecartelectronics-spa-test-customer-id');
  }
}

class UserServiceStub implements Partial<UserService> {
  get(): Observable<User> {
    return of(testUser);
  }
}

class BaseSiteServiceStub implements Partial<BaseSiteService> {
  getActive(): Observable<string> {
    return of('electronics-spa');
  }
}

describe('Selective Cart Service', () => {
  let service: SelectiveCartService;
  let multiCartService: MultiCartService;
  let store: Store<StateWithMultiCart | StateWithProcess<void>>;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          MULTI_CART_FEATURE,
          fromReducers.getMultiCartReducers()
        ),
        StoreModule.forFeature('process', fromProcessReducers.getReducers()),
      ],
      providers: [
        SelectiveCartService,
        { provide: MultiCartService, useClass: MultiCartServiceStub },
        { provide: UserIdService, useClass: UserIdServiceStub },
        { provide: UserService, useClass: UserServiceStub },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
      ],
    });

    service = TestBed.inject(SelectiveCartService);
    userIdService = TestBed.inject(UserIdService);
    multiCartService = TestBed.inject(MultiCartService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should load selective cart when it does not exist', () => {
    spyOn(multiCartService, 'getCartIdByType').and.returnValue(of(undefined));
    spyOn(multiCartService, 'loadCart').and.stub();
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(result).toEqual(undefined);
    expect(multiCartService.loadCart).toHaveBeenCalled();
  });

  it('should not load cart when it exists', () => {
    spyOn(multiCartService, 'getCart').and.returnValue(of({}));
    spyOn(multiCartService, 'loadCart').and.stub();
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(result).toEqual({});
    expect(multiCartService.loadCart).not.toHaveBeenCalled();
  });

  it('should not load selective cart for anonymous user', () => {
    spyOn(multiCartService, 'getCartIdByType').and.returnValue(of(undefined));
    spyOn(userIdService, 'getUserId').and.returnValue(
      of(OCC_USER_ID_ANONYMOUS)
    );
    spyOn(multiCartService, 'loadCart').and.stub();
    service.getCart().subscribe().unsubscribe();
    expect(multiCartService.loadCart).not.toHaveBeenCalled();
  });

  it('should return cart entries', () => {
    spyOn(multiCartService, 'getEntries').and.returnValue(of([mockCartEntry]));
    let result;
    service
      .getEntries()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual([mockCartEntry]);
    expect(multiCartService['getEntries']).toHaveBeenCalledWith(
      'selectivecartelectronics-spa-test-customer-id'
    );
  });

  it('should add entry one by one ', () => {
    spyOn(multiCartService, 'addEntry').and.callThrough();

    service.addEntry('productCode1', 2);
    service.addEntry('productCode2', 2);

    expect(multiCartService['addEntry']).toHaveBeenCalledTimes(2);
    expect(multiCartService['addEntry']).toHaveBeenCalledWith(
      OCC_USER_ID_CURRENT,
      'selectivecartelectronics-spa-test-customer-id',
      'productCode1',
      2
    );
    expect(multiCartService['addEntry']).toHaveBeenCalledWith(
      OCC_USER_ID_CURRENT,
      'selectivecartelectronics-spa-test-customer-id',
      'productCode2',
      2
    );
  });

  it('should call multiCartService remove entry method with selective cart', () => {
    spyOn(multiCartService, 'removeEntry').and.callThrough();

    service.removeEntry({
      entryNumber: 3,
    });
    expect(multiCartService['removeEntry']).toHaveBeenCalledWith(
      'current',
      'selectivecartelectronics-spa-test-customer-id',
      3
    );
  });

  it('should call multiCartService update entry method with selective cart', () => {
    spyOn(multiCartService, 'updateEntry').and.callThrough();

    service.updateEntry(1, 2);
    expect(multiCartService['updateEntry']).toHaveBeenCalledWith(
      'current',
      'selectivecartelectronics-spa-test-customer-id',
      1,
      2
    );
  });

  it('should return entry by product code', () => {
    spyOn(multiCartService, 'getEntry').and.returnValue(of(mockCartEntry));

    let result;
    service
      .getEntry('code123')
      .subscribe((entry) => (result = entry))
      .unsubscribe();

    expect(result).toEqual(mockCartEntry);
    expect(multiCartService['getEntry']).toHaveBeenCalledWith(
      'selectivecartelectronics-spa-test-customer-id',
      'code123'
    );
  });

  describe('isStable', () => {
    it('should return true when isStable returns true', (done) => {
      spyOn(multiCartService, 'isStable').and.returnValue(of(true));

      service
        .isStable()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe(true);
          done();
        });
    });

    it('should return false when isStable returns false', (done) => {
      spyOn(multiCartService, 'isStable').and.returnValue(of(false));

      service
        .isStable()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe(false);
          done();
        });
    });
  });
});
