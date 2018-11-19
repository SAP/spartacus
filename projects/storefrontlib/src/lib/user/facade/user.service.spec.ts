import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';

import * as fromStore from '../store';
import { UserService } from './user.service';

describe('UserService', () => {
  const mockSelect = selector => {
    switch (selector) {
      case fromStore.getDetails:
        return () => of({ userId: 'testUser' });
      case fromStore.getAllTitles:
        return () => of(['t1', 't2']);
      case fromStore.getOrderDetails:
        return () => of({ code: 'testOrder' });
      case fromStore.getOrders:
        return () => of([]);
      case fromStore.getOrdersLoaded:
        return () => of(false);
      case fromStore.getPaymentMethods:
        return () => of('mockPaymentMethods');
      case fromStore.getPaymentMethodsLoading:
        return () => of(true);
      case fromStore.getAddresses:
        return () => of(['address1', 'address2']);
      case fromStore.getAddressesLoading:
        return () => of(true);
      case fromStore.getAllDeliveryCountries:
        return () => of(['c1', 'c2']);
      case fromStore.getAllRegions:
        return () => of(['r1', 'r2']);
      default:
        return () => of('mockCountry');
    }
  };

  let service: UserService;
  let store: Store<fromStore.UserState>;

  beforeEach(() => {
    spyOnProperty(ngrxStore, 'select').and.returnValue(mockSelect);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('user', fromStore.getReducers())
      ],
      providers: [UserService]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(UserService);
  });

  it('should UserService is injected', inject(
    [UserService],
    (userService: UserService) => {
      expect(userService).toBeTruthy();
    }
  ));

  it('should be able to get user details', () => {
    let userDetails;
    service.user$.subscribe(data => {
      userDetails = data;
    });
    expect(userDetails).toEqual({ userId: 'testUser' });
  });

  it('should be able to get titles data', () => {
    let titles;
    service.titles$.subscribe(data => {
      titles = data;
    });
    expect(titles).toEqual(['t1', 't2']);
  });

  it('should be able to get user address', () => {
    let addresses;
    service.addresses$.subscribe(data => {
      addresses = data;
    });
    expect(addresses).toEqual(['address1', 'address2']);
  });

  it('should be able to get Address loading flag', () => {
    let flag;
    service.addressesLoading$.subscribe(data => {
      flag = data;
    });
    expect(flag).toEqual(true);
  });

  it('should be able to get user payment methods', () => {
    let paymentMethods;
    service.paymentMethods$.subscribe(data => {
      paymentMethods = data;
    });
    expect(paymentMethods).toEqual('mockPaymentMethods');
  });

  it('should be able to get user payment methods loading flag', () => {
    let flag;
    service.paymentMethodsLoading$.subscribe(data => {
      flag = data;
    });
    expect(flag).toEqual(true);
  });

  it('should be able to get all delivery countries', () => {
    let countries;
    service.allDeliveryCountries$.subscribe(data => {
      countries = data;
    });
    expect(countries).toEqual(['c1', 'c2']);
  });

  it('should be able to get all regions', () => {
    let regions;
    service.allRegions$.subscribe(data => {
      regions = data;
    });
    expect(regions).toEqual(['r1', 'r2']);
  });

  it('should be able to get order details', () => {
    let order;
    service.orderDetails$.subscribe(data => {
      order = data;
    });
    expect(order).toEqual({ code: 'testOrder' });
  });

  it('should be able to get order list', () => {
    let orderList;
    service.orderList$.subscribe(data => {
      orderList = data;
    });
    expect(orderList).toEqual([]);
  });

  it('should be able to get order list loaded flag', () => {
    let orderListLoaded;
    service.orderListLoaded$.subscribe(data => {
      orderListLoaded = data;
    });
    expect(orderListLoaded).toEqual(false);
  });

  it('should be able to load user details', () => {
    service.loadUserDetails('testUserId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserDetails('testUserId')
    );
  });

  it('should be able to load titles', () => {
    service.loadTitles();
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadTitles());
  });

  it('should be able to register user', () => {
    service.registerUser('title', 'firstname', 'lastname', 'email', 'password');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.RegisterUser({
        firstName: 'firstname',
        lastName: 'lastname',
        password: 'password',
        titleCode: 'title',
        uid: 'email'
      })
    );
  });

  it('should be able to get country by isocode', () => {
    let country;
    service.getCountry('isocode').subscribe(data => {
      country = data;
    });
    expect(country).toBe('mockCountry');
  });

  it('should be able to load delivery countries', () => {
    service.loadDeliveryCountries();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadDeliveryCountries()
    );
  });

  it('should be able to load regions based on country isocode', () => {
    service.loadRegions('ca');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadRegions('ca')
    );
  });

  it('should be able to load order details', () => {
    service.loadOrderDetails('userId', 'orderCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadOrderDetails({
        userId: 'userId',
        orderCode: 'orderCode'
      })
    );
  });

  it('should be able to clear order details', () => {
    service.clearOrderDetails();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearOrderDetails()
    );
  });

  it('should be able to load order list data', () => {
    service.loadOrderList('userId', 10, 1, 'byDate');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserOrders({
        userId: 'userId',
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate'
      })
    );
  });

  it('should be able to load user payment methods', () => {
    service.loadPaymentMethods('testUserId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserPaymentMethods('testUserId')
    );
  });

  it('should be able to load user addresses', () => {
    service.loadAddresses('testUserId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserAddresses('testUserId')
    );
  });
});
