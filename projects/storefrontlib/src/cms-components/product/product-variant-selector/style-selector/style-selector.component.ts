import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OccConfig, Product, BaseOption } from '@spartacus/core';

@Component({
  selector: 'cx-style-selector',
  templateUrl: './style-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantStyleSelectorComponent {
  constructor(private config: OccConfig) {}

  @Input()
  product: Product;

  @Input()
  variants: BaseOption;

  baseUrl = this.config.backend.occ.baseUrl;
}
