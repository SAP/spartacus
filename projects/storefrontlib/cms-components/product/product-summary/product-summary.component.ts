import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope } from '@spartacus/core';
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

  product$: Observable<Product> = this.currentProductService.getProduct([
    ProductScope.DETAILS,
    ProductScope.PRICE,
  ]);

  constructor(protected currentProductService: CurrentProductService) {}
}
