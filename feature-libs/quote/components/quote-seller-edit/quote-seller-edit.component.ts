/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  QuoteFacade,
  Quote,
  QuoteDiscount,
  QuoteDiscountType,
  QuoteMetadata,
} from '@spartacus/quote/root';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-quote-seller-edit',
  templateUrl: './quote-seller-edit.component.html',
})
export class QuoteSellerEditComponent implements OnInit, OnDestroy {
  quoteDetailsForSeller$: Observable<Quote> = this.quoteFacade
    .getQuoteDetails()
    .pipe(
      filter((quote) =>
        this.quoteSellerEditComponentService.isEditableForSeller(quote)
      )
    );

  @ViewChild('element') element: ElementRef;

  form: UntypedFormGroup = new UntypedFormGroup({
    discount: new UntypedFormControl(),
    validityDate: new UntypedFormControl(),
  });

  iconType = ICON_TYPE;

  protected subscription: Subscription = new Subscription();

  constructor(
    protected quoteFacade: QuoteFacade,
    protected quoteSellerEditComponentService: QuoteSellerEditComponentService
  ) {}

  ngOnInit(): void {
    //We need the subscription member even if we use take(1):
    //quoteDetailsForSeller$ might never emit
    this.subscription.add(
      combineLatest([
        this.quoteSellerEditComponentService.getLocalizationElements(),
        this.quoteDetailsForSeller$,
      ])
        .pipe(take(1))
        .subscribe(([localizationElements, quote]) => {
          const numberFormatValidator =
            this.quoteSellerEditComponentService.getNumberFormatValidator(
              localizationElements.locale,
              localizationElements.currencySymbol,
              this.quoteSellerEditComponentService.getMaximumNumberOfTotalPlaces(
                quote
              )
            );
          this.form.controls.discount.addValidators([numberFormatValidator]);
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
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /**
   * Do we display validation message?
   * @returns True in case discount control has errors
   */
  mustDisplayValidationMessage(): boolean {
    return !this.form.controls.discount.valid;
  }

  /**
   * On applying discount, we send its value to the facade layer
   * @param quoteCode Quote code
   */
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

  /**
   * On setting a date, we send its value to the facade layer
   * @param quoteCode Quote code
   */
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
