/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  OrderEntriesContext,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/cart/base/root';
import {
  ContextService,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-import-order-entries',
  templateUrl: './import-order-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ImportOrderEntriesComponent {
  protected launchDialogService = inject(LaunchDialogService);
  protected contextService = inject(ContextService);

  protected subscription = new Subscription();
  @ViewChild('open') element: ElementRef;

  orderEntriesContext$: Observable<OrderEntriesContext | undefined> =
    this.contextService.get<OrderEntriesContext>(ORDER_ENTRIES_CONTEXT);

  openDialog(orderEntriesContext: OrderEntriesContext): void {
    this.launchDialogService.openDialogAndSubscribe(
      LAUNCH_CALLER.IMPORT_TO_CART,
      this.element,
      { orderEntriesContext }
    );
  }
}
