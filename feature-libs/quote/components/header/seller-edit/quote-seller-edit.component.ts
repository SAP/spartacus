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
  Quote,
  QuoteDiscount,
  QuoteDiscountType,
  QuoteFacade,
  QuoteMetadata,
} from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { debounceTime, filter, take } from 'rxjs/operators';
import { QuoteUIConfig } from '../../config';
import { QuoteSellerEditComponentService } from './quote-seller-edit.component.service';

@Component({
  selector: 'cx-quote-seller-edit',
  templateUrl: './quote-seller-edit.component.html',
})
export class QuoteSellerEditComponent implements OnInit, OnDestroy {
  quoteDetailsForSeller$: Observable<Quote> = this.quoteFacade
    .getQuoteDetails()
    .pipe(
      filter((quote) => this.quoteSellerEditComponentService.isEditable(quote))
    );

  @ViewChild('element') element: ElementRef;

  form: UntypedFormGroup = new UntypedFormGroup({
    discount: new UntypedFormControl(),
    validityDate: new UntypedFormControl(),
  });

  iconType = ICON_TYPE;
  discountPlaceholder: string;

  protected subscription: Subscription = new Subscription();

  protected dateUpdates: Subject<{ quoteCode: string; date: string }> =
    new Subject();

  constructor(
    protected quoteFacade: QuoteFacade,
    protected quoteSellerEditComponentService: QuoteSellerEditComponentService,
    protected quoteUiConfig: QuoteUIConfig
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
          this.discountPlaceholder = localizationElements.currencySymbol;
          const numberFormatValidator =
            this.quoteSellerEditComponentService.getNumberFormatValidator(
              localizationElements.locale,
              localizationElements.currencySymbol,
              this.quoteSellerEditComponentService.getMaximumNumberOfTotalPlaces(
                quote
              )
            );
          this.form.controls.discount.addValidators([numberFormatValidator]);
          const discountValue = quote.quoteDiscounts?.value;
          if (discountValue) {
            this.form.controls.discount.setValue(
              localizationElements.formatter.format(discountValue)
            );
          }
          this.form.controls.validityDate.setValue(
            this.quoteSellerEditComponentService.removeTimeFromDate(
              quote.expirationTime?.toString()
            )
          );
        })
    );
    this.subscription.add(
      this.dateUpdates
        .pipe(
          debounceTime(
            this.quoteUiConfig.quote?.updateDebounceTime?.expiryDate ?? 500
          )
        )
        .subscribe((payload) => {
          const quoteMetaData: QuoteMetadata = {
            expirationTime: payload.date,
          };
          this.quoteFacade.editQuote(payload.quoteCode, quoteMetaData);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  /**
   * Should the validation message be displayed?
   * @returns True in case discount control has errors
   */
  mustDisplayValidationMessage(): boolean {
    return !this.form.controls.discount.valid;
  }

  /**
   * On applying discount, the value will be sent to the facade layer
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
   * On setting a date, the value will be sent to the facade layer
   * @param quoteCode Quote code
   */
  onSetDate(quoteCode: string): void {
    const dateWithTime = this.quoteSellerEditComponentService.addTimeToDate(
      this.form.controls.validityDate.value
    );
    this.dateUpdates.next({ quoteCode: quoteCode, date: dateWithTime });
  }
}
