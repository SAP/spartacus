import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  OccConfig,
  Product,
  RoutingService,
  VariantOption,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { tap, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cx-product-variant-selector',
  templateUrl: './product-variant-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantSelectorComponent {
  constructor(
    private routingService: RoutingService,
    private currentProductService: CurrentProductService,
    private config: OccConfig
  ) {}

  styleVariants: any;
  sizeVariants: any;
  sizeGuideLabel = 'Style Guide';
  baseUrl = this.config.backend.occ.baseUrl;
  selectedStyle: string;
  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter(v => !!v),
    distinctUntilChanged(),
    tap(p => {
      if (!p.availableForPickup && p.stock && !p.stock.stockLevel) {
        const variant = this.findApparelVariantAvailableForPickup(
          p.variantOptions
        );
        if (variant) {
          this.routeToVariant(variant.code);
        }
      }

      if (p.variantType && p.variantType === 'ApparelStyleVariantProduct') {
        this.styleVariants = p.variantOptions;
      }
      if (
        p.baseOptions[0] &&
        p.baseOptions[0].options &&
        Object.keys(p.baseOptions[0].options).length > 0 &&
        p.baseOptions[0].variantType === 'ApparelStyleVariantProduct'
      ) {
        this.styleVariants = p.baseOptions[0].options;
        this.sizeVariants = p.variantOptions;
      }
      if (
        p.baseOptions[1] &&
        p.baseOptions[1].options &&
        Object.keys(p.baseOptions[1].options).length > 0 &&
        p.baseOptions[0].variantType === 'ApparelSizeVariantProduct'
      ) {
        this.styleVariants = p.baseOptions[1].options;
        this.sizeVariants = p.baseOptions[0].options;
      }

      this.styleVariants.forEach(style => {
        if (style.code === p.code || style.code === p.baseProduct) {
          this.selectedStyle = style.variantOptionQualifiers[0].value;
        }
      });
    })
  );

  private findApparelVariantAvailableForPickup(
    variants: VariantOption[]
  ): VariantOption {
    let result: VariantOption;
    variants.forEach(variant => {
      if (!result && variant.stock && variant.stock.stockLevel) {
        result = variant;
      }
    });
    return variants.find(v => v.stock && v.stock.stockLevel);
  }

  routeToVariant(code: string): void {
    this.routingService.go({
      cxRoute: 'product',
      params: { code },
    });

    return null;
  }
}
