/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe, UserPaymentService } from '@spartacus/core';
import { OpfNewPaymentsHeadingContext } from '../../model';
import { Observable, combineLatest, of } from 'rxjs';
import { OutletContextData } from '@spartacus/storefront';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-tokenisation-new-payments-heading',
  standalone: true,
  templateUrl: './opf-tokenisation-new-payments-heading.component.html',
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class OpfTokenisationNewPaymentsHeadingComponent {
  protected outletContextData = inject<
    OutletContextData<OpfNewPaymentsHeadingContext>
  >(OutletContextData as any, { optional: true });

  protected userPaymentService = inject(UserPaymentService);

  readonly context$: Observable<OpfNewPaymentsHeadingContext> = combineLatest([
    this.outletContextData?.context$ ?? of({} as OpfNewPaymentsHeadingContext),
    this.userPaymentService.getPaymentMethods(),
  ]).pipe(
    map(([ctx, paymentMethods]) => ({
      ...ctx,
      hasSavedCards: Boolean(paymentMethods?.length),
    }))
  );
}
