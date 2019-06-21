import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  OccConfig,
  Product,
  RoutingService,
  VariantOption,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';

@Component({
  selector: 'cx-product-variant-selector',
  templateUrl: './product-variant-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantSelectorComponent {
  constructor(
    private routingService: RoutingService,
    private currentProductService: CurrentProductService,
    private config: OccConfig
  ) {}

  product$: Observable<Product> = this.currentProductService.getProduct();
  sizeGuideLabel = 'Style Guide';
  baseUrl = this.config.backend.occ.baseUrl;

  getVariantName(variant) {
    return variant.variantType.toLowerCase().includes('style')
      ? 'Style'
      : 'Size';
  }

  getSelectedVariantValue(selected: VariantOption): string {
    return selected.variantOptionQualifiers[0].value;
  }

  routeToVariant(url: string): void {
    this.routingService.goByUrl(url);
    return null;
  }
}
