import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Product,
  RoutingService,
  BaseOption,
  VariantQualifier,
  VariantOptionQualifier,
  ProductService,
  ProductScope,
} from '@spartacus/core';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'cx-variant-size-selector',
  templateUrl: './variant-size-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantSizeSelectorComponent {
  constructor(
    private productService: ProductService,
    private routingService: RoutingService
  ) {}

  @Input()
  product: Product;

  @Input()
  variants: BaseOption;

  changeSize(code: string): void {
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
            params: product,
          });
        });
    }
    return null;
  }
  getVariantOptionValue(qualifiers: VariantOptionQualifier[]) {
    const obj = qualifiers.find(q => q.qualifier === VariantQualifier.SIZE);
    return obj ? obj.value : '';
  }
}
