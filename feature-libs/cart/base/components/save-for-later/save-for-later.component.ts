/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, inject } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  OrderEntry,
  PromotionLocation,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import { CmsParagraphComponent, CmsService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'cx-save-for-later',
  templateUrl: './save-for-later.component.html',
  standalone: false,
})
export class SaveForLaterComponent implements OnInit {
  protected cmsService = inject(CmsService);
  protected cartService = inject(ActiveCartFacade);
  protected selectiveCartService = inject(SelectiveCartFacade);

  saveForLater$: Observable<Cart>;
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;
  data$: Observable<CmsParagraphComponent>;
  isCartEmpty$: Observable<boolean>;
  CartLocation = PromotionLocation;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.isCartEmpty$ = this.cartService
      .getActive()
      .pipe(map((cart) => !(cart && cart.totalItems && cart.totalItems > 0)));
    this.saveForLater$ = this.selectiveCartService.getCart();
    this.entries$ = this.selectiveCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));
    this.cartLoaded$ = combineLatest([
      this.cartService.isStable(),
      this.selectiveCartService.isStable(),
    ]).pipe(map(([cartLoaded, sflLoaded]) => cartLoaded && sflLoaded));
    this.data$ = this.cmsService.getComponentData(
      'EmptyCartParagraphComponent'
    );
  }

  moveToCart(item: OrderEntry) {
    this.selectiveCartService.removeEntry(item);
    this.cartService.addEntry(item.product?.code ?? '', item.quantity ?? 0);
  }
}
