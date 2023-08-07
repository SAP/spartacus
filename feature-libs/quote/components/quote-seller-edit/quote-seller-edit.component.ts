/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  QuoteFacade,
  Quote,
  QuoteDiscount,
  QuoteState,
} from '@spartacus/quote/root';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-seller-edit',
  templateUrl: './quote-seller-edit.component.html',
})
export class QuoteSellerEditComponent {
  quoteDetailsForSeller$: Observable<Quote> = this.quoteFacade
    .getQuoteDetails()
    .pipe(filter((quote) => this.isSeller(quote.state)));

  @ViewChild('element') element: ElementRef;

  form: UntypedFormGroup = new UntypedFormGroup({
    discount: new UntypedFormControl(''),
  });

  constructor(protected quoteFacade: QuoteFacade) {}

  protected isSeller(quoteState: QuoteState): boolean {
    return (
      quoteState === QuoteState.SELLER_DRAFT ||
      quoteState === QuoteState.SELLER_REQUEST
    );
  }

  onApply(quoteCode: string): void {
    const discount: QuoteDiscount = {
      discountRate: this.form.controls.discount.value,
      discountType: 'TODO',
    };
    this.quoteFacade.addDiscount(quoteCode, discount);
  }
}
