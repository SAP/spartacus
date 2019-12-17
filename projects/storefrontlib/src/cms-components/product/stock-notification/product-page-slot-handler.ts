import { Injectable } from '@angular/core';
import { PageSlotHandler } from '../../../cms-structure/page/slot/page-slot-handler';
import { Observable, combineLatest, of } from 'rxjs';
import { ContentSlotComponentData, Product, Page } from '@spartacus/core';
import { filter, switchMap, map } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductPageSlotHandler implements PageSlotHandler {
  constructor(private currentProductService: CurrentProductService) {}

  handle(
    page$: Observable<Page>,
    components$: Observable<ContentSlotComponentData[]>
  ): Observable<ContentSlotComponentData[]> {
    return page$.pipe(
      switchMap(page =>
        page.pageId === 'productDetails'
          ? combineLatest([
              components$,
              this.currentProductService.getProduct().pipe(filter(Boolean)),
            ]).pipe(
              map(([components, product]) =>
                this.isProductOutOfStock(product)
                  ? components.filter(
                      component =>
                        component.uid !== 'AddToCart' &&
                        component.uid !== 'AddToWishListComponent'
                    )
                  : components.filter(
                      component =>
                        component.uid !== 'StockNotificationComponent'
                    )
              )
            )
          : components$
      )
    );
  }

  private isProductOutOfStock(product: Product) {
    return product.stock && product.stock.stockLevelStatus === 'outOfStock';
  }
}
