import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BaseOption,
  isNotNull,
  Product,
  Required,
  VariantType,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';

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
      filter(isNotNull),
      filter(
        (product): product is Required<Product, 'baseOptions'> =>
          !!product.baseOptions
      ),
      distinctUntilChanged(),
      tap((product) => {
        product.baseOptions.forEach((option: BaseOption) => {
          if (option?.variantType) {
            this.variants[option.variantType] = option;
          }
        });
      })
    );
  }
}
