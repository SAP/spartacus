import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ActiveCartService,
  Product,
  SelectiveCartService,
} from '@spartacus/core';
import { BundleStarter } from '@spartacus/core/cart/bundle/core';
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

  startBundle(product: Product, template: any) {
    this.activeCartService.startBundle(<BundleStarter>{
      productCode: product.code,
      quantity: 1,
      templateId: template.id,
    });
  }
}
