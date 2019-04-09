import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  Address,
  Country,
  Order,
  OrderHistoryList,
  PaymentDetails,
  Region,
  Title,
  User,
} from '../../occ/occ-models/index';
import * as fromProcessStore from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import { UserRegisterFormData } from '../model/user.model';
import * as fromStore from '../store/index';
import { UPDATE_USER_DETAILS_PROCESS_ID } from '../store/user-state';

@Injectable()
export class UserService {
  constructor(
    private store: Store<
      fromStore.StateWithUser | fromProcessStore.StateWithProcess<void>
    >
  ) {}

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
   * @param submitFormData as UserRegisterFormData
   */
  register(userRegisterFormData: UserRegisterFormData): void {
    this.store.dispatch(new fromStore.RegisterUser(userRegisterFormData));
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
        orderCode: orderCode,
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
  getOrderHistoryList(
    userId: string,
    pageSize: number
  ): Observable<OrderHistoryList> {
    return this.store.pipe(
      select(fromStore.getOrdersState),
      tap(orderListState => {
        const attemptedLoad =
          orderListState.loading ||
          orderListState.success ||
          orderListState.error;
        if (!attemptedLoad && !!userId) {
          this.loadOrderList(userId, pageSize);
        }
      }),
      map(orderListState => orderListState.value)
    );
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
        paymentMethodId,
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
        paymentMethodId,
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
        sort: sort,
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
        address: address,
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
        address: { defaultAddress: true },
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
        address: address,
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

  /**
   * Cleaning order list
   */
  clearOrderList(): void {
    this.store.dispatch(new fromStore.ClearUserOrders());
  }

  /**
   * Updates the user's details
   * @param userDetails to be updated
   */
  updatePersonalDetails(username: string, userDetails: User): void {
    this.store.dispatch(
      new fromStore.UpdateUserDetails({ username, userDetails })
    );
  }

  /**
   * Returns the update user's personal details loading flag
   */
  getUpdatePersonalDetailsResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(UPDATE_USER_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's personal details error flag
   */
  getUpdatePersonalDetailsResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(UPDATE_USER_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's personal details success flag
   */
  getUpdatePersonalDetailsResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(UPDATE_USER_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Resets the update user details processing state
   */
  resetUpdatePersonalDetailsProcessingState(): void {
    this.store.dispatch(new fromStore.ResetUpdateUserDetails());
  }

  /**
   * Reset new password.  Part of the forgot password flow.
   * @param token
   * @param password
   */
  resetPassword(token: string, password: string): void {
    this.store.dispatch(new fromStore.ResetPassword({ token, password }));
  }

  /*
   * Request an email to reset a forgotten password.
   */
  requestForgotPasswordEmail(userEmailAddress: string): void {
    this.store.dispatch(
      new fromStore.ForgotPasswordEmailRequest(userEmailAddress)
    );
  }

  /**
   * Return whether user's password is successfully reset.  Part of the forgot password flow.
   */
  isPasswordReset(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getResetPassword));
  }

  /**
   * Updates the password for an authenticated user
   * @param userId the user id for which the password will be updated
   * @param oldPassword the current password that will be changed
   * @param newPassword the new password
   */
  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): void {
    this.store.dispatch(
      new fromStore.UpdatePassword({ userId, oldPassword, newPassword })
    );
  }

  /**
   * Returns the update passwrod loading flag
   */
  getUpdatePasswordResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(fromStore.UPDATE_PASSWORD_PROCESS_ID))
    );
  }

  /**
   * Returns the update password failure outcome.
   */
  getUpdatePasswordResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(fromStore.UPDATE_PASSWORD_PROCESS_ID))
    );
  }

  /**
   * Returns the update password process success outcome.
   */
  getUpdatePasswordResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(fromStore.UPDATE_PASSWORD_PROCESS_ID))
    );
  }

  /**
   * Resets the update password process state. The state needs to be reset after the process
   * concludes, regardless if it's a success or an error
   */
  resetUpdatePasswordProcessState(): void {
    this.store.dispatch(new fromStore.UpdatePasswordReset());
  }
}
