import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutShippingAddressComponent,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import { CheckoutDeliveryAddressFacade } from '@spartacus/checkout/base/root';
import {
  Address,
  TranslationService,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

export interface CardWithAddress {
  card: Card;
  address: Address;
}

@Component({
  selector: 'cx-shipping-address',
  templateUrl: './checkout-shipping-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BCheckoutShippingAddressComponent
  extends CheckoutShippingAddressComponent
  implements OnInit, OnDestroy
{
  isAccountPayment = false;

  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected activatedRoute: ActivatedRoute,
    protected translationService: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected userCostCenterService: UserCostCenterService
  ) {
    super(
      userAddressService,
      checkoutDeliveryAddressFacade,
      activatedRoute,
      translationService,
      activeCartFacade,
      checkoutStepService
    );
  }

  getSupportedAddresses(): Observable<Address[]> {
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

  selectDefaultAddress(addresses: Address[], selected: Address | undefined) {
    if (
      !this.doneAutoSelect &&
      addresses &&
      addresses.length &&
      (!selected || Object.keys(selected).length === 0)
    ) {
      if (this.isAccountPayment) {
        if (addresses.length === 1) {
          this.selectAddress(addresses[0]);
        }
      } else {
        super.selectDefaultAddress(addresses, selected);
      }
      this.doneAutoSelect = true;
    }
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
    }
  }
}
