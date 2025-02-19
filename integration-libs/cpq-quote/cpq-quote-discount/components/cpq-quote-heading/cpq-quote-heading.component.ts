/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Inject,
} from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { CpqQuoteService } from '../../cpq-qute.service';

@Component({
  selector: 'cx-cpq-quote-heading',
  templateUrl: './cpq-quote-heading.component.html',
  standalone: false,
})
export class CpqQuoteHeadingComponent implements OnInit, OnDestroy {
  @Input()
  quoteDiscountData: OrderEntry;
  protected subscription = new Subscription();
  discountLabel: string;
  datacheck: any;

  constructor(
    // Inject OutletContextData dependency
    @Optional()
    @Inject(OutletContextData)
    protected outlet: OutletContextData,
    protected translationService: TranslationService,
    private cpqQuoteService: CpqQuoteService
  ) {}

  // discountLabel: string = 'Discount Percentage';
  dataAvailable: boolean = false;

  ngOnInit(): void {
    this.subscription.add(
      this.translationService
        .translate('cpqQuoteHeading')
        .subscribe((translation: string) => {
          this.discountLabel = translation;
        })
    );

    if (this.outlet?.context$) {
      this.subscription.add(
        this.outlet.context$.subscribe((context) => {
          this.datacheck = context;
          const hasDiscounts = this.datacheck.some(
            (item: any) => item.cpqDiscounts && item.cpqDiscounts.length > 0
          );
          // Set flag based on the existence of cpqDiscounts in any item
          this.cpqQuoteService.setFlag(!hasDiscounts);
          if (context && context.length > 0) {
            this.dataAvailable = context.some(
              (item: { cpqDiscounts: string | any[] }) =>
                item.cpqDiscounts && item.cpqDiscounts.length > 0
            );
          } else {
            this.dataAvailable = false;
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
