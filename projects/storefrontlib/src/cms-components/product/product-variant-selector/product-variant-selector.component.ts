import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Product,
  RoutingService,
  BaseOption,
  VariantOption,
  VariantType,
  OccConfig,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { tap, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cx-product-variant-selector',
  templateUrl: './product-variant-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantSelectorComponent implements OnInit {
  constructor(
    private currentProductService: CurrentProductService,
    private routingService: RoutingService,
    private config: OccConfig
  ) {}

  styleVariants: VariantOption[];
  sizeVariants: VariantOption[];
  baseUrl = this.config.backend.occ.baseUrl;
  selectedStyle: string;
  product$: Observable<Product>;

  ngOnInit() {
    this.product$ = this.currentProductService.getProduct().pipe(
      filter(v => !!v),
      distinctUntilChanged(),
      tap(product => {
        if (!product.availableForPickup) {
          const variant = this.findApparelVariantAvailableForPickup(
            product.variantOptions
          );
          if (variant) {
            this.routeToVariant(variant.code, true);
          }
        }
        if (
          product.variantType &&
          product.variantType === VariantType.APPAREL_STYLE
        ) {
          this.styleVariants = product.variantOptions;
        }
        if (
          product.baseOptions[0] &&
          product.baseOptions[0].options &&
          Object.keys(product.baseOptions[0].options).length > 0 &&
          product.baseOptions[0].variantType === VariantType.APPAREL_STYLE
        ) {
          this.styleVariants = product.baseOptions[0].options;
          this.sizeVariants = product.variantOptions;
          this.setSelectedApparelStyle(product.baseOptions[0]);
        }
        if (
          product.baseOptions[1] &&
          product.baseOptions[1].options &&
          Object.keys(product.baseOptions[1].options).length > 0 &&
          product.baseOptions[0].variantType === VariantType.APPAREL_SIZE
        ) {
          this.styleVariants = product.baseOptions[1].options;
          this.sizeVariants = product.baseOptions[0].options;
          this.setSelectedApparelStyle(product.baseOptions[1]);
        }
      })
    );
  }

  setSelectedApparelStyle(option: BaseOption) {
    if (option && option.selected) {
      this.selectedStyle = option.selected.code;
    }
  }

  routeToVariant(code: string, replaceUrl?: boolean): void {
    if (code) {
      this.routingService.go(
        {
          cxRoute: 'product',
          params: { code },
        },
        null,
        { replaceUrl: replaceUrl }
      );
    }
    return null;
  }

  private findApparelVariantAvailableForPickup(
    variants: VariantOption[]
  ): VariantOption {
    return variants.find(v => v.stock && v.stock.stockLevel);
  }
}
