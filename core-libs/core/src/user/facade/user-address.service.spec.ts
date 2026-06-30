import { vi } from 'vitest';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, Observable, of } from 'rxjs';
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

class MockUserIdService implements Partial<UserIdService> {
  public takeUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

const mockAddressVerificationResult: AddressValidation = {
  decision: 'ACCEPT',
};

class MockUserAddressConnector implements Partial<UserAddressConnector> {
  verify = vi.fn().mockReturnValue(
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
    vi.spyOn(store, 'dispatch');
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

    let addresses: Address[] | undefined;
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
    let countries: Country[] | undefined;
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

    let country: Country | undefined | null;
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
    const mockAddress2: Address = {
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

    service.addUserAddress(mockAddress2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new UserActions.AddUserAddress({
        userId: OCC_USER_ID_CURRENT,
        address: mockAddress2,
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

    it('should be able to get all regions', async () => {
      store.dispatch(
        new UserActions.LoadRegionsSuccess({ entities: regionsList, country })
      );
      const regions = await firstValueFrom(service.getRegions(country));
      expect(regions).toEqual(regionsList);
    });

    it('should clear regions on empty country', async () => {
      store.dispatch(
        new UserActions.LoadRegionsSuccess({
          entities: regionsList,
          country,
        })
      );
      vi.spyOn(service, 'clearRegions').mockImplementation(() => {});
      const regions = await firstValueFrom(service.getRegions(''));
      expect(regions).toEqual([]);
      expect(service.clearRegions).toHaveBeenCalled();
    });

    it('should return empty array while loading', async () => {
      store.dispatch(new UserActions.LoadRegions(country));
      vi.spyOn(service, 'clearRegions').mockImplementation(() => {});
      vi.spyOn(service, 'loadRegions').mockImplementation(() => {});
      const regions = await firstValueFrom(service.getRegions(country));
      expect(regions).toEqual([]);
      expect(service.clearRegions).not.toHaveBeenCalled();
      expect(service.loadRegions).not.toHaveBeenCalled();
    });

    it('should return empty array and invoke clear and load when changing country', async () => {
      vi.spyOn(service, 'clearRegions').mockImplementation(() => {});
      vi.spyOn(service, 'loadRegions').mockImplementation(() => {});
      const country2 = 'AB';
      store.dispatch(
        new UserActions.LoadRegionsSuccess({
          entities: regionsList,
          country,
        })
      );
      const regions = await firstValueFrom(service.getRegions(country2));
      expect(regions).toEqual([]);
      expect(service.clearRegions).toHaveBeenCalled();
      expect(service.loadRegions).toHaveBeenCalledWith(country2);
    });

    it('should return already loaded results on another request', async () => {
      store.dispatch(
        new UserActions.LoadRegionsSuccess({
          entities: regionsList,
          country,
        })
      );
      vi.spyOn(service, 'clearRegions').mockImplementation(() => {});
      vi.spyOn(service, 'loadRegions').mockImplementation(() => {});
      const regions = await firstValueFrom(service.getRegions(country));
      expect(regions).toEqual(regionsList);
      expect(service.clearRegions).not.toHaveBeenCalled();
      expect(service.loadRegions).not.toHaveBeenCalled();
    });

    it('should call clear regions', () => {
      service.clearRegions();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.ClearRegions()
      );
    });
  });

  describe('verifyAddress', () => {
    it('should call the corresponding command', async () => {
      const result = await firstValueFrom(service.verifyAddress(mockAddress));
      expect(result).toBe(mockAddressVerificationResult);
      expect(userAddressConnector.verify).toHaveBeenCalledWith(
        OCC_USER_ID_CURRENT,
        mockAddress
      );
    });
  });

  describe('getDefaultAddress', () => {
    it('should return the default address if present', async () => {
      const addresses: Address[] = [
        { id: '1', defaultAddress: false },
        { id: '2', defaultAddress: true },
        { id: '3', defaultAddress: false },
      ];
      vi.spyOn(service, 'getAddresses').mockReturnValue(of(addresses));
      const result = await firstValueFrom(service.getDefaultAddress());
      expect(result).toEqual(addresses[1]);
    });
    it('should return undefined if no default address is present', async () => {
      const addresses: Address[] = [
        { id: '1', defaultAddress: false },
        { id: '2', defaultAddress: false },
      ];
      vi.spyOn(service, 'getAddresses').mockReturnValue(of(addresses));
      const result = await firstValueFrom(service.getDefaultAddress());
      expect(result).toBeUndefined();
    });

    it('should return undefined if addresses array is empty', async () => {
      vi.spyOn(service, 'getAddresses').mockReturnValue(of([]));
      const result = await firstValueFrom(service.getDefaultAddress());
      expect(result).toBeUndefined();
    });
  });
});
