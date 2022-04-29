import { Component, Optional } from '@angular/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'cx-schedule-lines-cart-entry',
  templateUrl: './schedule-lines-cart-entry.component.html',
})
export class ScheduleLinesCartEntryComponent {
  constructor(
    @Optional() protected cartItemContext: CartItemContext,
    protected translationService: TranslationService,
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
}
