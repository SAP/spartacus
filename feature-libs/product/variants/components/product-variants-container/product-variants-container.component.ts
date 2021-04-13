import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BaseOption,
  isNotNullable,
  Product,
  RequiredPick,
  VariantType,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-product-variants-container',
  templateUrl: './product-variants-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantsContainerComponent implements OnInit {
  constructor(private currentProductService: CurrentProductService) {}

  variants: { [key: string]: BaseOption } = {};
  variantType = VariantType;
  product$: Observable<Product | null>;

  ngOnInit(): void {
    this.product$ = this.currentProductService.getProduct().pipe(
      filter(isNotNullable),
      filter(
        (product): product is RequiredPick<Product, 'baseOptions'> =>
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
