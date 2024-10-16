/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  ActiveCartFacade,
  CartOutlets,
  DeliveryMode,
  OrderEntry,
  OrderEntryGroup,
} from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  Address,
  FeatureConfigService,
  TranslationService,
} from '@spartacus/core';
import { deliveryAddressCard, deliveryModeCard } from '@spartacus/order/root';
import {
  Card,
  HierarchyComponentService,
  HierarchyNode,
  ICON_TYPE,
} from '@spartacus/storefront';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CheckoutStepService } from '../../services/checkout-step.service';

@Component({
  selector: 'cx-checkout-review-shipping',
  templateUrl: './checkout-review-shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutReviewShippingComponent implements OnInit {
  private featureConfig = inject(FeatureConfigService);

  readonly cartOutlets = CartOutlets;
  iconTypes = ICON_TYPE;

  deliveryAddressStepRoute = this.checkoutStepService.getCheckoutStepRoute(
    CheckoutStepType.DELIVERY_ADDRESS
  );
  deliveryModeStepRoute = this.checkoutStepService.getCheckoutStepRoute(
    CheckoutStepType.DELIVERY_MODE
  );

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected translationService: TranslationService,
    protected checkoutStepService: CheckoutStepService,
    protected hierarchyService: HierarchyComponentService
  ) {}

  entries$: Observable<OrderEntry[]>;
  bundles$: Observable<HierarchyNode[]>;
  entryGroups$: Observable<OrderEntryGroup[]> = of([]);

  ngOnInit() {
    if (this.featureConfig.isEnabled('enableBundles')) {
      // The user has enabled feature toggle "enableBundles"
      // which makes the cart use the new entry groups feature to provide bundle support.
      this.entryGroups$ = this.activeCartFacade.getDeliveryEntryGroups();
      this.entries$ = this.hierarchyService.getEntriesFromGroups(
        this.entryGroups$
      );
      this.bundles$ = this.hierarchyService.getBundlesFromGroups(
        this.entryGroups$
      );
    } else {
      // The user has NOT enabled feature toggle "enableBundles"
      // which makes the cart use the OLD entries items. So new features that use entryGroups like bundles will not be supported until the user opts-in.
      this.entries$ = this.activeCartFacade.getDeliveryEntries();
    }
  }

  deliveryAddress$: Observable<Address | undefined> =
    this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );

  deliveryMode$: Observable<DeliveryMode | undefined> =
    this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(
      filter((state) => !state.loading && !state.error),
      map((state) => state.data)
    );

  getDeliveryAddressCard(
    deliveryAddress: Address,
    countryName?: string
  ): Observable<Card> {
    return combineLatest([
      this.translationService.translate('addressCard.shipTo'),
      this.translationService.translate('addressCard.phoneNumber'),
      this.translationService.translate('addressCard.mobileNumber'),
    ]).pipe(
      map(([textTitle, textPhone, textMobile]) =>
        deliveryAddressCard(
          textTitle,
          textPhone,
          textMobile,
          deliveryAddress,
          countryName
        )
      )
    );
  }

  getDeliveryModeCard(deliveryMode: DeliveryMode): Observable<Card> {
    return combineLatest([
      this.translationService.translate('checkoutMode.deliveryMethod'),
    ]).pipe(map(([textTitle]) => deliveryModeCard(textTitle, deliveryMode)));
  }
}
