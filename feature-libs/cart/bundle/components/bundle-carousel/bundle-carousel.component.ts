import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, RoutingService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
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
    this.product$
      .pipe(
        switchMap((product) =>
          this.cartBundleService.startBundle({
            productCode: product?.code,
            templateId: template.id,
            quantity: 1,
          })
        ),
        take(1)
      )
      .subscribe((cart) => {
        // TODO: Change the lines below to:
        // this.router.go('bundle', {
        //  queryParams: { cartId: cart?.code },
        // });
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            cartId: cart?.code,
          },
        });
      });
  }
}
