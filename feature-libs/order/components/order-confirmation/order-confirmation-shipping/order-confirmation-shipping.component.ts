/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import {
  CartOutlets,
  DeliveryMode,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { Address, TranslationService } from '@spartacus/core';
import {
  deliveryAddressCard,
  deliveryModeCard,
  Order,
  OrderFacade,
} from '@spartacus/order/root';
import { Card, OutletContextData } from '@spartacus/storefront';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation-shipping',
  templateUrl: './order-confirmation-shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationShippingComponent implements OnInit, OnDestroy {
  @Input() showItemList: boolean = true;

  readonly cartOutlets = CartOutlets;

  entries: OrderEntry[] | undefined;

  order$: Observable<Order | undefined> = this.orderFacade
    .getOrderDetails()
    .pipe(
      tap((order) => {
        this.entries = order?.entries?.filter(
          (entry) => !entry.deliveryPointOfService
        );
      })
    );

  protected subscription = new Subscription();

  constructor(
    protected orderFacade: OrderFacade,
    protected translationService: TranslationService,
    protected cd: ChangeDetectorRef,
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
