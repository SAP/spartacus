/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ChangeDetectionStrategy,
  output,
  input,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-opf-tokenisation-delete-payment-dialog',
  templateUrl: './opf-tokenisation-delete-payment-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
})
export class OpfTokenisationDeletePaymentDialogComponent {
  readonly showDialog = input(false);

  readonly confirmDelete = output<void>();
  readonly cancelDelete = output<void>();

  onConfirm(): void {
    this.confirmDelete.emit();
  }

  onCancel(): void {
    this.cancelDelete.emit();
  }
}
