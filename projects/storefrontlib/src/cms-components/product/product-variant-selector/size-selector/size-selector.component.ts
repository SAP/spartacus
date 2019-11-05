import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  OccConfig,
  Product,
  RoutingService,
  BaseOption,
} from '@spartacus/core';

@Component({
  selector: 'cx-size-selector',
  templateUrl: './size-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantSizeSelectorComponent {
  constructor(
    private config: OccConfig,
    private routingService: RoutingService
  ) {}

  @Input()
  product: Product;

  @Input()
  variants: BaseOption;

  baseUrl = this.config.backend.occ.baseUrl;

  changeSize(code: string): void {
    if (code) {
      this.routingService.go({
        cxRoute: 'product',
        params: { code },
      });
    }
    return null;
  }
}
