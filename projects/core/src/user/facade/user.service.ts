import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Address, Country, Region } from '../../model/address.model';
import { PaymentDetails } from '../../model/cart.model';
import { ConsentTemplate } from '../../model/consent.model';
import { Title, User, UserSignUp } from '../../model/misc.model';
import { Order, OrderHistoryList } from '../../model/order.model';
import { USERID_CURRENT } from '../../occ/utils/occ-constants';
import * as fromProcessStore from '../../process/store/process-state';
import {
  getProcessErrorFactory,
  getProcessLoadingFactory,
  getProcessSuccessFactory,
} from '../../process/store/selectors/process.selectors';
import * as fromStore from '../store/index';
import {
  GIVE_CONSENT_PROCESS_ID,
  UPDATE_EMAIL_PROCESS_ID,
  UPDATE_USER_DETAILS_PROCESS_ID,
  WITHDRAW_CONSENT_PROCESS_ID,
} from '../store/user-state';

@Injectable()
export class UserService {
  constructor(
    protected store: Store<
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
  register(userRegisterFormData: UserSignUp): void {
    this.store.dispatch(new fromStore.RegisterUser(userRegisterFormData));
  }

  /**
   * Remove user account, that's also called close user's account
   */
  remove(): void {
    this.store.dispatch(new fromStore.RemoveUser(USERID_CURRENT));
  }

  /**
   * Returns the remove user loading flag
   */
  getRemoveUserResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(fromStore.REMOVE_USER_PROCESS_ID))
    );
  }

  /**
   * Returns the remove user failure outcome.
   */
  getRemoveUserResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(fromStore.REMOVE_USER_PROCESS_ID))
    );
  }

  /**
   * Returns the remove user process success outcome.
   */
  getRemoveUserResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(fromStore.REMOVE_USER_PROCESS_ID))
    );
  }

  /**
   * Resets the remove user process state. The state needs to be reset after the process
   * concludes, regardless if it's a success or an error
   */
  resetRemoveUserProcessState(): void {
    this.store.dispatch(new fromStore.RemoveUserReset());
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
   * Return whether user's password is successfully reset
   */
  isPasswordReset(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getResetPassword));
  }

  /**
   * Updates the user's details
   * @param userDetails to be updated
   */
  updatePersonalDetails(userDetails: User): void {
    this.store.dispatch(
      new fromStore.UpdateUserDetails({ username: USERID_CURRENT, userDetails })
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
   * Updates the user's email
   * @param uid to be updated
   */
  updateEmail(uid: string, password: string, newUid: string): void {
    this.store.dispatch(
      new fromStore.UpdateEmailAction({ uid, password, newUid })
    );
  }

  /**
   * Returns the update user's email success flag
   */
  getUpdateEmailResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's email error flag
   */
  getUpdateEmailResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's email loading flag
   */
  getUpdateEmailResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Resets the update user's email processing state
   */
  resetUpdateEmailResultState(): void {
    this.store.dispatch(new fromStore.ResetUpdateEmailAction());
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
   * Returns the update password loading flag
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

  /**
   * Retrieves all consents
   * @param userId user ID for which to retrieve consents
   */
  loadConsents(userId: string): void {
    this.store.dispatch(new fromStore.LoadUserConsents(userId));
  }

  /**
   * Returns all consents
   */
  getConsents(): Observable<ConsentTemplate[]> {
    return this.store.pipe(select(fromStore.getConsentsValue));
  }

  /**
   * Returns the consents loading flag
   */
  getConsentsResultLoading(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getConsentsLoading));
  }

  /**
   * Returns the consents success flag
   */
  getConsentsResultSuccess(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getConsentsSuccess));
  }

  /**
   * Returns the consents error flag
   */
  getConsentsResultError(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getConsentsError));
  }

  /**
   * Resets the processing state for consent retrieval
   */
  resetConsentsProcessState(): void {
    this.store.dispatch(new fromStore.ResetLoadUserConsents());
  }

  /**
   * Give consent for specified consent template ID and version.
   * @param userId and ID of a user giving the consent
   * @param consentTemplateId a template ID for which to give a consent
   * @param consentTemplateVersion a template version for which to give a consent
   */
  giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): void {
    this.store.dispatch(
      new fromStore.GiveUserConsent({
        userId,
        consentTemplateId,
        consentTemplateVersion,
      })
    );
  }

  /**
   * Returns the give consent process loading flag
   */
  getGiveConsentResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(GIVE_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Returns the give consent process success flag
   */
  getGiveConsentResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(GIVE_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Returns the give consent process error flag
   */
  getGiveConsentResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(GIVE_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Resents the give consent process flags
   */
  resetGiveConsentProcessState(): void {
    return this.store.dispatch(new fromStore.ResetGiveUserConsentProcess());
  }

  /**
   * Withdraw consent for the given `consentCode`
   * @param userId a user ID for which to withdraw the consent
   * @param consentCode for which to withdraw the consent
   */
  withdrawConsent(userId: string, consentCode: string): void {
    this.store.dispatch(
      new fromStore.WithdrawUserConsent({ userId, consentCode })
    );
  }

  /**
   * Returns the withdraw consent process loading flag
   */
  getWithdrawConsentResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessLoadingFactory(WITHDRAW_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Returns the withdraw consent process success flag
   */
  getWithdrawConsentResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessSuccessFactory(WITHDRAW_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Returns the withdraw consent process error flag
   */
  getWithdrawConsentResultError(): Observable<boolean> {
    return this.store.pipe(
      select(getProcessErrorFactory(WITHDRAW_CONSENT_PROCESS_ID))
    );
  }

  /**
   * Resets the process flags for withdraw consent
   */
  resetWithdrawConsentProcessState(): void {
    return this.store.dispatch(new fromStore.ResetWithdrawUserConsentProcess());
  }
}
