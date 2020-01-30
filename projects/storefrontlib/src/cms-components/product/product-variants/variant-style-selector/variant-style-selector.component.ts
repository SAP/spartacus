import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  OccConfig,
  BaseOption,
  VariantQualifier,
  VariantOptionQualifier,
  Product,
  ProductService,
  ProductScope,
  RoutingService,
} from '@spartacus/core';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'cx-variant-style-selector',
  templateUrl: './variant-style-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantStyleSelectorComponent {
  constructor(
    private config: OccConfig,
    private productService: ProductService,
    private routingService: RoutingService
  ) {}

  variantQualifier = VariantQualifier;

  @Input()
  variants: BaseOption;

  getVariantOptionValue(qualifiers: VariantOptionQualifier[]) {
    const obj = qualifiers.find(q => q.qualifier === VariantQualifier.STYLE);
    return obj ? obj.value : '';
  }

  getVariantThumbnailUrl(
    variantOptionQualifiers: VariantOptionQualifier[]
  ): string {
    const qualifier = variantOptionQualifiers.find(item => item.image);
    return qualifier
      ? `${this.config.backend.occ.baseUrl}${qualifier.image.url}`
      : '';
  }

  changeStyle(code: string): void {
    if (code) {
      // consider adding 'route' scope
      this.productService
        .get(code, ProductScope.LIST)
        .pipe(
          // add comment
          filter(Boolean),
          take(1)
        )
        .subscribe((product: Product) => {
          this.routingService.go({
            cxRoute: 'product',
            params: { code, name: product.name },
          });
        });
    }
    return null;
  }
}
