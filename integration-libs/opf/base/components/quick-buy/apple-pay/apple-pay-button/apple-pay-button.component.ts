/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, inject } from '@angular/core';
import { Product } from '@spartacus/core';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';
import { Subscription, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartHandlerService } from '../../cart-handler.service';
import { ApplePayService } from '../apple-pay.service';

@Component({
  selector: 'cx-opf-apple-pay',
  template: `
    <ng-container *ngIf="isApplePaySupported$ | async">
      <div
        (click)="quickBuyProduct()"
        class="apple-pay-button apple-pay-button-black btn btn-block"
      ></div>
    </ng-container>
  `,
  styleUrls: ['./apple-pay-button.component.scss'],
})
export class ApplePayButtonComponent implements OnDestroy{
  protected applePayService = inject(ApplePayService);
  protected currentProductService = inject(CurrentProductService);
  protected itemCounterService = inject(ItemCounterService);
  protected cartHandlerService = inject(CartHandlerService);

  sub: Subscription;
  isApplePaySupported$ = this.applePayService.isApplePaySupported$();

  quickBuyProduct(): void {
    this.sub = combineLatest([
      this.currentProductService.getProduct(),
      this.cartHandlerService.checkStableCart(),
    ])
      .pipe(
        switchMap(([product, _]) =>
          this.applePayService.start(
            product as Product,
            this.itemCounterService.getCounter()
          )
        )
      )
      .subscribe(() => {});
  }

  ngOnDestroy(): void {
      if(this.sub){
        this.sub.unsubscribe();
      }
  }
}
