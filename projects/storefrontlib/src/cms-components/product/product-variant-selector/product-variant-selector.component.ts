import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { tap, filter, distinctUntilChanged } from 'rxjs/operators';
import { BaseOption } from '../../../../../core/src/model';

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

  styleVariants: any;
  sizeVariants: any;
  selectedStyle: string;

  // TODO: Refactor entire pipe content
  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter(v => !!v),
    distinctUntilChanged(),
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
        this.setSelectedApparelStyle(p.baseOptions[0]);
      }
      if (
        p.baseOptions[1] &&
        p.baseOptions[1].options &&
        Object.keys(p.baseOptions[1].options).length > 0 &&
        p.baseOptions[0].variantType === 'ApparelSizeVariantProduct'
      ) {
        this.styleVariants = p.baseOptions[1].options;
        this.sizeVariants = p.baseOptions[0].options;
        this.setSelectedApparelStyle(p.baseOptions[1]);
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
