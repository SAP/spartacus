import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ActiveCartService,
  Product,
  SelectiveCartService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ProductDetailOutlets } from '../product-outlets.model';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSummaryComponent {
  outlets = ProductDetailOutlets;

  product$: Observable<Product> = this.currentProductService.getProduct();

  constructor(
    protected currentProductService: CurrentProductService,
    protected selectiveCartService: SelectiveCartService,
    protected activeCartService: ActiveCartService
  ) {}

  startBundle(product, bundle) {
    console.log(`starting bundle: ${bundle.name}`, bundle);
    // this.selectiveCartService.startBundle(product.code, 1, bundle.id);
    this.activeCartService.startBundle(product.code, 1, bundle.id);
  }
}
