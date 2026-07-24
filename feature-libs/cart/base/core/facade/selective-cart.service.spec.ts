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
import * as fromProcessReducers from '../../../../../core-libs/core/src/process/store/reducers/index';
import { Observable, of, firstValueFrom } from 'rxjs';
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

    vi.spyOn(store, 'dispatch');
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
    vi.spyOn(multiCartFacade, 'getCartIdByType').mockReturnValue(of(undefined));
    vi.spyOn(multiCartFacade, 'loadCart').mockImplementation(() => {});
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(result).toEqual(undefined);
    expect(multiCartFacade.loadCart).toHaveBeenCalled();
  });

  it('should not load cart when it exists', () => {
    vi.spyOn(multiCartFacade, 'getCart').mockReturnValue(of({}));
    vi.spyOn(multiCartFacade, 'loadCart').mockImplementation(() => {});
    let result;
    service
      .getCart()
      .subscribe((val) => (result = val))
      .unsubscribe();
    expect(result).toEqual({});
    expect(multiCartFacade.loadCart).not.toHaveBeenCalled();
  });

  it('should not load selective cart for anonymous user', () => {
    vi.spyOn(multiCartFacade, 'getCartIdByType').mockReturnValue(of(undefined));
    vi.spyOn(userIdService, 'getUserId').mockReturnValue(
      of(OCC_USER_ID_ANONYMOUS)
    );
    vi.spyOn(multiCartFacade, 'loadCart').mockImplementation(() => {});
    service.getCart().subscribe().unsubscribe();
    expect(multiCartFacade.loadCart).not.toHaveBeenCalled();
  });

  it('should not load selective cart for if customerId not exist', () => {
    vi.spyOn(multiCartFacade, 'getCartIdByType').mockReturnValue(of(undefined));
    vi.spyOn(userProfileFacade, 'get').mockReturnValue(of({}));
    vi.spyOn(multiCartFacade, 'loadCart').mockImplementation(() => {});
    service.getCart().subscribe().unsubscribe();
    expect(multiCartFacade.loadCart).not.toHaveBeenCalled();
  });

  it('should return cart entries', () => {
    vi.spyOn(multiCartFacade, 'getEntries').mockReturnValue(of([mockCartEntry]));
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
    vi.spyOn(multiCartFacade, 'addEntry');

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
    vi.spyOn(multiCartFacade, 'removeEntry');

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
    vi.spyOn(multiCartFacade, 'updateEntry');

    service.updateEntry(1, 2);
    expect(multiCartFacade['updateEntry']).toHaveBeenCalledWith(
      'current',
      'selectivecartelectronics-spa-test-customer-id',
      1,
      2
    );
  });

  it('should return entry by product code', () => {
    vi.spyOn(multiCartFacade, 'getEntry').mockReturnValue(of(mockCartEntry));

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
    it('should return true when isStable returns true', async () => {
      vi.spyOn(multiCartFacade, 'isStable').mockReturnValue(of(true));

      const val = await firstValueFrom(service.isStable());
      expect(val).toBe(true);
    });

    it('should return false when isStable returns false', async () => {
      vi.spyOn(multiCartFacade, 'isStable').mockReturnValue(of(false));

      const val = await firstValueFrom(service.isStable());
      expect(val).toBe(false);
    });
  });
});
