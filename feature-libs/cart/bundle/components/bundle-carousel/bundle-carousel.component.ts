import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, RoutingService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BundleTemplate } from '../../core/model';
import { CartBundleService } from '../../core/services';

@Component({
  selector: 'cx-bundle-carousel',
  templateUrl: './bundle-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleCarouselComponent {
  @Input() product$: Observable<Product | null> =
    this.currentProductService.getProduct();

  constructor(
    protected currentProductService: CurrentProductService,
    protected routingService: RoutingService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected cartBundleService: CartBundleService
  ) {}

  startBundle(template: BundleTemplate) {
    this.product$.pipe(take(1)).subscribe((product) =>
      this.cartBundleService.startBundle({
        productCode: product?.code,
        templateId: template.id,
        quantity: 1,
      })
    );
  }
}
