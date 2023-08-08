/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  QuoteFacade,
  Quote,
  QuoteDiscount,
  QuoteState,
  QuoteDiscountType,
} from '@spartacus/quote/root';
import { Observable, combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';

@Component({
  selector: 'cx-quote-seller-edit',
  templateUrl: './quote-seller-edit.component.html',
})
export class QuoteSellerEditComponent implements OnInit {
  quoteDetailsForSeller$: Observable<Quote> = this.quoteFacade
    .getQuoteDetails()
    .pipe(filter((quote) => this.isSeller(quote.state)));

  @ViewChild('element') element: ElementRef;

  form: UntypedFormGroup = new UntypedFormGroup({
    discount: new UntypedFormControl(''),
  });

  constructor(
    protected quoteFacade: QuoteFacade,
    protected quoteSellerEditComponentService: QuoteSellerEditComponentService
  ) {}
  ngOnInit(): void {
    this.quoteDetailsForSeller$.pipe(take(1)).subscribe((quote) => {
      this.form.controls.discount.setValue(
        quote.quoteDiscounts?.formattedValue
      );
    });
  }

  protected isSeller(quoteState: QuoteState): boolean {
    return (
      quoteState === QuoteState.SELLER_DRAFT ||
      quoteState === QuoteState.SELLER_REQUEST
    );
  }

  onApply(quoteCode: string): void {
    combineLatest([
      this.quoteSellerEditComponentService.parseDiscountValue(
        this.form.controls.discount.value
      ),
      this.quoteSellerEditComponentService.getFormatter(),
    ])
      .pipe(take(1))
      .subscribe(([parsedValue, formatter]) => {
        const discount: QuoteDiscount = {
          discountRate: parsedValue,
          discountType: QuoteDiscountType.ABSOLUTE,
        };
        this.quoteFacade.addDiscount(quoteCode, discount);
        this.form.controls.discount.setValue(formatter.format(parsedValue));
      });
  }
}
