import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  Product,
  ProductScope,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { filter, take } from 'rxjs/operators';
import { VariantsMultiDimensionalService } from '../../core/services/variants-multi-dimensional.service';

@Component({
  selector: 'cx-variants-multi-dimensional-selector',
  templateUrl: './variants-multi-dimensional-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsMultiDimensionalSelectorComponent implements OnInit {
  @Input()
  product: Product;

  constructor(
    public multiDimensionalService: VariantsMultiDimensionalService,
    private productService: ProductService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.multiDimensionalService.setVariantsGroups(this.product);
  }

  changeVariant(code: string): void {
    if (code) {
      this.productService
        .get(code, ProductScope.VARIANTS_MULTIDIMENSIONAL)
        .pipe(filter(Boolean), take(1))
        .subscribe((product) => {
          this.routingService.go({
            cxRoute: 'product',
            params: product,
          });
          this.product = product;
          this.multiDimensionalService.setVariantsGroups(this.product);
        });
    }
    return;
  }
}
