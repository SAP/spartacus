/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ORDER_ENTRIES_CONTEXT,
  OrderEntriesContext,
} from '@spartacus/cart/base/root';
import { ContextService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ExportOrderEntriesComponent } from '../export-entries/export-order-entries.component';
import { ImportOrderEntriesComponent } from '../import-to-cart/import-entries/import-order-entries.component';

@Component({
  selector: 'cx-import-export-order-entries',
  templateUrl: './import-export-order-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    ImportOrderEntriesComponent,
    ExportOrderEntriesComponent,
    AsyncPipe,
  ],
})
export class ImportExportOrderEntriesComponent {
  constructor(protected contextService: ContextService) {}

  protected context$: Observable<OrderEntriesContext | undefined> =
    this.contextService.get<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT);

  shouldDisplayImport$: Observable<boolean> = this.context$.pipe(
    map((orderEntriesContext) => !!orderEntriesContext?.addEntries)
  );

  shouldDisplayExport$: Observable<boolean> = this.context$.pipe(
    switchMap(
      (orderEntriesContext) => orderEntriesContext?.getEntries?.() ?? of([])
    ),
    map((entries) => !!entries?.length)
  );
}
