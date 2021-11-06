import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutStepService,
  ShippingAddressComponent,
} from '@spartacus/checkout/base/components';
import { CheckoutDeliveryAddressFacade } from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
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
  templateUrl: './shipping-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BShippingAddressComponent
  extends ShippingAddressComponent
  implements OnInit, OnDestroy
{
  isAccountPayment = false;

  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryAddressService: CheckoutDeliveryAddressFacade,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutPaymentTypeService: CheckoutPaymentTypeFacade,
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterService: CheckoutCostCenterFacade
  ) {
    super(
      userAddressService,
      checkoutDeliveryAddressService,
      activatedRoute,
      translation,
      activeCartService,
      checkoutStepService
    );
  }

  getSupportedAddresses(): Observable<Address[]> {
    return this.checkoutPaymentTypeService.isAccountPayment().pipe(
      switchMap((isAccountPayment) => {
        return isAccountPayment
          ? this.checkoutCostCenterService.getCostCenterState().pipe(
              filter((state) => !state.loading),
              map((state) => state.data),
              distinctUntilChanged(),
              switchMap((costCenterCode) => {
                this.doneAutoSelect = false;
                return costCenterCode
                  ? this.userCostCenterService.getCostCenterAddresses(
                      costCenterCode
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
      this.checkoutPaymentTypeService
        .isAccountPayment()
        .pipe(distinctUntilChanged())
        .subscribe((isAccount) => (this.isAccountPayment = isAccount))
    );

    if (!this.isAccountPayment) {
      super.ngOnInit();
    }
  }
}
