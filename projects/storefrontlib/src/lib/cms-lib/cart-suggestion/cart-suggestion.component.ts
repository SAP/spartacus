import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';

@Component({
  selector: 'y-cart-suggestion',
  templateUrl: './cart-suggestion.component.html',
  styleUrls: ['./cart-suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartSuggestionComponent extends AbstractCmsComponent {
  static componentName = 'CartSuggestionComponent';

  //cart$: Observable<any>;
  //entries$: Observable<any>;

  displayProductPrices: boolean;
  displayProductTitles: boolean;
  filterPurchased: boolean;
  maximumNumberProducts: number;
  title: string;

  protected fetchData() {
    this.displayProductPrices = this.component.displayProductPrices;
    this.displayProductTitles = this.component.displayProductTitles;
    this.filterPurchased = this.component.displayProductTitles;
    this.maximumNumberProducts = this.component.maximumNumberProducts;
    this.title = this.component.title;

    //this.showProductCount = +this.component.shownProductCount;
    //this.banner = this.component.lightboxBannerComponent;

    //this.cart$ = this.store.select(fromCartStore.getActiveCart);
    //this.entries$ = this.store.select(fromCartStore.getEntries);
    console.log(this.title);

    super.fetchData();
  }
}
