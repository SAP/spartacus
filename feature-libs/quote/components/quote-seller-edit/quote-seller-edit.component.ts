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
    .pipe(
      filter((quote) =>
        this.quoteSellerEditComponentService.isSeller(quote.state)
      )
    );

  @ViewChild('element') element: ElementRef;

  form: UntypedFormGroup = new UntypedFormGroup({
    discount: new UntypedFormControl(''),
    validityDate: new UntypedFormControl(new Date()),
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
      .subscribe(([localizationElements, quote]) => {
        const numberFormatValidator =
          this.quoteSellerEditComponentService.getNumberFormatValidator(
            localizationElements.locale,
            localizationElements.currencySymbol
          );
        this.form.controls.discount = new UntypedFormControl('', [
          numberFormatValidator,
        ]);
        this.form.controls.discount.setValue(
          localizationElements.formatter.format(
            quote.quoteDiscounts?.value ?? 0
          )
        );
        this.form.controls.validityDate.setValue(
          this.quoteSellerEditComponentService.removeTimeFromDate(
            quote.expirationTime?.toString()
          )
        );
      });
  }

  mustDisplayValidationMessage(): boolean {
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

  //TODO CHHI error handling in case date is in the past
  onSetDate(quoteCode: string): void {
    const dateWithTime = this.quoteSellerEditComponentService.addTimeToDate(
      this.form.controls.validityDate.value
    );
    const quoteMetaData: QuoteMetadata = {
      expirationTime: dateWithTime,
    };
    this.quoteFacade.editQuote(quoteCode, quoteMetaData);
  }
}
