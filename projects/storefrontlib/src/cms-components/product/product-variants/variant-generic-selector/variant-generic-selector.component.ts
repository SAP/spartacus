import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductScope, ProductService, RoutingService } from '@spartacus/core';
import { filter, take } from 'rxjs/operators';
// import { product } from 'projects/assets/src/translations/en/product';

@Component({
  selector: 'cx-variant-generic-selector',
  templateUrl: './variant-generic-selector.component.html',
  styleUrls: ['./variant-generic-selector.component.css']
})
export class VariantGenericSelectorComponent implements OnInit {

  @Input()
  product: Product;

  variants: any[] = [];

  constructor(
    private productService: ProductService,
    private routingService: RoutingService
    ) { }

  ngOnInit() {
    const levels = Array.from({length: this.product.categories.length},(_,k) => k + 1);

    let selectedIndex = 0;
    let productMatrix = this.product.variantMatrix;
    levels.forEach((level, index) => {
      if (level !== 1) {
        productMatrix = productMatrix[selectedIndex].elements;
      }
      this.variants.push(productMatrix);

      productMatrix.forEach(variantCategory => {
        if (variantCategory.variantOption.code === this.product.code) {
          selectedIndex = index;
        }
      });
    });

  }

  changeVariant(code: string): void {
    if (code) {
      this.productService
        .get(code, ProductScope.VARIANTS)
        .pipe(
          filter(Boolean),
          take(1)
        )
        .subscribe((product: Product) => {
          this.routingService.go({
            cxRoute: 'product',
            params: product,
          })
        })
    }
    return null;
  }

}
