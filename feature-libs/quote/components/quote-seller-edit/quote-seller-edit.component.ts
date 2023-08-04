/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { QuoteFacade, Quote, QuoteDiscount } from '@spartacus/quote/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-quote-seller-edit',
  templateUrl: './quote-seller-edit.component.html',
})
export class QuoteSellerEditComponent {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();

  @ViewChild('element') element: ElementRef;

  form: UntypedFormGroup = new UntypedFormGroup({
    discount: new UntypedFormControl(''),
  });

  constructor(protected quoteFacade: QuoteFacade) {}

  onApply(quoteCode: string): void {
    const discount: QuoteDiscount = {
      discountRate: this.form.controls.discount.value,
      discountType: 'TODO',
    };
    this.quoteFacade.addDiscount(quoteCode, discount);
  }
}
