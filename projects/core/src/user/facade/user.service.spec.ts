import { TestBed, inject } from '@angular/core/testing';

import { StoreModule, Store } from '@ngrx/store';

import * as fromStore from '../store/index';
import { USER_FEATURE } from '../store/user-state';
import {
  Address,
  Order,
  User,
  PaymentDetailsList,
  Region,
  OrderHistoryList,
  PaymentDetails,
  Title,
  Country
} from '../../occ/occ-models/index';

import { UserService } from './user.service';
import { UserRegisterFormData } from '../model/user.model';

describe('UserService', () => {
  let service: UserService;
  let store: Store<fromStore.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStore.getReducers())
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
    store.dispatch(
      new fromStore.LoadUserDetailsSuccess({ uid: 'testUser' } as User)
    );

    let userDetails: User;
    service
      .get()
      .subscribe(data => {
        userDetails = data;
      })
      .unsubscribe();
    expect(userDetails).toEqual({ uid: 'testUser' });
  });

  it('should be able to load user details', () => {
    service.load('testUserId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserDetails('testUserId')
    );
  });

  it('should be able to register user', () => {
    const userRegisterFormData: UserRegisterFormData = {
      titleCode: 'Mr.',
      firstName: 'firstName',
      lastName: 'lastName',
      uid: 'uid',
      password: 'password'
    };
    service.register(userRegisterFormData);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.RegisterUser(userRegisterFormData)
    );
  });

  it('should be able to get order details', () => {
    store.dispatch(
      new fromStore.LoadOrderDetailsSuccess({ code: 'testOrder' })
    );

    let order: Order;
    service
      .getOrderDetails()
      .subscribe(data => {
        order = data;
      })
      .unsubscribe();
    expect(order).toEqual({ code: 'testOrder' });
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

  it('should be able to get order history list', () => {
    store.dispatch(
      new fromStore.LoadUserOrdersSuccess({
        orders: [],
        pagination: {},
        sorts: []
      })
    );

    let orderList: OrderHistoryList;
    service
      .getOrderHistoryList('', 1)
      .subscribe(data => {
        orderList = data;
      })
      .unsubscribe();
    expect(orderList).toEqual({
      orders: [],
      pagination: {},
      sorts: []
    });
  });

  it('should be able to get order list loaded flag', () => {
    store.dispatch(new fromStore.LoadUserOrdersSuccess({}));

    let orderListLoaded: boolean;
    service
      .getOrderHistoryListLoaded()
      .subscribe(data => {
        orderListLoaded = data;
      })
      .unsubscribe();
    expect(orderListLoaded).toEqual(true);
  });

  it('should be able to load user payment methods', () => {
    service.loadPaymentMethods('testUserId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserPaymentMethods('testUserId')
    );
  });

  it('should be able to get user payment methods', () => {
    const paymentsList: PaymentDetailsList = {
      payments: [{ id: 'method1' }, { id: 'method2' }]
    };
    store.dispatch(
      new fromStore.LoadUserPaymentMethodsSuccess(paymentsList.payments)
    );

    let paymentMethods: PaymentDetails[];
    service
      .getPaymentMethods()
      .subscribe(data => {
        paymentMethods = data;
      })
      .unsubscribe();
    expect(paymentMethods).toEqual([{ id: 'method1' }, { id: 'method2' }]);
  });

  it('should be able to get user payment methods loading flag', () => {
    store.dispatch(new fromStore.LoadUserPaymentMethods('testUserId'));

    let flag: boolean;
    service
      .getPaymentMethodsLoading()
      .subscribe(data => {
        flag = data;
      })
      .unsubscribe();
    expect(flag).toEqual(true);
  });

  it('should dispatch proper action for setPaymentMethodAsDefault', () => {
    service.setPaymentMethodAsDefault('userId', 'paymentMethodId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.SetDefaultUserPaymentMethod({
        userId: 'userId',
        paymentMethodId: 'paymentMethodId'
      })
    );
  });

  it('should dispatch proper action for deleteUserPaymentMethod', () => {
    service.deletePaymentMethod('userId', 'paymentMethodId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.DeleteUserPaymentMethod({
        userId: 'userId',
        paymentMethodId: 'paymentMethodId'
      })
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

  it('should be able to load user addresses', () => {
    service.loadAddresses('testUserId');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserAddresses('testUserId')
    );
  });

  it('should be able to get user addresses', () => {
    const mockUserAddresses: Address[] = [
      { id: 'address1' },
      { id: 'address2' }
    ];
    store.dispatch(new fromStore.LoadUserAddressesSuccess(mockUserAddresses));

    let addresses: Address[];
    service
      .getAddresses()
      .subscribe(data => {
        addresses = data;
      })
      .unsubscribe();
    expect(addresses).toEqual([{ id: 'address1' }, { id: 'address2' }]);
  });

  it('should be able to get titles data', () => {
    store.dispatch(
      new fromStore.LoadTitlesSuccess([
        { code: 't1', name: 't1' },
        { code: 't2', name: 't2' }
      ])
    );
    let titles: Title[];
    service
      .getTitles()
      .subscribe(data => {
        titles = data;
      })
      .unsubscribe();
    expect(titles).toEqual([
      { code: 't1', name: 't1' },
      { code: 't2', name: 't2' }
    ]);
  });

  it('should be able to load titles', () => {
    service.loadTitles();
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadTitles());
  });

  it('should be able to load delivery countries', () => {
    service.loadDeliveryCountries();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadDeliveryCountries()
    );
  });

  it('should be able to get all delivery countries', () => {
    store.dispatch(
      new fromStore.LoadDeliveryCountriesSuccess([
        { isocode: 'c1', name: 'n1' },
        { isocode: 'c2', name: 'n2' }
      ])
    );
    let countries: Country[];
    service
      .getDeliveryCountries()
      .subscribe(data => {
        countries = data;
      })
      .unsubscribe();
    expect(countries).toEqual([
      { isocode: 'c1', name: 'n1' },
      { isocode: 'c2', name: 'n2' }
    ]);
  });

  it('should be able to get country by isocode', () => {
    store.dispatch(
      new fromStore.LoadDeliveryCountriesSuccess([
        { isocode: 'c1', name: 'n1' },
        { isocode: 'c2', name: 'n2' }
      ])
    );

    let country: Country;
    service
      .getCountry('c1')
      .subscribe(data => {
        country = data;
      })
      .unsubscribe();
    expect(country).toEqual({ isocode: 'c1', name: 'n1' });
  });

  it('should be able to load regions based on country isocode', () => {
    service.loadRegions('ca');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadRegions('ca')
    );
  });

  it('should be able to add user address', () => {
    const mockAddress: Address = {
      firstName: 'John',
      lastName: 'Doe',
      titleCode: 'mr',
      line1: 'Toyosaki 2 create on cart',
      line2: 'line2',
      town: 'town',
      region: { isocode: 'JP-27' },
      postalCode: 'zip',
      country: { isocode: 'JP' }
    };

    service.addUserAddress('testUserId', mockAddress);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.AddUserAddress({
        userId: 'testUserId',
        address: mockAddress
      })
    );
  });

  it('should be able to update user address', () => {
    const mockAddressUpdate = {
      town: 'Test Town'
    };

    service.updateUserAddress('testUserId', '123', mockAddressUpdate);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.UpdateUserAddress({
        userId: 'testUserId',
        addressId: '123',
        address: mockAddressUpdate
      })
    );
  });

  it('should be able to delete user address', () => {
    service.deleteUserAddress('testUserId', '123');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.DeleteUserAddress({
        userId: 'testUserId',
        addressId: '123'
      })
    );
  });

  it('should be able to set address as default address', () => {
    service.setAddressAsDefault('testUserId', '123');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.UpdateUserAddress({
        userId: 'testUserId',
        addressId: '123',
        address: {
          defaultAddress: true
        }
      })
    );
  });

  it('should be able to get all regions', () => {
    const regionsList: Region[] = [{ name: 'r1' }, { name: 'r2' }];
    store.dispatch(new fromStore.LoadRegionsSuccess(regionsList));

    let regions: Region[];
    service
      .getRegions()
      .subscribe(data => {
        regions = data;
      })
      .unsubscribe();
    expect(regions).toEqual([{ name: 'r1' }, { name: 'r2' }]);
  });

  it('should be able to clear order list', () => {
    service.clearOrderList();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearUserOrders()
    );
  });

  it('should be able to reset password', () => {
    service.resetPassword('test token', 'test password');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ResetPassword({
        token: 'test token',
        password: 'test password'
      })
    );
  });

  it('should be able to request a forgot password email', () => {
    service.requestForgotPasswordEmail('test@test.com');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ForgotPasswordEmailRequest('test@test.com')
    );
  });

  it('should be able to return whether user password is succesfully reset', () => {
    store.dispatch(new fromStore.ResetPasswordSuccess());

    let isResst: boolean;
    service
      .isPasswordReset()
      .subscribe(data => {
        isResst = data;
      })
      .unsubscribe();
    expect(isResst).toBeTruthy();
  });
});
