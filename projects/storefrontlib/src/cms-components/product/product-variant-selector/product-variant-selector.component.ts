import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, BaseOption, VariantType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { tap, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cx-product-variant-selector',
  templateUrl: './product-variant-selector.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductVariantSelectorComponent {
  constructor(private currentProductService: CurrentProductService) {}

  variants: BaseOption[];

  variantType = VariantType;

  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter(product => !!product),
    distinctUntilChanged(),
    tap(product => {
      this.variants = [];
      product.baseOptions.forEach(option => {
        if (option && option.variantType) {
          this.variants.push(option);
        }
      });

      if (product.variantType) {
        this.variants.push({
          options: product.variantOptions,
          variantType: product.variantType,
        });
      }
    })
  );
}
