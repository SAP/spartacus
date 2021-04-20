import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  Product,
  ProductScope,
  ProductService,
  RoutingService,
  VariantMatrixElement,
} from '@spartacus/core';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'cx-variants-multi-dimensional-selector',
  templateUrl: './variants-multi-dimensional-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsMultiDimensionalSelectorComponent implements OnInit {
  @Input()
  product: Product;

  variants: any[] = [];

  constructor(
    private productService: ProductService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.setVariants();
  }

  changeVariant(code: string): void {
    console.log('changeVariant', code);

    if (code) {
      this.productService
        .get(code, ProductScope.VARIANTS_MULTIDIMENSIONAL)
        .pipe(filter(Boolean), take(1))
        .subscribe((product) => {
          this.routingService.go({
            cxRoute: 'product',
            params: product,
          });
          this.product = product;
          this.setVariants();
        });
    }
    return;
  }

  variantHasImages(variants: VariantMatrixElement[]): boolean {
    return variants.some(
      (variant: VariantMatrixElement) => variant.parentVariantCategory?.hasImage
    );
  }

  private setVariants(): void {
    this.variants = [];

    const levels = Array.from(
      { length: this.product?.categories?.length },
      (_, k) => k + 1
    );

    let productMatrix = JSON.parse(JSON.stringify(this.product.variantMatrix));

    levels.forEach((level) => {
      const currentLevelProductVariantIndex = this.getProductVariantMatrixIndex(
        productMatrix
      );

      if (1 !== level) {
        productMatrix =
          productMatrix[currentLevelProductVariantIndex]?.elements;
      }

      this.variants.push(productMatrix);
    });
  }

  private getProductVariantMatrixIndex(matrix: VariantMatrixElement[]): number {
    let productVariantMatrixIndex: number;
    matrix.forEach((variant: VariantMatrixElement, index: number) => {
      if (variant.variantOption?.code === this.product.code) {
        productVariantMatrixIndex = index;
      }
    });

    return productVariantMatrixIndex;
  }
}
