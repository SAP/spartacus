import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product, BaseOption, VariantType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '@spartacus/storefront';
import { tap, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cx-product-variants',
  templateUrl: './product-variants.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantsComponent implements OnInit {
  constructor(private currentProductService: CurrentProductService) {}

  variants: { [key: string]: BaseOption } = {};
  variantType = VariantType;
  product$: Observable<Product | null>;

  ngOnInit(): void {
    this.product$ = this.currentProductService.getProduct().pipe(
      filter((product: Product | null) => !!(product && product.baseOptions)),
      distinctUntilChanged(),
      tap((product: Product | null) => {
        product?.baseOptions?.forEach((option: BaseOption) => {
          if (option && option.variantType) {
            this.variants[option.variantType] = option;
          }
        });
      })
    );
  }
}
