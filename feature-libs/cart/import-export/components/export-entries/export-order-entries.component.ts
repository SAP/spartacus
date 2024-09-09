/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  OrderEntriesContext,
  OrderEntry,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/cart/base/root';
import { ContextService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ExportOrderEntriesToCsvService } from './export-order-entries-to-csv.service';
import { I18nModule } from '@spartacus/core';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-export-order-entries',
    templateUrl: './export-order-entries.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        I18nModule,
    ],
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
