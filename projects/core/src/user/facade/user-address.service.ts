import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { Address, Country, Region } from '../../model/address.model';
import { USERID_CURRENT } from '../../occ/utils/occ-constants';
import * as fromProcessStore from '../../process/store/process-state';
import * as fromStore from '../store/index';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  constructor(
    protected store: Store<
      fromStore.StateWithUser | fromProcessStore.StateWithProcess<void>
    >
  ) {}

  /**
   * Retrieves user's addresses
   */
  loadAddresses(): void {
    this.store.dispatch(new fromStore.LoadUserAddresses(USERID_CURRENT));
  }

  /**
   * Adds user address
   * @param address a user address
   */
  addUserAddress(address: Address): void {
    this.store.dispatch(
      new fromStore.AddUserAddress({
        userId: USERID_CURRENT,
        address: address,
      })
    );
  }

  /**
   * Sets user address as default
   * @param addressId a user address ID
   */
  setAddressAsDefault(addressId: string): void {
    this.store.dispatch(
      new fromStore.UpdateUserAddress({
        userId: USERID_CURRENT,
        addressId: addressId,
        address: { defaultAddress: true },
      })
    );
  }

  /**
   * Updates existing user address
   * @param addressId a user address ID
   * @param address a user address
   */
  updateUserAddress(addressId: string, address: Address): void {
    this.store.dispatch(
      new fromStore.UpdateUserAddress({
        userId: USERID_CURRENT,
        addressId: addressId,
        address: address,
      })
    );
  }

  /**
   * Deletes existing user address
   * @param addressId a user address ID
   */
  deleteUserAddress(addressId: string): void {
    this.store.dispatch(
      new fromStore.DeleteUserAddress({
        userId: USERID_CURRENT,
        addressId: addressId,
      })
    );
  }

  /**
   * Returns addresses
   */
  getAddresses(): Observable<Address[]> {
    return this.store.pipe(select(fromStore.getAddresses));
  }

  /**
   * Returns a loading flag for addresses
   */
  getAddressesLoading(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getAddressesLoading));
  }

  /**
   * Retrieves delivery countries
   */
  /**
   * Retrieves delivery countries
   */
  loadDeliveryCountries(): void {
    this.store.dispatch(new fromStore.LoadDeliveryCountries());
  }

  /**
   * Returns all delivery countries
   */
  getDeliveryCountries(): Observable<Country[]> {
    return this.store.pipe(select(fromStore.getAllDeliveryCountries));
  }

  /**
   * Returns a country based on the provided `isocode`
   * @param isocode an isocode for a country
   */
  getCountry(isocode: string): Observable<Country> {
    return this.store.pipe(select(fromStore.countrySelectorFactory(isocode)));
  }

  /**
   * Retrieves regions for specified country by `countryIsoCode`
   * @param countryIsoCode
   */
  loadRegions(countryIsoCode: string): void {
    this.store.dispatch(new fromStore.LoadRegions(countryIsoCode));
  }

  /**
   * Clear regions in store - useful when changing country
   */
  clearRegions(): void {
    this.store.dispatch(new fromStore.ClearRegions());
  }

  /**
   * Returns all regions
   */
  getRegions(countryIsoCode: string): Observable<Region[]> {
    return combineLatest(
      this.store.pipe(select(fromStore.getAllRegions)),
      this.store.pipe(select(fromStore.getRegionsCountry)),
      this.store.pipe(select(fromStore.getRegionsLoading)),
      this.store.pipe(select(fromStore.getRegionsLoaded))
    ).pipe(
      debounceTime(1), // fix for inconsistent result on store mutations
      map(([regions, country, loading, loaded]) => {
        if (!countryIsoCode) {
          this.clearRegions();
          return [];
        } else if (loading && !loaded) {
          // don't interrupt loading
          return [];
        } else if (!loading && countryIsoCode !== country) {
          // country changed - clear store and load new regions
          this.clearRegions();
          this.loadRegions(countryIsoCode);
          return [];
        }
        return regions;
      })
    );
  }

  /**
   * Returns all billing countries
   */
  getAllBillingCountries(): Observable<Country[]> {
    return this.store.pipe(select(fromStore.getAllBillingCountries));
  }

  /**
   * Retrieves billing countries
   */
  loadBillingCountries(): void {
    this.store.dispatch(new fromStore.LoadBillingCountries());
  }
}
