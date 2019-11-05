import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, VariantOption } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { tap, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cx-product-variant-selector',
  templateUrl: './product-variant-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantSelectorComponent {
  constructor(private currentProductService: CurrentProductService) {}

  variants: Array<VariantOption[]> = [];

  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter(product => !!product),
    distinctUntilChanged(),
    tap(product => {
      product.baseOptions.forEach(option => {
        if (option && option.variantType) {
          this.variants[option.variantType] = option;
        }
      });

      if (product.variantType) {
        this.variants[product.variantType] = {
          options: product.variantOptions,
          variantType: product.variantType,
        };
      }
    })
  );
}
