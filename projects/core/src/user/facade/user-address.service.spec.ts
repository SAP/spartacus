import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import {
  Address,
  AddressValidation,
  Country,
  Region,
} from '../../model/address.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { UserAddressConnector } from '../connectors/address/user-address.connector';
import { UserActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import { UserAddressService } from './user-address.service';
import createSpy = jasmine.createSpy;

class MockUserIdService implements Partial<UserIdService> {
  public takeUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

const mockAddressVerificationResult: AddressValidation = {
  decision: 'ACCEPT',
};

class MockUserAddressConnector implements Partial<UserAddressConnector> {
  verify = createSpy('MockUserAddressConnector.verify Spy').and.returnValue(
    of(mockAddressVerificationResult)
  );
}

const mockAddress: Address = {
  id: 'mock address id',
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
};

describe('UserAddressService', () => {
  let service: UserAddressService;
  let store: Store<StateWithUser>;
  let userAddressConnector: UserAddressConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStoreReducers.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        UserAddressService,
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: UserAddressConnector, useClass: MockUserAddressConnector },
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.inject(UserAddressService);
    userAddressConnector = TestBed.inject(UserAddressConnector);
  });

  it('should UserAddressService is injected', inject(
    [UserAddressService],
    (userAddressService: UserAddressService) => {
      expect(userAddressService).toBeTruthy();
    }
  ));

  it('should be able to load user addresses', () => {
    service.loadAddresses();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadUserAddresses(OCC_USER_ID_CURRENT)
    );
  });

  it('should be able to get user addresses', () => {
    const mockUserAddresses: Address[] = [
      { id: 'address1' },
      { id: 'address2' },
    ];
    store.dispatch(new UserActions.LoadUserAddressesSuccess(mockUserAddresses));

    let addresses: Address[];
    service
      .getAddresses()
      .subscribe((data) => {
        addresses = data;
      })
      .unsubscribe();
    expect(addresses).toEqual([{ id: 'address1' }, { id: 'address2' }]);
  });

  it('should be able to load delivery countries', () => {
    service.loadDeliveryCountries();
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadDeliveryCountries()
    );
  });

  it('should be able to get all delivery countries', () => {
    store.dispatch(
      new UserActions.LoadDeliveryCountriesSuccess([
        { isocode: 'c1', name: 'n1' },
        { isocode: 'c2', name: 'n2' },
      ])
    );
    let countries: Country[];
    service
      .getDeliveryCountries()
      .subscribe((data) => {
        countries = data;
      })
      .unsubscribe();
    expect(countries).toEqual([
      { isocode: 'c1', name: 'n1' },
      { isocode: 'c2', name: 'n2' },
    ]);
  });

  it('should be able to get country by isocode', () => {
    store.dispatch(
      new UserActions.LoadDeliveryCountriesSuccess([
        { isocode: 'c1', name: 'n1' },
        { isocode: 'c2', name: 'n2' },
      ])
    );

    let country: Country;
    service
      .getCountry('c1')
      .subscribe((data) => {
        country = data;
      })
      .unsubscribe();
    expect(country).toEqual({ isocode: 'c1', name: 'n1' });
  });

  it('should be able to load regions based on country isocode', () => {
    service.loadRegions('ca');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.LoadRegions('ca')
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
      country: { isocode: 'JP' },
    };

    service.addUserAddress(mockAddress);
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.AddUserAddress({
        userId: OCC_USER_ID_CURRENT,
        address: mockAddress,
      })
    );
  });

  it('should be able to update user address', () => {
    const mockAddressUpdate = {
      town: 'Test Town',
    };

    service.updateUserAddress('123', mockAddressUpdate);
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.UpdateUserAddress({
        userId: OCC_USER_ID_CURRENT,
        addressId: '123',
        address: mockAddressUpdate,
      })
    );
  });

  it('should be able to delete user address', () => {
    service.deleteUserAddress('123');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.DeleteUserAddress({
        userId: OCC_USER_ID_CURRENT,
        addressId: '123',
      })
    );
  });

  it('should be able to set address as default address', () => {
    service.setAddressAsDefault('123');
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.UpdateUserAddress({
        userId: OCC_USER_ID_CURRENT,
        addressId: '123',
        address: {
          defaultAddress: true,
        },
      })
    );
  });

  it('should get address loading status', () => {
    const results: boolean[] = [];
    service
      .getAddressesLoading()
      .pipe(take(2))
      .subscribe((loadingStatus) => {
        results.push(loadingStatus);
      });
    store.dispatch(new UserActions.LoadUserAddresses(OCC_USER_ID_CURRENT));
    expect(results).toEqual([false, true]);
  });

  it('should indicate successful loading', () => {
    const results: boolean[] = [];
    service
      .getAddressesLoadedSuccess()
      .pipe(take(2))
      .subscribe((loadedStatus) => {
        results.push(loadedStatus);
      });
    store.dispatch(new UserActions.LoadUserAddressesSuccess([]));
    expect(results).toEqual([false, true]);
  });

  describe('getRegions', () => {
    const regionsList: Region[] = [{ name: 'r1' }, { name: 'r2' }];
    const country = 'CA';

    it('should be able to get all regions', (done) => {
      let regions: Region[];
      store.dispatch(
        new UserActions.LoadRegionsSuccess({ entities: regionsList, country })
      );
      service.getRegions(country).subscribe((data) => {
        regions = data;
        expect(regions).toEqual(regionsList);
        done();
      });
    });

    it('should clear regions on empty country', (done) => {
      let regions: Region[];
      store.dispatch(
        new UserActions.LoadRegionsSuccess({
          entities: regionsList,
          country,
        })
      );
      spyOn(service, 'clearRegions').and.stub();
      service.getRegions(null).subscribe((data) => {
        regions = data;
        expect(regions).toEqual([]);
        expect(service.clearRegions).toHaveBeenCalled();
        done();
      });
    });

    it('should return empty array while loading', (done) => {
      let regions: Region[];
      store.dispatch(new UserActions.LoadRegions(country));
      spyOn(service, 'clearRegions').and.stub();
      spyOn(service, 'loadRegions').and.stub();
      service.getRegions(country).subscribe((data) => {
        regions = data;
        expect(regions).toEqual([]);
        expect(service.clearRegions).not.toHaveBeenCalled();
        expect(service.loadRegions).not.toHaveBeenCalled();

        done();
      });
    });

    it('should return empty array and invoke clear and load when changing country', (done) => {
      let regions: Region[];
      spyOn(service, 'clearRegions').and.stub();
      spyOn(service, 'loadRegions').and.stub();
      const country2 = 'AB';
      store.dispatch(
        new UserActions.LoadRegionsSuccess({
          entities: regionsList,
          country,
        })
      );
      service.getRegions(country2).subscribe((data) => {
        regions = data;
        expect(regions).toEqual([]);
        expect(service.clearRegions).toHaveBeenCalled();
        expect(service.loadRegions).toHaveBeenCalledWith(country2);
        done();
      });
    });

    it('should return already loaded results on another request', (done) => {
      let regions: Region[];
      store.dispatch(
        new UserActions.LoadRegionsSuccess({
          entities: regionsList,
          country,
        })
      );
      spyOn(service, 'clearRegions').and.stub();
      spyOn(service, 'loadRegions').and.stub();
      service.getRegions(country).subscribe((data) => {
        regions = data;
        expect(regions).toEqual(regionsList);
        expect(service.clearRegions).not.toHaveBeenCalled();
        expect(service.loadRegions).not.toHaveBeenCalled();
        done();
      });
    });

    it('should call clear regions', () => {
      service.clearRegions();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.ClearRegions()
      );
    });
  });

  describe('verifyAddress', () => {
    it('should call the corresponding command', (done) => {
      service.verifyAddress(mockAddress).subscribe((result) => {
        expect(result).toBe(mockAddressVerificationResult);
        expect(userAddressConnector.verify).toHaveBeenCalledWith(
          OCC_USER_ID_CURRENT,
          mockAddress
        );
        done();
      });
    });
  });
});
