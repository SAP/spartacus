/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  ORDER_ENTRIES_CONTEXT,
  OrderEntriesContext,
  OrderEntry,
} from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import { ContextService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ExportOrderEntriesToCsvService } from './export-order-entries-to-csv.service';

@Component({
  selector: 'cx-export-order-entries',
  templateUrl: './export-order-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TranslatePipe],
})
export class ExportOrderEntriesComponent {
  @HostBinding('class') styles = 'container';

  constructor(
    protected exportEntriesService: ExportOrderEntriesToCsvService,
    protected contextService: ContextService
  ) {}

  protected orderEntriesContext$: Observable<OrderEntriesContext | undefined> =
    this.contextService.get<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT);

  entries$: Observable<OrderEntry[] | undefined> =
    this.orderEntriesContext$.pipe(
      switchMap(
        (orderEntriesContext) =>
          orderEntriesContext?.getEntries?.() ?? of(undefined)
      )
    );

  exportCsv(entries: OrderEntry[]): void {
    this.exportEntriesService.downloadCsv(entries);
  }
}
