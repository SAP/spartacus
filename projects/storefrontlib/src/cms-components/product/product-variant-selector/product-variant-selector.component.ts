import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  RoutingService,
  Product,
  BaseOption,
  VariantType,
  VariantOption,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { tap, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cx-product-variant-selector',
  templateUrl: './product-variant-selector.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductVariantSelectorComponent implements OnInit {
  constructor(
    private currentProductService: CurrentProductService,
    private routingService: RoutingService
  ) {}

  variants: BaseOption[];
  variantType = VariantType;
  product$: Observable<Product>;

  ngOnInit(): void {
    this.product$ = this.currentProductService.getProduct().pipe(
      filter(product => !!product),
      distinctUntilChanged(),
      tap(product => {
        this.variants = [];
        product.baseOptions.forEach(option => {
          if (option && option.variantType) {
            this.variants.push(option);
          }
        });

        if (!product.purchasable) {
          const purchasableVariant = this.findPurchasableVariant(
            product.variantOptions
          );

          if (purchasableVariant) {
            this.routingService.go(
              {
                cxRoute: 'product',
                params: { code: purchasableVariant.code },
              },
              null,
              { replaceUrl: true }
            );
          }
        }
      })
    );
  }

  private findPurchasableVariant(variants: VariantOption[]): VariantOption {
    const results: VariantOption[] = variants.filter(variant => {
      return variant.stock && variant.stock.stockLevel ? variant : false;
    });
    return !results.length && variants.length ? variants[0] : results[0];
  }
}
