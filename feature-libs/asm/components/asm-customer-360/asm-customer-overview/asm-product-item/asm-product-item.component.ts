import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Price, Product } from '@spartacus/core';

@Component({
  selector: 'cx-asm-product-item',
  templateUrl: './asm-product-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsmProductItemComponent {
  @Input() item: OrderEntry;
  @Input() product: Product;
  @Input() quantity: number;
  @Input() price: Price;
  @Input() isOrderEntry = true;
  @Output() selectProduct = new EventEmitter<Product>();

  constructor() {}
}
