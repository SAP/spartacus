import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { FutureStock } from '../../root/models/future-stock.model';

@Component({
  selector: 'cx-future-stock-accordion',
  templateUrl: './future-stock-accordion.component.html',
  host: {
    '[class.collapsed]': '!expanded'
  }
})
export class FutureStockAccordionComponent {

  /** Define the header text */
  @Input() header: string;

  /** Determine the expanded state */
  @Input() expanded: boolean = false;

  @Input() content: FutureStock[] | string;

  /** Emit whenever the output has changed */
  @Output() expandedChange = new EventEmitter<boolean>();

  iconType = ICON_TYPE;

  toggle(): void {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }

  isString(param: FutureStock[] | string): boolean {
      return typeof(param) === 'string';
  }
}
