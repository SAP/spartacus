import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Product,
  RoutingService,
  BaseOption,
  VariantOption,
  VariantType,
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
    private currentProductService: CurrentProductService,
    private routingService: RoutingService
  ) {}

  styleVariants: VariantOption[];
  sizeVariants: VariantOption[];
  selectedStyle: string;

  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter(product => !!product),
    distinctUntilChanged(),
    tap(product => {
      if (
        product.variantType &&
        product.variantType === VariantType.APPAREL_STYLE_VARIANT
      ) {
        this.styleVariants = product.variantOptions;
      }
      if (
        product.baseOptions[0] &&
        product.baseOptions[0].options &&
        Object.keys(product.baseOptions[0].options).length > 0 &&
        product.baseOptions[0].variantType === VariantType.APPAREL_STYLE_VARIANT
      ) {
        this.styleVariants = product.baseOptions[0].options;
        this.sizeVariants = product.variantOptions;
        this.setSelectedApparelStyle(product.baseOptions[0]);
      }
      if (
        product.baseOptions[1] &&
        product.baseOptions[1].options &&
        Object.keys(product.baseOptions[1].options).length > 0 &&
        product.baseOptions[0].variantType === VariantType.APPAREL_SIZE_VARIANT
      ) {
        this.styleVariants = product.baseOptions[1].options;
        this.sizeVariants = product.baseOptions[0].options;
        this.setSelectedApparelStyle(product.baseOptions[1]);
      }
    })
  );

  setSelectedApparelStyle(option: BaseOption) {
    if (option && option.selected) {
      this.selectedStyle = option.selected.code;
    }
  }

  routeToVariant(code: string): void {
    if (code) {
      this.routingService.go({
        cxRoute: 'product',
        params: { code },
      });
    }
    return null;
  }
}
