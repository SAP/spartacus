import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../cart-shared';
import { SaveForLaterService, CartService } from '@spartacus/core';

@Component({
  selector: 'cx-save-for-later-item-list',
  templateUrl: './save-for-later-item-list.component.html',
})
export class SaveForLaterItemListComponent implements OnInit {
  @Input()
  items: Item[] = [];
  @Input()
  saveForLaterLoading = false;

  constructor(
    private cartService: CartService,
    private saveForLaterService: SaveForLaterService
  ) {}

  ngOnInit() {}

  moveItemToCart(item: Item): void {
    this.cartService.addEntry(item.product.code, item.quantity);
    this.removeEntry(item);
  }

  removeEntry(item: Item): void {
    this.saveForLaterService.removeEntry(item);
  }
}
