import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MultiCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import {
  BaseSiteService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  StateWithProcess,
  User,
  UserIdService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import * as fromProcessReducers from 'projects/core/src/process/store/reducers/index';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { MULTI_CART_FEATURE, StateWithMultiCart } from '../store';
import * as fromReducers from '../store/reducers/index';
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

class MultiCartFacadeStub {
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

class MockUserProfileFacade implements Partial<UserProfileFacade> {
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
  let userIdService: UserIdService;
  let userProfileFacade: UserProfileFacade;

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
        { provide: UserProfileFacade, useClass: MockUserProfileFacade },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
      ],
    });

    service = TestBed.inject(SelectiveCartService);
    userIdService = TestBed.inject(UserIdService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    userProfileFacade = TestBed.inject(UserProfileFacade);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return the stream directly if the selectiveCart$ exist', () => {
    service['selectiveCart$'] = of({ code: 'test' });
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(result).toEqual({ code: 'test' });
  });

  it('should load selective cart when it does not exist', () => {
    spyOn(multiCartFacade, 'getCartIdByType').and.returnValue(of(undefined));
    spyOn(multiCartFacade, 'loadCart').and.stub();
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(result).toEqual(undefined);
    expect(multiCartFacade.loadCart).toHaveBeenCalled();
  });

  it('should not load cart when it exists', () => {
    spyOn(multiCartFacade, 'getCart').and.returnValue(of({}));
    spyOn(multiCartFacade, 'loadCart').and.stub();
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(result).toEqual({});
    expect(multiCartFacade.loadCart).not.toHaveBeenCalled();
  });

  it('should not load selective cart for anonymous user', () => {
    spyOn(multiCartFacade, 'getCartIdByType').and.returnValue(of(undefined));
    spyOn(userIdService, 'getUserId').and.returnValue(
      of(OCC_USER_ID_ANONYMOUS)
    );
    spyOn(multiCartFacade, 'loadCart').and.stub();
    service.getCart().subscribe().unsubscribe();
    expect(multiCartFacade.loadCart).not.toHaveBeenCalled();
  });

  it('should not load selective cart for if customerId not exist', () => {
    spyOn(multiCartFacade, 'getCartIdByType').and.returnValue(of(undefined));
    spyOn(userProfileFacade, 'get').and.returnValue(of({}));
    spyOn(multiCartFacade, 'loadCart').and.stub();
    service.getCart().subscribe().unsubscribe();
    expect(multiCartFacade.loadCart).not.toHaveBeenCalled();
  });

  it('should return cart entries', () => {
    spyOn(multiCartFacade, 'getEntries').and.returnValue(of([mockCartEntry]));
    let result;
    service
      .getEntries()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual([mockCartEntry]);
    expect(multiCartFacade['getEntries']).toHaveBeenCalledWith(
      'selectivecartelectronics-spa-test-customer-id'
    );
  });

  it('should add entry one by one ', () => {
    spyOn(multiCartFacade, 'addEntry').and.callThrough();

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
    spyOn(multiCartFacade, 'removeEntry').and.callThrough();

    service.removeEntry({
      entryNumber: 3,
    });
    expect(multiCartFacade['removeEntry']).toHaveBeenCalledWith(
      'current',
      'selectivecartelectronics-spa-test-customer-id',
      3
    );
  });

  it('should call multiCartFacade update entry method with selective cart', () => {
    spyOn(multiCartFacade, 'updateEntry').and.callThrough();

    service.updateEntry(1, 2);
    expect(multiCartFacade['updateEntry']).toHaveBeenCalledWith(
      'current',
      'selectivecartelectronics-spa-test-customer-id',
      1,
      2
    );
  });

  it('should return entry by product code', () => {
    spyOn(multiCartFacade, 'getEntry').and.returnValue(of(mockCartEntry));

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
});
