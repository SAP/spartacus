import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import { EMPTY, of } from 'rxjs';

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
      case fromStore.countrySelectorFactory('isocode'):
        return () => of('mockCountry');
      default:
        return () => EMPTY;
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
    service.user$.subscribe(userDetails => {
      expect(userDetails).toEqual({ userId: 'testUser' });
    });
  });

  it('should be able to get titles data', () => {
    service.titles$.subscribe(titles => {
      expect(titles).toEqual(['t1', 't2']);
    });
  });

  it('should be able to get order details', () => {
    service.orderDetails$.subscribe(order => {
      expect(order).toEqual({ code: 'testOrder' });
    });
  });

  it('should be able to get order list', () => {
    service.orderList$.subscribe(orderList => {
      expect(orderList).toEqual([]);
    });
  });

  it('should be able to get order list loaded flag', () => {
    service.orderListLoaded$.subscribe(orderListLoaded => {
      expect(orderListLoaded).toEqual(false);
    });
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
    service.getCountry('isocode').subscribe(country => {
      expect(country).toBe('mockCountry');
    });
  });

  it('should be able to load delivery countries', () => {
    service.loadDeliveryCountries();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadDeliveryCountries()
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

  /*it('should be able to get countrie by isocode', () => {
    service.getCountry('isocode');
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadTitles());
  });*/

  /*it('should load currencies and set active currency when service is constructed', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadCurrencies());
    let activeCurr = sessionStorage.getItem('currency');
    if (!activeCurr) {
      activeCurr = defaultSiteContextConfig.site.currency;
    }
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.SetActiveCurrency(activeCurr)
    );
  });

  it('should be able to get currencies', () => {
    service.currencies$.subscribe(results => {
      expect(results).toEqual(mockCurrencies);
    });
  });

  it('should be able to get active currencies', () => {
    service.activeCurrency$.subscribe(results => {
      expect(results).toEqual(mockActiveCurr);
    });
  });

  describe('set activeCurrency(isocode)', () => {
    it('should be able to set active currency', () => {
      service.activeCurrency = 'USD';
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SetActiveCurrency('USD')
      );
    });
  });*/
});
