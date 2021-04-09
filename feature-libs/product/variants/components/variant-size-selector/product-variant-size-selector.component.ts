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
  selector: 'cx-product-variant-size-selector',
  templateUrl: './product-variant-size-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantSizeSelectorComponent {
  constructor(
    private productService: ProductService,
    private routingService: RoutingService
  ) {}

  @Input()
  product: Product;

  @Input()
  variants: BaseOption;

  changeSize(code: string): null {
    if (code) {
      this.productService
        .get(code, ProductScope.LIST)
        .pipe(
          // below call might looks redundant but in fact this data is going to be loaded anyways
          // we're just calling it earlier and storing
          filter((p) => !!p),
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
    const obj = qualifiers.find((q) => q.qualifier === VariantQualifier.SIZE);
    return obj ? obj.value : '';
  }
}
