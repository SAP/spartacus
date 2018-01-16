import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AbstractCmsComponent } from '../../newcms/components/abstract-cms-component';
import * as fromProductStore from '../../product/store';
import { SearchConfig } from '../../product/search-config';

@Component({
  selector: 'y-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent extends AbstractCmsComponent {
  products$: Observable<any[]>;
  pause: boolean;

  @Input() productCodes: Array<String>;
  @Input() animate = true;

  protected fetchData() {
    const codes = this.getProductCodes();

    if (
      this.contextParameters &&
      this.contextParameters.hasOwnProperty('animate')
    ) {
      this.animate = this.contextParameters.animate;
    }

    if (codes && codes.length > 0) {
      let cachedProducts;
      this.store
        .select(fromProductStore.getAllProductCodes)
        .subscribe(data => (cachedProducts = data));

      codes
        .filter(code => cachedProducts.indexOf(code) === -1)
        .forEach(code =>
          this.store.dispatch(new fromProductStore.LoadProduct(code))
        );

      this.products$ = this.store.select(
        fromProductStore.getSelectedProductsFactory(codes)
      );
    }
    super.fetchData();
  }

  getProductCodes(): Array<string> {
    let codes;
    if (this.component && this.component.productCodes) {
      codes = this.component.productCodes.split(' ');
    } else {
      codes = this.productCodes;
    }
    return codes;
  }

  stop() {
    this.pause = true;
  }
  continue() {
    this.pause = false;
  }
}
