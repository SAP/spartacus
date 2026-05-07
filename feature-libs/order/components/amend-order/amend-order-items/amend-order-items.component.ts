/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Price, TranslatePipe } from '@spartacus/core';
import { ItemCounterComponent, MediaComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../amend-order.service';

@Component({
  selector: 'cx-amend-order-items',
  templateUrl: './amend-order-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    MediaComponent,
    ItemCounterComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class CancelOrReturnItemsComponent {
  @Input() entries: OrderEntry[];
  @Input() isConfirmation = false;
  @Input() hasHeader = true;
  @Input() isBundleConfig = false;

  form$: Observable<UntypedFormGroup> = this.orderAmendService.getForm();
  allEntries$: Observable<OrderEntry[]> = this.orderAmendService.getEntries();

  constructor(protected orderAmendService: OrderAmendService) {}

  getControl(form: UntypedFormGroup, entry: OrderEntry): UntypedFormControl {
    const control = <UntypedFormControl>(
      form.get('entries')?.get(entry.entryNumber?.toString() ?? '')
    );
    return control;
  }

  setAll(form: UntypedFormGroup): void {
    this.allEntries$.subscribe((entries) => {
      entries.forEach((entry) =>
        this.getControl(form, entry).setValue(this.getMaxAmendQuantity(entry))
      );
    });
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
