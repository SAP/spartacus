/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AmendOrderActionsComponent } from '../../amend-order-actions/amend-order-actions.component';
import { CancelOrReturnItemsComponent } from '../../amend-order-items/amend-order-items.component';
import { OrderAmendService } from '../../amend-order.service';

@Component({
  selector: 'cx-return-order-confirmation',
  templateUrl: './return-order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    CancelOrReturnItemsComponent,
    AmendOrderActionsComponent,
    AsyncPipe,
  ],
})
export class ReturnOrderConfirmationComponent {
  orderCode: string;

  form$ = this.orderAmendService
    .getForm()
    .pipe(tap((form) => (this.orderCode = form.value.orderCode)));

  entries$: Observable<OrderEntry[]> =
    this.orderAmendService.getAmendedEntries();

  constructor(protected orderAmendService: OrderAmendService) {}

  submit(form: UntypedFormGroup): void {
    form.disable();
    this.orderAmendService.save();
  }
}
