/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Quote,
  QuoteDiscount,
  QuoteDiscountType,
  QuoteFacade,
  QuoteMetadata,
} from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { debounceTime, filter, map, take, tap } from 'rxjs/operators';
import { QuoteUIConfig } from '../../config';
import {
  LocalizationElements,
  QuoteSummarySellerEditComponentService,
} from './quote-summary-seller-edit.component.service';

@Component({
  selector: 'cx-quote-summary-seller-edit',
  templateUrl: './quote-summary-seller-edit.component.html',
})
export class QuoteSummarySellerEditComponent implements OnInit, OnDestroy {
  protected quoteFacade = inject(QuoteFacade);
  protected quoteHeaderSellerEditComponentService = inject(
    QuoteSummarySellerEditComponentService
  );
  protected quoteUIConfig = inject(QuoteUIConfig);

  quoteDetailsForSeller$: Observable<Quote> = combineLatest([
    this.quoteHeaderSellerEditComponentService.getLocalizationElements(),
    this.quoteFacade.getQuoteDetails(),
  ]).pipe(
    filter(([_localizationElements, quote]) =>
      this.quoteHeaderSellerEditComponentService.isEditable(quote)
    ),
    tap(([localizationElements, quote]) => {
      this.discountUpdatePerforming$.next(false);
      this.fillFormAttributes(localizationElements, quote);
    }),
    map(([_localizationElements, quote]) => quote)
  );

  @ViewChild('element') element: ElementRef;

  form: FormGroup = new FormGroup({
    discount: new FormControl<string | null>(null),
    validityDate: new FormControl<string | null>(null),
  });

  iconType = ICON_TYPE;
  discountPlaceholder: string;

  protected subscription: Subscription = new Subscription();

  protected dateUpdates: Subject<{ quoteCode: string; date: string }> =
    new Subject();

  discountUpdatePerforming$ = new BehaviorSubject<boolean>(false);

  protected fillFormAttributes(
    localizationElements: LocalizationElements,
    quote: Quote
  ) {
    this.discountPlaceholder = localizationElements.percentageSign;
    const numberFormatValidator =
      this.quoteHeaderSellerEditComponentService.getNumberFormatValidator(
        localizationElements.locale,
        localizationElements.percentageSign
      );
    this.form.controls.discount.addValidators([numberFormatValidator]);

    const discountValue =
      quote.sapQuoteDiscountsRate &&
      quote.sapQuoteDiscountsType === QuoteDiscountType.PERCENT
        ? quote.sapQuoteDiscountsRate / 100
        : 0;
    if (discountValue) {
      this.form.controls.discount.setValue(
        localizationElements.formatter.format(discountValue)
      );
    }
    this.form.controls.validityDate.setValue(
      this.quoteHeaderSellerEditComponentService.removeTimeFromDate(
        quote.expirationTime?.toString()
      )
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.dateUpdates
        .pipe(
          debounceTime(
            this.quoteUIConfig.quote?.updateDebounceTime?.expiryDate ?? 500
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
   *
   * @returns True in case discount control has errors
   */
  mustDisplayValidationMessage(): boolean {
    return !this.form.controls.discount.valid;
  }

  /**
   * Parses current discount from control and sends absolute discount to the facade layer.
   *
   * @param quoteCode - Quote code
   */
  onApply(quoteCode: string): void {
    if (this.form.controls.discount.valid) {
      combineLatest([
        this.quoteHeaderSellerEditComponentService.parseDiscountValue(
          this.form.controls.discount.value
        ),
        this.discountUpdatePerforming$,
      ])
        .pipe(take(1))
        .subscribe(([parsedValue, discountUpdatePerforming]) => {
          if (!discountUpdatePerforming) {
            this.discountUpdatePerforming$.next(true);
            const discount: QuoteDiscount = {
              discountRate: parsedValue,
              discountType: QuoteDiscountType.PERCENT,
            };
            this.quoteFacade.addDiscount(quoteCode, discount);
          }
        });
    }
  }

  /**
   * Prepares date for facade layer and sends it.
   *
   * @param quoteCode - Quote code
   */
  onSetDate(quoteCode: string): void {
    const dateWithTime =
      this.quoteHeaderSellerEditComponentService.addTimeToDate(
        this.form.controls.validityDate.value
      );
    this.dateUpdates.next({ quoteCode: quoteCode, date: dateWithTime });
  }
}
