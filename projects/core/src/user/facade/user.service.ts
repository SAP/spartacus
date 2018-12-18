import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import {
  Order,
  User,
  PaymentDetails,
  Address,
  Title,
  Country,
  Region,
  OrderHistoryList
} from '../../occ/occ-models/index';

import { Observable } from 'rxjs';

import * as fromStore from '../store/index';

@Injectable()
export class UserService {
  readonly user$: Observable<User> = this.store.pipe(
    select(fromStore.getDetails)
  );

  readonly orderDetails$: Observable<Order> = this.store.pipe(
    select(fromStore.getOrderDetails)
  );

  readonly orderList$: Observable<any> = this.store.pipe(
    select(fromStore.getOrders)
  );
  readonly orderListLoaded$: Observable<boolean> = this.store.pipe(
    select(fromStore.getOrdersLoaded)
  );

  readonly paymentMethods$: Observable<PaymentDetails[]> = this.store.pipe(
    select(fromStore.getPaymentMethods)
  );
  readonly paymentMethodsLoading$: Observable<boolean> = this.store.pipe(
    select(fromStore.getPaymentMethodsLoading)
  );

  readonly addresses$: Observable<Address[]> = this.store.pipe(
    select(fromStore.getAddresses)
  );
  readonly addressesLoading$: Observable<boolean> = this.store.pipe(
    select(fromStore.getAddressesLoading)
  );
  readonly addressesState$: Observable<any> = this.store.pipe(
    select(fromStore.getAddressesState)
  );

  readonly titles$: Observable<Title[]> = this.store.pipe(
    select(fromStore.getAllTitles)
  );

  readonly allDeliveryCountries$: Observable<Country[]> = this.store.pipe(
    select(fromStore.getAllDeliveryCountries)
  );

  readonly allRegions$: Observable<Region[]> = this.store.pipe(
    select(fromStore.getAllRegions)
  );

  constructor(private store: Store<fromStore.UserState>) {}

  /**
   * Returns a user
   */
  get(): Observable<User> {
    return this.store.pipe(select(fromStore.getDetails));
  }

  /**
   * Loads the user's details
   */
  load(userId: string): void {
    this.store.dispatch(new fromStore.LoadUserDetails(userId));
  }

  /**
   * Register a new user
   *
   * @param titleCode a title code
   * @param firstName first name
   * @param lastName last name
   * @param email an email
   * @param password a password
   */
  register(
    titleCode: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): void {
    this.store.dispatch(
      new fromStore.RegisterUser({
        firstName: firstName,
        lastName: lastName,
        password: password,
        titleCode: titleCode,
        uid: email
      })
    );
  }

  /**
   * Returns an order's detail
   */
  getOrderDetails(): Observable<Order> {
    return this.store.pipe(select(fromStore.getOrderDetails));
  }

  /**
   * Retrieves order's details
   *
   * @param userId a user's ID
   * @param orderCode an order code
   */
  loadOrderDetails(userId: string, orderCode: string): void {
    this.store.dispatch(
      new fromStore.LoadOrderDetails({
        userId: userId,
        orderCode: orderCode
      })
    );
  }

  /**
   * Clears order's details
   */
  clearOrderDetails(): void {
    this.store.dispatch(new fromStore.ClearOrderDetails());
  }

  /**
   * Returns order history list
   */
  getOrderHistoryList(): Observable<OrderHistoryList> {
    return this.store.pipe(select(fromStore.getOrders));
  }

  /**
   * Returns a loaded flag for order history list
   */
  getOrderHistoryListLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getOrdersLoaded));
  }

  /**
   * Loads all user's payment methods.
   * @param userId a user ID
   */
  loadPaymentMethods(userId: string): void {
    this.store.dispatch(new fromStore.LoadUserPaymentMethods(userId));
  }

  /**
   * Returns all user's payment methods
   */
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return this.store.pipe(select(fromStore.getPaymentMethods));
  }

  /**
   * Returns a loading flag for payment methods
   */
  getPaymentMethodsLoading(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getPaymentMethodsLoading));
  }

  /**
   * Sets the payment as a default one
   * @param userId a user ID
   * @param paymentMethodId a payment method ID
   */
  setPaymentMethodAsDefault(userId: string, paymentMethodId: string): void {
    this.store.dispatch(
      new fromStore.SetDefaultUserPaymentMethod({
        userId: userId,
        paymentMethodId
      })
    );
  }

  /**
   * Deletes the payment method
   *
   * @param userId a user ID
   * @param paymentMethodId a payment method ID
   */
  deletePaymentMethod(userId: string, paymentMethodId: string): void {
    this.store.dispatch(
      new fromStore.DeleteUserPaymentMethod({
        userId: userId,
        paymentMethodId
      })
    );
  }

  /**
   * Retrieves an order list
   * @param userId a user ID
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  loadOrderList(
    userId: string,
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): void {
    this.store.dispatch(
      new fromStore.LoadUserOrders({
        userId: userId,
        pageSize: pageSize,
        currentPage: currentPage,
        sort: sort
      })
    );
  }

  /**
   * Retrieves user's addresses
   * @param userId a user ID
   */
  loadAddresses(userId: string): void {
    this.store.dispatch(new fromStore.LoadUserAddresses(userId));
  }

  /**
   * Adds user address
   * @param userId a user ID
   * @param address a user address
   */
  addUserAddress(userId: string, address: Address): void {
    this.store.dispatch(
      new fromStore.AddUserAddress({
        userId: userId,
        address: address
      })
    );
  }

  /**
   * Sets user address as default
   * @param userId a user ID
   * @param addressId a user address ID
   */
  setAddressAsDefault(userId: string, addressId: string): void {
    this.store.dispatch(
      new fromStore.UpdateUserAddress({
        userId: userId,
        addressId: addressId,
        address: { defaultAddress: true }
      })
    );
  }

  /**
   * Updates existing user address
   * @param userId a user ID
   * @param addressId a user address ID
   * @param address a user address
   */
  updateUserAddress(userId: string, addressId: string, address: Address): void {
    this.store.dispatch(
      new fromStore.UpdateUserAddress({
        userId: userId,
        addressId: addressId,
        address: address
      })
    );
  }

  /**
   * Deletes existing user address
   * @param userId a user ID
   * @param addressId a user address ID
   */
  deleteUserAddress(userId: string, addressId: string): void {
    this.store.dispatch(
      new fromStore.DeleteUserAddress({
        userId: userId,
        addressId: addressId
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
   * Returns titles
   */
  getTitles(): Observable<Title[]> {
    return this.store.pipe(select(fromStore.getAllTitles));
  }

  /**
   * Retrieves titles
   */
  loadTitles(): void {
    this.store.dispatch(new fromStore.LoadTitles());
  }

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
   * Returns all regions
   */
  getRegions(): Observable<Region[]> {
    return this.store.pipe(select(fromStore.getAllRegions));
  }
}
