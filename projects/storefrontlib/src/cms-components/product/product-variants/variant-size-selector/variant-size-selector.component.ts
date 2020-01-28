import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Product,
  RoutingService,
  BaseOption,
  VariantQualifier,
  VariantOptionQualifier,
} from '@spartacus/core';

@Component({
  selector: 'cx-variant-size-selector',
  templateUrl: './variant-size-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantSizeSelectorComponent {
  constructor(private routingService: RoutingService) {}

  @Input()
  product: Product;

  @Input()
  variants: BaseOption;

  changeSize(code: string): void {
    if (code) {
      this.routingService.go({
        cxRoute: 'product',
        params: { code },
      });
    }
    return null;
  }
  getVariantOptionValue(qualifiers: VariantOptionQualifier[]) {
    const obj = qualifiers.find(q => q.qualifier === VariantQualifier.SIZE);
    return obj ? obj.value : '';
  }
}
