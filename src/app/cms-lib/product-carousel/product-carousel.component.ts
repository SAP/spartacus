import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AbstractCmsComponent } from '../../newcms/components/abstract-cms-component';
import * as fromProductStore from '../../product/store';
import { SearchConfig } from '../../product/search-config';

@Component({
  selector: 'y-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent extends AbstractCmsComponent {
  products$: Observable<any[]>;
  pause: boolean;

  @Input() productCodes: Array<String>;
  @Input() animate = true;

  protected fetchData() {
    // super.fetchData();
    const codes = this.getProductCodes();

    if (
      this.contextParameters &&
      this.contextParameters.hasOwnProperty('animate')
    ) {
      this.animate = this.contextParameters.animate;
    }

    if (codes && codes.length > 0) {
      const query = codes.map(o => o).join(' ');
      console.log(query);
      // TODO: limit data
      /*this.productSearch.searchProducts(query).subscribe(results => {
        this.products = results.products;
        this.cd.detectChanges();
      });*/
      this.products$ = this.store.select(fromProductStore.getSearchResults);
      // this.products$.subscribe(data => console.log(data));

      this.store.dispatch(
        new fromProductStore.SearchProducts({
          queryText: 'memeory',
          searchConfig: new SearchConfig(10)
        })
      );
    }
    super.fetchData();
  }

  getProductCodes(): Array<String> {
    let codes;
    if (this.component && this.component.productCodes) {
      codes = this.component.productCodes.split(' ');
    } else {
      codes = this.productCodes;
    }
    return codes;
  }

  // loadNext() {
  //     console.log('load next');
  //     console.log(this.productPanel);
  // }

  stop() {
    this.pause = true;
  }
  continue() {
    this.pause = false;
  }
}
