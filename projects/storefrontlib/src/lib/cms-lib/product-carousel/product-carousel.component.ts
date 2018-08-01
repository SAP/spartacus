import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import * as fromProductStore from '../../product/store';
import { tap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'y-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent extends AbstractCmsComponent
  implements OnDestroy {
  static componentName = 'ProductCarouselComponent';

  products$: Observable<any[]>;
  pause: boolean;
  firstTime = true;
  alive = true;

  codesSubscription: Subscription;

  @Input()
  productCodes: Array<String>;
  @Input()
  animate = true;

  protected fetchData() {
    const codes = this.getProductCodes();

    if (
      this.contextParameters &&
      this.contextParameters.hasOwnProperty('animate')
    ) {
      this.animate = this.contextParameters.animate;
    }

    if (codes && codes.length > 0) {
      this.codesSubscription = this.store
        .select(fromProductStore.getAllProductCodes)
        .pipe(
          takeWhile(() => this.alive),
          tap(productCodes => {
            if (this.firstTime || productCodes.length === 0) {
              codes
                .filter(code => productCodes.indexOf(code) === -1)
                .forEach(code => {
                  this.store.dispatch(new fromProductStore.LoadProduct(code));
                });
            }
          })
        )
        .subscribe();

      this.firstTime = false;

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

  ngOnDestroy() {
    if (this.codesSubscription) {
      this.codesSubscription.unsubscribe();
      this.alive = false;
    }
    super.ngOnDestroy();
  }
}
