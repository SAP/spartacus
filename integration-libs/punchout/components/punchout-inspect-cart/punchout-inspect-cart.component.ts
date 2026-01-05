/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { filter, Observable } from 'rxjs';
import { PunchoutUiRestrictionService } from '@spartacus/punchout/root';

@Component({
  selector: 'cx-punchout-inspect-cart',
  templateUrl: './punchout-inspect-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutInspectCartComponent {
  protected activeCartService = inject(ActiveCartFacade);
  protected punchoutComponentsService = inject(PunchoutUiRestrictionService);

  isPunchoutSessionActive$: Observable<boolean> =
    this.punchoutComponentsService.isPunchoutSessionActive();
  cart$: Observable<Cart> = this.activeCartService.getActive();
  entries$: Observable<OrderEntry[]> = this.activeCartService
    .getEntries()
    .pipe(filter((entries) => entries.length > 0));
}
