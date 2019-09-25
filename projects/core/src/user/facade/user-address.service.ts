import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { Address, Country, Region } from '../../model/address.model';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-state';

@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  constructor(
    store: Store<StateWithUser | StateWithProcess<void>>,
    // tslint:disable-next-line:unified-signatures
    authService: AuthService
  );
  /**
   * @deprecated since version 1.3
   *  Use constructor(store: Store<StateWithUser | StateWithProcess<void>>,
   *  authService: AuthService) instead
   */
  constructor(store: Store<StateWithUser | StateWithProcess<void>>);
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected authService?: AuthService
  ) {}

  /**
   * Retrieves user's addresses
   */
  loadAddresses(): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(new UserActions.LoadUserAddresses(occUserId))
      )
      .unsubscribe();
  }

  /**
   * Adds user address
   * @param address a user address
   */
  addUserAddress(address: Address): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.AddUserAddress({
            userId: occUserId,
            address: address,
          })
        )
      )
      .unsubscribe();
  }

  /**
   * Sets user address as default
   * @param addressId a user address ID
   */
  setAddressAsDefault(addressId: string): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.UpdateUserAddress({
            userId: occUserId,
            addressId: addressId,
            address: { defaultAddress: true },
          })
        )
      )
      .unsubscribe();
  }

  /**
   * Updates existing user address
   * @param addressId a user address ID
   * @param address a user address
   */
  updateUserAddress(addressId: string, address: Address): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.UpdateUserAddress({
            userId: occUserId,
            addressId: addressId,
            address: address,
          })
        )
      )
      .unsubscribe();
  }

  /**
   * Deletes existing user address
   * @param addressId a user address ID
   */
  deleteUserAddress(addressId: string): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new UserActions.DeleteUserAddress({
            userId: occUserId,
            addressId: addressId,
          })
        )
      )
      .unsubscribe();
  }

  /**
   * Returns addresses
   */
  getAddresses(): Observable<Address[]> {
    return this.store.pipe(select(UsersSelectors.getAddresses));
  }

  /**
   * Returns a loading flag for addresses
   */
  getAddressesLoading(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getAddressesLoading));
  }

  getAddressesLoadedSuccess(): Observable<boolean> {
    return this.store.pipe(select(UsersSelectors.getAddressesLoadedSuccess));
  }
  /**
   * Retrieves delivery countries
   */
  loadDeliveryCountries(): void {
    this.store.dispatch(new UserActions.LoadDeliveryCountries());
  }

  /**
   * Returns all delivery countries
   */
  getDeliveryCountries(): Observable<Country[]> {
    return this.store.pipe(select(UsersSelectors.getAllDeliveryCountries));
  }

  /**
   * Returns a country based on the provided `isocode`
   * @param isocode an isocode for a country
   */
  getCountry(isocode: string): Observable<Country> {
    return this.store.pipe(
      select(UsersSelectors.countrySelectorFactory(isocode))
    );
  }

  /**
   * Retrieves regions for specified country by `countryIsoCode`
   * @param countryIsoCode
   */
  loadRegions(countryIsoCode: string): void {
    this.store.dispatch(new UserActions.LoadRegions(countryIsoCode));
  }

  /**
   * Clear regions in store - useful when changing country
   */
  clearRegions(): void {
    this.store.dispatch(new UserActions.ClearRegions());
  }

  /**
   * Returns all regions
   */
  getRegions(countryIsoCode: string): Observable<Region[]> {
    return this.store.pipe(
      select(UsersSelectors.getRegionsDataAndLoading),
      map(({ regions, country, loading, loaded }) => {
        if (!countryIsoCode && (loading || loaded)) {
          this.clearRegions();
          return [];
        } else if (loading && !loaded) {
          // don't interrupt loading
          return [];
        } else if (!loading && countryIsoCode !== country && countryIsoCode) {
          // country changed - clear store and load new regions
          if (country) {
            this.clearRegions();
          }
          this.loadRegions(countryIsoCode);
          return [];
        }
        return regions;
      })
    );
  }
}
