import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WishListService } from '@spartacus/core';

@Component({
  selector: 'cx-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishListItemComponent {
  @Input() cartEntry: any;

  constructor(protected wishListService: WishListService) {}

  remove(entry: any) {
    this.wishListService.removeEntry(entry);
  }
}
