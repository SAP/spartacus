import { Injectable } from '@angular/core';
import {
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
  ClearCheckoutFacade,
  COMMANDS_AND_QUERIES_BASED_CHECKOUT,
} from '@spartacus/checkout/root';
import {
  Address,
  DeliveryMode,
  FeatureConfigService,
  PaymentDetails,
  StateUtils,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutDetailsService } from './checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class ExpressCheckoutService {
  private shippingAddressSet$: Observable<boolean>;
  private deliveryModeSet$: Observable<boolean>;
  private paymentMethodSet$: Observable<boolean>;

  /**
   * @deprecated since 4.3.0. Provide also FeatureConfigService.
   */
  constructor(
    userAddressService: UserAddressService,
    userPaymentService: UserPaymentService,
    checkoutDeliveryService: CheckoutDeliveryFacade,
    checkoutPaymentService: CheckoutPaymentFacade,
    checkoutDetailsService: CheckoutDetailsService,
    checkoutConfigService: CheckoutConfigService,
    clearCheckoutService: ClearCheckoutFacade
  );

  constructor(
    userAddressService: UserAddressService,
    userPaymentService: UserPaymentService,
    checkoutDeliveryService: CheckoutDeliveryFacade,
    checkoutPaymentService: CheckoutPaymentFacade,
    checkoutDetailsService: CheckoutDetailsService,
    checkoutConfigService: CheckoutConfigService,
    clearCheckoutService: ClearCheckoutFacade,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    featureConfigService: FeatureConfigService
  );

  constructor(
    protected userAddressService: UserAddressService,
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryService: CheckoutDeliveryFacade,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected checkoutDetailsService: CheckoutDetailsService,
    protected checkoutConfigService: CheckoutConfigService,
    protected clearCheckoutService: ClearCheckoutFacade,
    protected featureConfigService?: FeatureConfigService
  ) {
    this.setShippingAddress();
    this.setDeliveryMode();
    this.setPaymentMethod();
  }

  protected setShippingAddress() {
    if (
      this.featureConfigService?.isEnabled(COMMANDS_AND_QUERIES_BASED_CHECKOUT)
    ) {
      this.shippingAddressSet$ = combineLatest([
        this.userAddressService.getAddresses(),
        this.userAddressService.getAddressesLoadedSuccess(),
      ]).pipe(
        debounceTime(0),
        tap(([, addressesLoadedSuccess]) => {
          if (!addressesLoadedSuccess) {
            this.userAddressService.loadAddresses();
          }
        }),
        filter(([, addressesLoadedSuccess]) => addressesLoadedSuccess),
        take(1),
        switchMap(([addresses]) => {
          const defaultAddress =
            addresses.find((address) => address.defaultAddress) || addresses[0];
          if (defaultAddress && Object.keys(defaultAddress).length) {
            return this.checkoutDeliveryService
              .setDeliveryAddress(defaultAddress)
              .pipe(
                switchMap(() => {
                  return this.checkoutDetailsService.getDeliveryAddress();
                }),
                map((data) => !!(data && Object.keys(data).length)),
                catchError(() => of(false))
              );
          }
          return of(false);
        })
      );
    } else {
      // TODO: Remove this branch in when we fully switch to command for setting delivery address
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
            StateUtils.LoaderState<void>
          ]) => {
            if (!addressesLoadedSuccess) {
              this.userAddressService.loadAddresses();
            }
          }
        ),
        filter(
          ([, addressesLoadedSuccess]: [
            Address[],
            boolean,
            StateUtils.LoaderState<void>
          ]) => addressesLoadedSuccess
        ),
        switchMap(
          ([addresses, , setDeliveryAddressProcess]: [
            Address[],
            boolean,
            StateUtils.LoaderState<void>
          ]) => {
            const defaultAddress =
              addresses.find((address) => address.defaultAddress) ||
              addresses[0];
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
                filter(
                  (
                    setDeliveryAddressProcessState: StateUtils.LoaderState<void>
                  ) => {
                    return (
                      ((setDeliveryAddressProcessState.success ||
                        setDeliveryAddressProcessState.error) &&
                        !setDeliveryAddressProcessState.loading) ??
                      false
                    );
                  }
                ),
                switchMap(
                  (
                    setDeliveryAddressProcessState: StateUtils.LoaderState<void>
                  ) => {
                    if (setDeliveryAddressProcessState.success) {
                      return this.checkoutDetailsService.getDeliveryAddress();
                    }
                    return of(false);
                  }
                ),
                map((data) => Boolean(data && Object.keys(data).length))
              );
            }
            return of(false);
          }
        )
      );
    }
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
          StateUtils.LoaderState<void>
        ]) => {
          if (!paymentMethodsLoadedSuccess) {
            this.userPaymentService.loadPaymentMethods();
          }
        }
      ),
      filter(
        ([, success]: [
          PaymentDetails[],
          boolean,
          StateUtils.LoaderState<void>
        ]) => success
      ),
      switchMap(
        ([payments, , setPaymentDetailsProcess]: [
          PaymentDetails[],
          boolean,
          StateUtils.LoaderState<void>
        ]) => {
          const defaultPayment =
            payments.find((address) => address.defaultPayment) || payments[0];
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
              filter(
                (
                  setPaymentDetailsProcessState: StateUtils.LoaderState<void>
                ) => {
                  return (
                    ((setPaymentDetailsProcessState.success ||
                      setPaymentDetailsProcessState.error) &&
                      !setPaymentDetailsProcessState.loading) ??
                    false
                  );
                }
              ),
              switchMap(
                (
                  setPaymentDetailsProcessState: StateUtils.LoaderState<void>
                ) => {
                  if (setPaymentDetailsProcessState.success) {
                    return this.checkoutDetailsService.getPaymentDetails();
                  }
                  return of(false);
                }
              ),
              map((data) => Boolean(data && Object.keys(data).length))
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
        ]: [
          boolean,
          DeliveryMode[],
          StateUtils.LoaderState<void>,
          StateUtils.LoaderState<void>
        ]) => {
          if (addressSet) {
            return of([
              supportedDeliveryModes,
              setDeliveryModeStatusFlag,
              loadSupportedDeliveryModeStatus,
            ]).pipe(
              filter(
                ([, , supportedDeliveryModeStatus]: any) =>
                  supportedDeliveryModeStatus.success ?? false
              ),
              switchMap(
                ([deliveryModes, setDeliveryModeStatus, ,]: [
                  DeliveryMode[],
                  StateUtils.LoaderState<void>,
                  StateUtils.LoaderState<void>
                ]) => {
                  if (Boolean(deliveryModes.length)) {
                    const preferredDeliveryMode = this.checkoutConfigService.getPreferredDeliveryMode(
                      deliveryModes
                    );
                    return of([
                      preferredDeliveryMode,
                      setDeliveryModeStatus,
                    ]).pipe(
                      tap(([deliveryMode, deliveryModeLoadingStatus]: any) => {
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
                      }),
                      filter(
                        ([, deliveryModeLoadingStatus]: [
                          string,
                          StateUtils.LoaderState<void>
                        ]) => {
                          return (
                            ((deliveryModeLoadingStatus.success ||
                              deliveryModeLoadingStatus.error) &&
                              !deliveryModeLoadingStatus.loading) ??
                            false
                          );
                        }
                      ),
                      switchMap(
                        ([, deliveryModeLoadingStatus]: [
                          string,
                          StateUtils.LoaderState<void>
                        ]) => {
                          if (deliveryModeLoadingStatus.success) {
                            return this.checkoutDetailsService.getSelectedDeliveryModeCode();
                          }
                          return of(false);
                        }
                      ),
                      map((data) => Boolean(data))
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

  public trySetDefaultCheckoutDetails(): Observable<boolean> {
    this.clearCheckoutService.resetCheckoutProcesses();

    return combineLatest([this.deliveryModeSet$, this.paymentMethodSet$]).pipe(
      map(([deliveryModeSet, paymentMethodSet]) =>
        Boolean(deliveryModeSet && paymentMethodSet)
      )
    );
  }
}
