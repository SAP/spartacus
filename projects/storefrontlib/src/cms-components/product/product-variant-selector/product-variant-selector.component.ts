import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OccConfig, Product, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { tap, filter } from 'rxjs/operators';

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
    tap(p => {
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

      if (this.styleVariants && this.styleVariants.length) {
        this.styleVariants.forEach(style => {
          if (style.code === p.code || style.code === p.baseProduct) {
            this.selectedStyle = style.variantOptionQualifiers[0].value;
          }
        });
      }
    })
  );

  routeToVariant(url: string): void {
    this.routingService.goByUrl(url);
    return null;
  }
}
