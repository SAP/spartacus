import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  BaseOption,
  Product,
  RoutingService,
  VariantOptionQualifier,
  VariantQualifier,
} from '@spartacus/core';

@Component({
  selector: 'cx-variant-color-selector',
  templateUrl: './variant-color-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantColorSelectorComponent {
  constructor(private routingService: RoutingService) {}

  @Input()
  product: Product;

  @Input()
  variants: BaseOption;

  changeColor(code: string, name: string): void {
    if (code) {
      this.routingService.go({
        cxRoute: 'product',
        params: { code, name },
      });
    }
    return null;
  }
  getVariantOptionValue(qualifiers: VariantOptionQualifier[]) {
    const obj = qualifiers.find(q => q.qualifier === VariantQualifier.COLOR);
    return obj ? obj.value : '';
  }
}
