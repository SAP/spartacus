import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product, RoutingService } from '@spartacus/core';
import {
  CurrentProductService,
  ProductDetailOutlets,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-bundle-carousel',
  templateUrl: './bundle-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleCarouselComponent {
  @Input() productCode: string;
  @Input() showQuantity = true;

  /**
   * As long as we do not support #5026, we require product input, as we need
   *  a reference to the product model to fetch the stock data.
   */
  @Input() product: Product;

  outlets = ProductDetailOutlets;

  product$: Observable<Product> = this.currentProductService.getProduct();

  constructor(
    protected currentProductService: CurrentProductService,
    protected router: RoutingService
  ) {}

  startBundle(template: any) {
    this.router.go('start-bundle', {
      queryParams: { template: template.id },
    });
  }
}
