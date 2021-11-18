import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MultiCartFacade, OrderEntry } from '@spartacus/cart/main/root';
import {
  BaseSiteService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  StateWithProcess,
  User,
  UserIdService,
  UserService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import * as fromProcessReducers from '../../../../../projects/core/src/process/store/reducers/index';
import { MULTI_CART_FEATURE, StateWithMultiCart } from '../store';
import * as fromReducers from '../store/reducers/index';
import { SelectiveCartService } from './selective-cart.service';

const TEST_USER_ID = 'test@test.com';
const TEST_CUSTOMER_ID = '-test-customer-id';
const TEST_CART_ID = 'test-cart-id';
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
    return new BehaviorSubject<string>(OCC_USER_ID_CURRENT).asObservable();
  }
}

class MultiCartFacadeStub {
  loadCart() {}
  deleteCart() {}
  initAddEntryProcess() {}
  getCartEntity() {
    return of({});
  }
  assignEmail() {}
  getEntry() {
    return of({});
  }
  updateEntry() {}
  removeEntry() {}
  getEntries() {}
  createCart() {}
  addEntry() {}
  isStable() {}
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
  let multiCartFacade: MultiCartFacade;
  let store: Store<StateWithMultiCart | StateWithProcess<void>>;

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
        { provide: MultiCartFacade, useClass: MultiCartFacadeStub },
        { provide: UserIdService, useClass: UserIdServiceStub },
        { provide: UserService, useClass: UserServiceStub },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
      ],
    });

    service = TestBed.inject(SelectiveCartService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    store = TestBed.inject(Store);
    service['cartId$'] = new BehaviorSubject<string>(TEST_CART_ID);
    service['cartSelector$'] = of({
      value: { code: TEST_CART_ID },
      loading: false,
      success: false,
      error: false,
    });
    spyOn(store, 'dispatch').and.stub();
  });

  it('should not return cart when loading', () => {
    spyOn(multiCartFacade, 'getCartEntity').and.returnValue(
      of({
        value: { code: TEST_CART_ID },
        loading: true,
        success: false,
        error: false,
      })
    );
    spyOn(multiCartFacade, 'loadCart').and.stub();
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(result).toEqual(undefined);
    expect(multiCartFacade.loadCart).toHaveBeenCalledTimes(0);
  });

  it('should not load cart when loaded', () => {
    spyOn(multiCartFacade, 'getCartEntity').and.returnValue(
      of({
        loading: false,
        success: true,
        error: false,
      })
    );
    spyOn(multiCartFacade, 'loadCart').and.stub();
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(result).toEqual({});
    expect(multiCartFacade.loadCart).toHaveBeenCalledTimes(0);
  });

  it('should not load selective cart for anonymous user', () => {
    spyOn<any>(service, 'load').and.callThrough();
    spyOn(multiCartFacade, 'loadCart').and.stub();
    spyOn(multiCartFacade, 'getCartEntity').and.returnValue(
      of({
        value: { code: TEST_CART_ID },
        loading: false,
        success: false,
        error: false,
      })
    );
    service['userId'] = OCC_USER_ID_ANONYMOUS;
    service.getCart().subscribe().unsubscribe();
    expect(service['load']).toHaveBeenCalledTimes(0);
    expect(multiCartFacade.loadCart).toHaveBeenCalledTimes(0);
  });

  it('should return selective cart', () => {
    spyOn<any>(service, 'load').and.callThrough();
    spyOn(multiCartFacade, 'loadCart').and.stub();
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(service['load']).toHaveBeenCalled();
    expect(result).toEqual({});
    expect(multiCartFacade.loadCart).toHaveBeenCalledWith({
      userId: 'current',
      cartId: 'selectivecartelectronics-spa-test-customer-id',
    });
  });

  it('should return cart entries', () => {
    spyOn(multiCartFacade, 'getEntries').and.returnValue(of([mockCartEntry]));
    service.getCart().subscribe().unsubscribe();
    let result;
    service
      .getEntries()
      .subscribe((val) => (result = val))
      .unsubscribe();

    expect(result).toEqual([mockCartEntry]);
    expect(multiCartFacade['getEntries']).toHaveBeenCalledWith(
      'selectivecartelectronics-spa-test-customer-id'
    );
  });

  it('should load first if cart not loaded before add entry', () => {
    service['cartSelector$'] = of({
      loading: false,
      success: false,
      error: false,
    });
    spyOn(multiCartFacade, 'addEntry').and.callThrough();
    spyOn(multiCartFacade, 'loadCart').and.callThrough();
    service.getCart().subscribe().unsubscribe();

    service.addEntry('productCode', 2);
    expect(multiCartFacade['loadCart']).toHaveBeenCalled();
  });
  it('should add entry one by one ', () => {
    spyOn(multiCartFacade, 'addEntry').and.callThrough();
    service.getCart().subscribe().unsubscribe();

    service.addEntry('productCode1', 2);
    service.addEntry('productCode2', 2);

    expect(multiCartFacade['addEntry']).toHaveBeenCalledTimes(2);
    expect(multiCartFacade['addEntry']).toHaveBeenCalledWith(
      OCC_USER_ID_CURRENT,
      'selectivecartelectronics-spa-test-customer-id',
      'productCode1',
      2
    );
    expect(multiCartFacade['addEntry']).toHaveBeenCalledWith(
      OCC_USER_ID_CURRENT,
      'selectivecartelectronics-spa-test-customer-id',
      'productCode2',
      2
    );
  });

  it('should call multiCartFacade remove entry method with selective cart', () => {
    service['cartId'] = 'cartId';
    service['userId'] = 'userId';
    spyOn(multiCartFacade, 'removeEntry').and.callThrough();

    service.removeEntry({
      entryNumber: 3,
    });
    expect(multiCartFacade['removeEntry']).toHaveBeenCalledWith(
      'userId',
      'cartId',
      3
    );
  });

  it('should call multiCartFacade update entry method with selective cart', () => {
    service['cartId'] = 'cartId';
    service['userId'] = 'userId';
    spyOn(multiCartFacade, 'updateEntry').and.callThrough();

    service.updateEntry(1, 2);
    expect(multiCartFacade['updateEntry']).toHaveBeenCalledWith(
      'userId',
      'cartId',
      1,
      2
    );
  });

  it('should return entry by product code', () => {
    spyOn(multiCartFacade, 'getEntry').and.returnValue(of(mockCartEntry));
    service.getCart().subscribe().unsubscribe();

    let result;
    service
      .getEntry('code123')
      .subscribe((entry) => (result = entry))
      .unsubscribe();

    expect(result).toEqual(mockCartEntry);
    expect(multiCartFacade['getEntry']).toHaveBeenCalledWith(
      'selectivecartelectronics-spa-test-customer-id',
      'code123'
    );
  });

  describe('isStable', () => {
    it('should return false when cartId$ is null', (done) => {
      service['cartId$'].next(null);
      spyOn(multiCartFacade, 'isStable').and.returnValue(of(true));

      service
        .isStable()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe(true);
          done();
        });
    });

    it('should return true when isStable returns true', (done) => {
      spyOn(multiCartFacade, 'isStable').and.returnValue(of(true));

      service
        .isStable()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe(true);
          done();
        });
    });

    it('should return false when isStable returns false', (done) => {
      spyOn(multiCartFacade, 'isStable').and.returnValue(of(false));

      service
        .isStable()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe(false);
          done();
        });
    });
  });

  describe('test protected method', () => {
    it('should return true for undefined', () => {
      const result = service['isEmpty'](undefined);
      expect(result).toBe(true);
    });

    it('should return true for null', () => {
      const result = service['isEmpty'](null);
      expect(result).toBe(true);
    });

    it('should return true for empty object', () => {
      const result = service['isEmpty']({});
      expect(result).toBe(true);
    });

    it('should return false for correct cart', () => {
      const result = service['isEmpty']({ code: 'testCode' });
      expect(result).toBe(false);
    });

    it('should only return true after user change', () => {
      const result = service['isJustLoggedIn']('testUser');
      expect(result).toBe(true);
    });

    it('should do nothing in load if no cart id', () => {
      spyOn(multiCartFacade, 'loadCart').and.callThrough();
      service['cartId$'].next(null);
      service['load']();
      expect(multiCartFacade['loadCart']).toHaveBeenCalledTimes(0);
    });

    it('should do nothing in load if user not logged in ', () => {
      spyOn(multiCartFacade, 'loadCart').and.callThrough();
      spyOn<any>(service, 'isLoggedIn').and.returnValue(false);
      service['load']();
      expect(multiCartFacade['loadCart']).toHaveBeenCalledTimes(0);
    });
  });
});
