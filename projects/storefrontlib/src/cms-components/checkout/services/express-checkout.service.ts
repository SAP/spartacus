import { Injectable } from '@angular/core';
import { combineLatest, of, Observable } from 'rxjs';
import { filter, map, switchMap, tap, debounceTime } from 'rxjs/operators';

import {
  Address,
  CheckoutDeliveryService,
  UserAddressService,
  UserPaymentService,
  PaymentDetails,
  DeliveryMode,
  CheckoutPaymentService,
  LoaderState,
} from '@spartacus/core';
import { CheckoutConfigService } from './checkout-config.service';
import { CheckoutDetailsService } from './checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class ExpressCheckoutService {
  private shippingAddressSet$: Observable<boolean>;
  private deliveryModeSet$: Observable<boolean>;
  private paymentMethodSet$: Observable<boolean>;

  constructor(
    protected userAddressService: UserAddressService,
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected checkoutDetailsService: CheckoutDetailsService,
    protected checkoutConfigService: CheckoutConfigService
  ) {
    this.setShippingAddress();
    this.setDeliveryMode();
    this.setPaymentMethod();
  }

  protected setShippingAddress() {
    this.shippingAddressSet$ = combineLatest([
      this.userAddressService.getAddresses(),
      this.userAddressService.getAddressesLoadedSuccess(),
      this.checkoutDeliveryService.getSetDeliveryAddressProcess(),
    ]).pipe(
      debounceTime(0),
      tap(
        ([, addressesLoadedSuccess]: [
          Address[],
          boolean,
          LoaderState<void>
        ]) => {
          if (!addressesLoadedSuccess) {
            this.userAddressService.loadAddresses();
          }
        }
      ),
      filter(
        ([, addressesLoadedSuccess]: [Address[], boolean, LoaderState<void>]) =>
          addressesLoadedSuccess
      ),
      switchMap(
        ([addresses, , setDeliveryAddressProcess]: [
          Address[],
          boolean,
          LoaderState<void>
        ]) => {
          const defaultAddress =
            addresses.find(address => address.defaultAddress) || addresses[0];
          if (defaultAddress && Object.keys(defaultAddress).length) {
            if (
              !(
                setDeliveryAddressProcess.success ||
                setDeliveryAddressProcess.error ||
                setDeliveryAddressProcess.loading
              )
            ) {
              this.checkoutDeliveryService.setDeliveryAddress(defaultAddress);
            }
            return of(setDeliveryAddressProcess).pipe(
              filter((setDeliveryAddressProcessState: LoaderState<void>) => {
                return (
                  (setDeliveryAddressProcessState.success ||
                    setDeliveryAddressProcessState.error) &&
                  !setDeliveryAddressProcessState.loading
                );
              }),
              switchMap((setDeliveryAddressProcessState: LoaderState<void>) => {
                if (setDeliveryAddressProcessState.success) {
                  return this.checkoutDetailsService.getDeliveryAddress();
                }
                return of(false);
              }),
              map(data => Boolean(data && Object.keys(data).length))
            );
          }
          return of(false);
        }
      )
    );
  }

  protected setPaymentMethod() {
    this.paymentMethodSet$ = combineLatest([
      this.userPaymentService.getPaymentMethods(),
      this.userPaymentService.getPaymentMethodsLoadedSuccess(),
      this.checkoutPaymentService.getSetPaymentDetailsResultProcess(),
    ]).pipe(
      debounceTime(0),
      tap(
        ([, paymentMethodsLoadedSuccess]: [
          PaymentDetails[],
          boolean,
          LoaderState<void>
        ]) => {
          if (!paymentMethodsLoadedSuccess) {
            this.userPaymentService.loadPaymentMethods();
          }
        }
      ),
      filter(
        ([, success]: [PaymentDetails[], boolean, LoaderState<void>]) => success
      ),
      switchMap(
        ([payments, , setPaymentDetailsProcess]: [
          PaymentDetails[],
          boolean,
          LoaderState<void>
        ]) => {
          const defaultPayment =
            payments.find(address => address.defaultPayment) || payments[0];
          if (defaultPayment && Object.keys(defaultPayment).length) {
            if (
              !(
                setPaymentDetailsProcess.success ||
                setPaymentDetailsProcess.error ||
                setPaymentDetailsProcess.loading
              )
            ) {
              this.checkoutPaymentService.setPaymentDetails(defaultPayment);
            }
            return of(setPaymentDetailsProcess).pipe(
              filter((setPaymentDetailsProcessState: LoaderState<void>) => {
                return (
                  (setPaymentDetailsProcessState.success ||
                    setPaymentDetailsProcessState.error) &&
                  !setPaymentDetailsProcessState.loading
                );
              }),
              switchMap((setPaymentDetailsProcessState: LoaderState<void>) => {
                if (setPaymentDetailsProcessState.success) {
                  return this.checkoutDetailsService.getPaymentDetails();
                }
                return of(false);
              }),
              map(data => Boolean(data && Object.keys(data).length))
            );
          }
          return of(false);
        }
      )
    );
  }

  protected setDeliveryMode() {
    this.deliveryModeSet$ = combineLatest([
      this.shippingAddressSet$,
      this.checkoutDeliveryService.getSupportedDeliveryModes(),
      this.checkoutDeliveryService.getSetDeliveryModeProcess(),
      this.checkoutDeliveryService.getLoadSupportedDeliveryModeProcess(),
    ]).pipe(
      debounceTime(0),
      switchMap(
        ([
          addressSet,
          supportedDeliveryModes,
          setDeliveryModeStatusFlag,
          loadSupportedDeliveryModeStatus,
        ]: [boolean, DeliveryMode[], LoaderState<void>, LoaderState<void>]) => {
          if (addressSet) {
            return of([
              supportedDeliveryModes,
              setDeliveryModeStatusFlag,
              loadSupportedDeliveryModeStatus,
            ]).pipe(
              filter(
                ([, , supportedDeliveryModeStatus]: [
                  DeliveryMode[],
                  LoaderState<void>,
                  LoaderState<void>
                ]) => supportedDeliveryModeStatus.success
              ),
              switchMap(
                ([deliveryModes, setDeliveryModeStatus, ,]: [
                  DeliveryMode[],
                  LoaderState<void>,
                  LoaderState<void>
                ]) => {
                  if (Boolean(deliveryModes.length)) {
                    const preferredDeliveryMode = this.checkoutConfigService.getPreferredDeliveryMode(
                      deliveryModes
                    );
                    return of([
                      preferredDeliveryMode,
                      setDeliveryModeStatus,
                    ]).pipe(
                      tap(
                        ([deliveryMode, deliveryModeLoadingStatus]: [
                          string,
                          LoaderState<void>
                        ]) => {
                          if (
                            deliveryMode &&
                            !(
                              deliveryModeLoadingStatus.success ||
                              deliveryModeLoadingStatus.error ||
                              deliveryModeLoadingStatus.loading
                            )
                          ) {
                            this.checkoutDeliveryService.setDeliveryMode(
                              deliveryMode
                            );
                          }
                        }
                      ),
                      filter(
                        ([, deliveryModeLoadingStatus]: [
                          string,
                          LoaderState<void>
                        ]) => {
                          return (
                            (deliveryModeLoadingStatus.success ||
                              deliveryModeLoadingStatus.error) &&
                            !deliveryModeLoadingStatus.loading
                          );
                        }
                      ),
                      switchMap(
                        ([, deliveryModeLoadingStatus]: [
                          string,
                          LoaderState<void>
                        ]) => {
                          if (deliveryModeLoadingStatus.success) {
                            return this.checkoutDetailsService.getSelectedDeliveryModeCode();
                          }
                          return of(false);
                        }
                      ),
                      map(data => Boolean(data))
                    );
                  }
                  return of(false);
                }
              )
            );
          } else {
            return of(false);
          }
        }
      )
    );
  }

  protected resetCheckoutProcesses() {
    this.checkoutDeliveryService.resetSetDeliveryAddressProcess();
    this.checkoutPaymentService.resetSetPaymentDetailsProcess();
    this.checkoutDeliveryService.resetSetDeliveryModeProcess();
  }

  public trySetDefaultCheckoutDetails(): Observable<boolean> {
    this.resetCheckoutProcesses();
    return combineLatest([this.deliveryModeSet$, this.paymentMethodSet$]).pipe(
      map(([deliveryModeSet, paymentMethodSet]) =>
        Boolean(deliveryModeSet && paymentMethodSet)
      )
    );
  }
}
