import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';

@Component({
  selector: '[cx-wish-list-item], cx-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishListItemComponent {
  @Input()
  isLoading = false;
  @Input() cartEntry: OrderEntry;

  @Output()
  remove = new EventEmitter<OrderEntry>();

  removeEntry(item: OrderEntry) {
    this.remove.emit(item);
  }
}
