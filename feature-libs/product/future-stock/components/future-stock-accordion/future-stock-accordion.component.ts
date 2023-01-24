import { Component, Input } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { FutureStock } from '@spartacus/core';

@Component({
  selector: 'cx-future-stock-accordion',
  templateUrl: './future-stock-accordion.component.html',
})
export class FutureStockAccordionComponent {
  @Input() header: string;
  @Input() content: FutureStock[] | string;

  expanded: boolean = false;
  iconType = ICON_TYPE;

  toggle(): void {
    this.expanded = !this.expanded;
  }

  isString(param: FutureStock[] | string): boolean {
    return typeof param === 'string';
  }
}
