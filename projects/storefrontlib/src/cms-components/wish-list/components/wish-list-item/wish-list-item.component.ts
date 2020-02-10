import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { OrderEntry } from '@spartacus/core';

@Component({
  selector: 'cx-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishListItemComponent implements OnInit {
  hasBaseOptions = false;

  @Input()
  isLoading = false;
  @Input() cartEntry: OrderEntry;

  @Output()
  remove = new EventEmitter<OrderEntry>();

  ngOnInit() {
    this.hasBaseOptions = this.cartEntry.product.baseOptions.length !== 0;
  }

  removeEntry(item: OrderEntry): void {
    this.remove.emit(item);
  }
}
