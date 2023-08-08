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
  QuoteMetadata,
} from '@spartacus/quote/root';
import { Observable, combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';
import { ICON_TYPE } from '@spartacus/storefront';

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
    validityDate: new UntypedFormControl(''),
  });

  iconType = ICON_TYPE;

  constructor(
    protected quoteFacade: QuoteFacade,
    protected quoteSellerEditComponentService: QuoteSellerEditComponentService
  ) {}
  ngOnInit(): void {
    combineLatest([
      this.quoteSellerEditComponentService.getLocalizationElements(),
      this.quoteDetailsForSeller$,
    ])
      .pipe(take(1))
      .subscribe(([[locale, currency, formatter], quote]) => {
        const numberFormatValidator =
          this.quoteSellerEditComponentService.getNumberFormatValidator(
            locale,
            currency
          );
        this.form.controls.discount = new UntypedFormControl('', [
          numberFormatValidator,
        ]);
        this.form.controls.discount.setValue(
          formatter.format(quote.quoteDiscounts?.value ?? 0)
        );
      });
  }

  protected isSeller(quoteState: QuoteState): boolean {
    return (
      quoteState === QuoteState.SELLER_DRAFT ||
      quoteState === QuoteState.SELLER_REQUEST
    );
  }

  public mustDisplayValidationMessage(): boolean {
    return !this.form.controls.discount.valid;
  }

  onApply(quoteCode: string): void {
    if (this.form.controls.discount.valid) {
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

  onSetDate(quoteCode: string): void {
    console.log('CHHI date selected: ' + this.form.controls.validityDate.value);
    //const date: Date = new Date();
    const quoteMetaData: QuoteMetadata = {
      expirationTime: '2023-08-12T00:00:01+0000',
    };
    this.quoteFacade.editQuote(quoteCode, quoteMetaData);
  }
}
