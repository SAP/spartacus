/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Price } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../amend-order.service';

@Component({
  selector: 'cx-amend-order-items',
  templateUrl: './amend-order-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
  @Input() isConfirmation = false;

  form$: Observable<UntypedFormGroup> = this.orderAmendService.getForm();

  constructor(protected orderAmendService: OrderAmendService) {}

  getControl(form: UntypedFormGroup, entry: OrderEntry): UntypedFormControl {
    const control = <UntypedFormControl>(
      form.get('entries')?.get(entry.entryNumber?.toString() ?? '')
    );
    return control;
  }

  setAll(form: UntypedFormGroup): void {
    this.entries.forEach((entry) =>
      this.getControl(form, entry).setValue(this.getMaxAmendQuantity(entry))
    );
  }

  getItemPrice(entry: OrderEntry): Price {
    return this.orderAmendService.getAmendedPrice(entry);
  }

  getMaxAmendQuantity(entry: OrderEntry) {
    return this.orderAmendService.getMaxAmendQuantity(entry);
  }

  isCancellation() {
    return this.orderAmendService.isCancellation();
  }
}
