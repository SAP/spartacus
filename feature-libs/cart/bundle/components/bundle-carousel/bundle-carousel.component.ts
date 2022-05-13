import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product, RoutingService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { BundleTemplate } from '../../core/model';

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
    protected router: RoutingService
  ) {}

  startBundle(template: BundleTemplate) {
    this.router.go('start-bundle', {
      queryParams: { template: template.id },
    });
  }
}
