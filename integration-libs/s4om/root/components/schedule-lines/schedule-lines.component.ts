/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { CxDatePipe, TranslationService } from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'cx-schedule-lines',
  templateUrl: './schedule-lines.component.html',
  providers: [CxDatePipe],
  standalone: false,
})
export class ScheduleLinesComponent {
  protected cartItemContext = inject(CartItemContext, { optional: true });
  protected translationService = inject(TranslationService);
  protected datePipe = inject(CxDatePipe);


  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  /**
   * Verifies whether the Schedule Line infos have any entries.
   * Only in this case we want to display the schedule line summary
   *
   * @param {OrderEntry} item - Cart item
   * @returns {boolean} - whether the Schedule Line information is present for the order
   */
  hasScheduleLines(item: OrderEntry): boolean {
    const scheduleLines = item.scheduleLines;

    return scheduleLines != null && scheduleLines.length > 0;
  }

  getScheduleLineInfoId(index: number): string {
    return 'cx-schedule-line-info-' + index.toString();
  }

  getLongDate(date?: Date) {
    if (!date) {
      return '';
    }
    return this.datePipe.transform(date);
  }
}
