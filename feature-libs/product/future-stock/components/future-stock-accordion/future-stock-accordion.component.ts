import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { FutureStock } from '@spartacus/core';

@Component({
  selector: 'cx-future-stock-accordion',
  templateUrl: './future-stock-accordion.component.html',
  host: {
    '[class.collapsed]': '!expanded',
  },
})
export class FutureStockAccordionComponent {
  @Input() header: string;
  @Input() expanded: boolean = false;
  @Input() content: FutureStock[] | string;
  @Output() expandedChange = new EventEmitter<boolean>();

  iconType = ICON_TYPE;

  toggle(): void {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }

  isString(param: FutureStock[] | string): boolean {
    return typeof param === 'string';
  }
}
