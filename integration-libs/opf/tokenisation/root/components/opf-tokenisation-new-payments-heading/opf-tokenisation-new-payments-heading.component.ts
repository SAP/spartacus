/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { OpfNewPaymentsHeadingContext } from '../../model';
import { Observable, of } from 'rxjs';
import { OutletContextData } from '@spartacus/storefront';

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

  readonly context$: Observable<OpfNewPaymentsHeadingContext> =
    this.outletContextData?.context$ ?? of({} as OpfNewPaymentsHeadingContext);
}
