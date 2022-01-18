import { Component, OnInit } from '@angular/core';
import {
  ActiveCartService,
  Cart,
  CmsParagraphComponent,
  CmsService,
  OrderEntry,
  PromotionLocation,
  SelectiveCartService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-save-for-later',
  templateUrl: './save-for-later.component.html',
})
export class SaveForLaterComponent implements OnInit {
  saveForLater$: Observable<Cart>;
  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  cartLoaded$: Observable<boolean>;
  data$: Observable<CmsParagraphComponent>;
  isCartEmpty$: Observable<boolean>;
  CartLocation = PromotionLocation;

  constructor(
    protected cmsService: CmsService,
    protected cartService: ActiveCartService,
    protected selectiveCartService: SelectiveCartService
  ) {}

  ngOnInit() {
    this.isCartEmpty$ = this.cartService
      .getActive()
      .pipe(map((cart) => !(cart && cart.totalItems && cart.totalItems > 0)));
    this.saveForLater$ = this.selectiveCartService.getCart();
    this.entries$ = this.selectiveCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));
    this.cartLoaded$ = combineLatest([
      this.cartService.isStable(),
      this.selectiveCartService.isStable(),
    ]).pipe(map(([cartLoaded, sflLoaded]) => cartLoaded && sflLoaded));
    this.data$ = this.cmsService.getComponentData(
      'EmptyCartParagraphComponent'
    );
  }

  moveToCart(item: OrderEntry) {
    this.selectiveCartService.removeEntry(item);
    this.cartService.addEntry(item.product.code, item.quantity);
  }
}
