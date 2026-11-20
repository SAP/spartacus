/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
  input,
} from '@angular/core';
import {
  OrderEntriesSource,
  ProductImportSummary,
} from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-import-entries-summary',
  templateUrl: './import-entries-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, TranslatePipe],
})
export class ImportEntriesSummaryComponent {
  iconTypes = ICON_TYPE;
  orderEntriesSource = OrderEntriesSource;

  warningDetailsOpened: boolean = false;
  errorDetailsOpened: boolean = false;

  readonly type = input<string>();

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  summary: ProductImportSummary;

  readonly closeEvent = output<string>();

  close(reason: string): void {
    this.closeEvent.emit(reason);
  }

  toggleWarningList(): void {
    this.warningDetailsOpened = !this.warningDetailsOpened;
  }

  toggleErrorList(): void {
    this.errorDetailsOpened = !this.errorDetailsOpened;
  }
}
