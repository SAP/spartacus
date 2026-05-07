/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  inject,
} from '@angular/core';
import { AbstractOrderContextDirective } from '@spartacus/cart/base/components';
import {
  AbstractOrderType,
  CartOutlets,
  DeliveryMode,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { Address, FeatureConfigService, TranslatePipe, TranslationService } from '@spartacus/core';
import { OrderConsignmentService } from '@spartacus/order/core';
import {
  Order,
  OrderFacade,
  deliveryAddressCard,
  deliveryModeCard,
} from '@spartacus/order/root';
import {
  Card,
  CardComponent,
  HierarchyModule,
  HierarchyNode,
  OutletContextData,
  OutletDirective
} from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-shipping',
  templateUrl: './order-confirmation-shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgClass,
    CardComponent,
    AbstractOrderContextDirective,
    OutletDirective,
    AsyncPipe,
    TranslatePipe,
    HierarchyModule,
  ],
})
export class OrderConfirmationShippingComponent implements OnInit, OnDestroy {
  private featureConfig = inject(FeatureConfigService);

  @Input() showItemList: boolean = true;

  readonly cartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;

  entries: OrderEntry[] | undefined;

  order$: Observable<Order | undefined> = this.orderFacade
    .getOrderDetails()
    .pipe(
      tap((order) => {
        this.entries = order?.entries?.filter(
          (entry) => !entry.deliveryPointOfService
        );

        if (this.featureConfig.isEnabled('enableBundles') && order && this.entries) {
          const { filteredEntries, hierarchyTrees }
             = this.orderConsignmentService.processShippingEntries(order, this.entries);
          this.entries = filteredEntries;
          this.shippingHierarchyTrees = hierarchyTrees;
        }
      })
    );

  protected subscription = new Subscription();

  shippingHierarchyTrees: HierarchyNode[];

  constructor(
    protected orderFacade: OrderFacade,
    protected translationService: TranslationService,
    protected cd: ChangeDetectorRef,
    protected orderConsignmentService: OrderConsignmentService,
    @Optional()
    protected outlet?: OutletContextData<{
      showItemList?: boolean;
      order?: any;
    }>
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.outlet?.context$.subscribe((context) => {
        if (context.showItemList !== undefined) {
          this.showItemList = context.showItemList;
        }
        if (context.order) {
          this.order$ = of(context.order);
        }
        this.cd.markForCheck();
      })
    );
  }

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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
