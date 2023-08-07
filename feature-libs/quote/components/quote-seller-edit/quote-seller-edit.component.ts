/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CurrencyService, LanguageService } from '@spartacus/core';
import {
  QuoteFacade,
  Quote,
  QuoteDiscount,
  QuoteState,
  QuoteDiscountType,
} from '@spartacus/quote/root';
import { Observable } from 'rxjs';
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
    protected currencyService: CurrencyService,
    protected languageService: LanguageService,
    protected quoteSellerEditComponentService: QuoteSellerEditComponentService
  ) {}
  ngOnInit(): void {
    const formatter = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    this.quoteDetailsForSeller$.pipe(take(1)).subscribe((quote) => {
      this.form.controls.discount.setValue(
        quote.quoteDiscounts?.formattedValue
      );
      console.log(
        'CHHI formatted value: ' +
          formatter.format(quote.quoteDiscounts?.value ?? 0)
      );
      //formatter.resolvedOptions().currencySign
    });
    this.currencyService
      .getActive()
      .pipe(take(1))
      .subscribe((curr) => console.log('CHHI get active currency: ' + curr));
    this.languageService
      .getActive()
      .pipe(take(1))
      .subscribe((curr) => console.log('CHHI get active language: ' + curr));
  }

  protected isSeller(quoteState: QuoteState): boolean {
    return (
      quoteState === QuoteState.SELLER_DRAFT ||
      quoteState === QuoteState.SELLER_REQUEST
    );
  }

  onApply(quoteCode: string): void {
    this.quoteSellerEditComponentService
      .parseDiscountValue(this.form.controls.discount.value)
      .pipe(take(1))
      .subscribe((value) => {
        const discount: QuoteDiscount = {
          discountRate: value,
          discountType: QuoteDiscountType.ABSOLUTE,
        };
        this.quoteFacade.addDiscount(quoteCode, discount);
      });
  }
}
