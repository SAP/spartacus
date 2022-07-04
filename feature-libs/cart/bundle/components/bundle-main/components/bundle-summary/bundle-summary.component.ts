import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { EntryGroup } from '@spartacus/cart/base/root';
import { Product } from '@spartacus/core';

@Component({
  selector: 'cx-bundle-summary',
  templateUrl: './bundle-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleSummaryComponent {
  @Input() products: Product[];
  @Input() bundle: EntryGroup;
  @Input() showAddToCart: boolean;

  @Output() readonly addToCart = new EventEmitter<void>();

  onAddToCart(): void {
    this.addToCart.next();
  }
}
