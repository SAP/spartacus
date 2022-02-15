import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutDeliveryAddressComponent,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  GlobalMessageService,
  TranslationService,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

export interface CardWithAddress {
  card: Card;
  address: Address;
}

@Component({
  selector: 'cx-delivery-address',
  templateUrl: './checkout-delivery-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BCheckoutDeliveryAddressComponent
  extends CheckoutDeliveryAddressComponent
  implements OnInit, OnDestroy
{
  protected subscriptions = new Subscription();

  cards$: Observable<CardWithAddress[]>;

  isAccountPayment = false;

  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected activatedRoute: ActivatedRoute,
    protected translationService: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected globalMessageService: GlobalMessageService,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected userCostCenterService: UserCostCenterService
  ) {
    super(
      userAddressService,
      checkoutDeliveryAddressFacade,
      activatedRoute,
      translationService,
      activeCartFacade,
      checkoutStepService,
      checkoutDeliveryModesFacade,
      globalMessageService
    );
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.checkoutPaymentTypeFacade
        .isAccountPayment()
        .pipe(distinctUntilChanged())
        .subscribe((isAccount) => (this.isAccountPayment = isAccount))
    );

    if (!this.isAccountPayment) {
      super.ngOnInit();
    } else {
      this.cards$ = combineLatest([
        this.getSupportedAddresses(),
        this.selectedAddress$,
        this.translationService.translate(
          'checkoutAddress.defaultDeliveryAddress'
        ),
        this.translationService.translate('checkoutAddress.shipToThisAddress'),
        this.translationService.translate('addressCard.selected'),
      ]).pipe(
        tap(([addresses, selected]) =>
          this.selectDefaultAddress(addresses, selected)
        ),
        map(([addresses, selected, textDefault, textShipTo, textSelected]) =>
          addresses.map((address) => ({
            address,
            card: this.getCardContent(
              address,
              selected,
              textDefault,
              textShipTo,
              textSelected
            ),
          }))
        ),
        tap((x) => console.log('ACCOUNT', x))
      );
    }
  }

  getSupportedAddresses(): Observable<Address[]> {
    console.log('b2b getSupportedAddresses');
    return this.checkoutPaymentTypeFacade.isAccountPayment().pipe(
      switchMap((isAccountPayment) => {
        return isAccountPayment
          ? this.checkoutCostCenterFacade.getCostCenterState().pipe(
              filter((state) => !state.loading),
              map((state) => state.data),
              distinctUntilChanged(),
              switchMap((costCenter) => {
                this.doneAutoSelect = false;
                return costCenter?.code
                  ? this.userCostCenterService.getCostCenterAddresses(
                      costCenter.code
                    )
                  : of([]);
              })
            )
          : super.getSupportedAddresses();
      })
    );
  }

  selectDefaultAddress(
    addresses: Address[],
    selected: Address | undefined
  ): void {
    if (
      !this.doneAutoSelect &&
      addresses &&
      addresses.length &&
      (!selected || Object.keys(selected).length === 0)
    ) {
      if (this.isAccountPayment) {
        if (addresses.length === 1) {
          this.setAddress(addresses[0]);
        }
      } else {
        super.selectDefaultAddress(addresses, selected);
      }
      this.doneAutoSelect = true;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
