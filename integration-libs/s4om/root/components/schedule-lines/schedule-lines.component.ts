/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Optional } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { CxDatePipe, TranslationService, I18nModule } from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-schedule-lines',
    templateUrl: './schedule-lines.component.html',
    providers: [CxDatePipe],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        I18nModule,
    ],
})
export class ScheduleLinesComponent {
  constructor(
    @Optional() protected cartItemContext: CartItemContext,
    protected translationService: TranslationService,
    protected datePipe: CxDatePipe
  ) {}

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
