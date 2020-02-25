import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseOption, Product, VariantType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-product-variants',
  templateUrl: './product-variants.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantsComponent implements OnInit {
  constructor(private currentProductService: CurrentProductService) {}

  variants: BaseOption[] = [];
  variantType = VariantType;
  product$: Observable<Product>;

  ngOnInit(): void {
    this.product$ = this.currentProductService.getProduct().pipe(
      filter(product => !!(product && product.baseOptions)),
      distinctUntilChanged(),
      tap(product => {
        product.baseOptions.forEach(option => {
          if (option && option.variantType) {
            this.variants[option.variantType] = option;
          }
        });
      })
    );
  }
}
