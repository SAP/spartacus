import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry, WishListService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishListItemComponent {
  @Input()
  compact = false;
  @Input() cartEntry: OrderEntry;

  loading$: Observable<boolean> = this.wishListService.getWishListLoading();

  constructor(protected wishListService: WishListService) {}

  remove(entry: any) {
    this.wishListService.removeEntry(entry);
  }

  log(thing: any) {
    console.log(thing);
  }
}
