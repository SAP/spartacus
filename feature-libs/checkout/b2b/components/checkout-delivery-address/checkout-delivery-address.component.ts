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
import { Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

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
  isAccountPayment = false;

  isAccountPayment$: Observable<boolean> = this.checkoutPaymentTypeFacade
    .isAccountPayment()
    .pipe(distinctUntilChanged());

  costCenterAddresses$: Observable<Address[]> = this.checkoutCostCenterFacade
    .getCostCenterState()
    .pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      switchMap((costCenter) =>
        costCenter?.code
          ? this.userCostCenterService.getCostCenterAddresses(costCenter.code)
          : of([])
      ),
      distinctUntilChanged(this.addressesComparator)
    );

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
      this.isAccountPayment$.subscribe(
        (isAccount) => (this.isAccountPayment = isAccount)
      )
    );

    if (!this.isAccountPayment) {
      super.ngOnInit();
    }
  }

  getSupportedAddresses(): Observable<Address[]> {
    return this.isAccountPayment$.pipe(
      switchMap((isAccountPayment) =>
        isAccountPayment
          ? this.costCenterAddresses$
          : super.getSupportedAddresses()
      )
    );
  }

  selectDefaultAddress(
    addresses: Address[],
    selected: Address | undefined
  ): Address | undefined {
    if (selected) {
      return selected;
    }

    if (this.isAccountPayment) {
      if (addresses?.length === 1) {
        selected = addresses[0];
        this.setAddress(selected);
        return selected;
      }
    }

    return super.selectDefaultAddress(addresses, selected);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
