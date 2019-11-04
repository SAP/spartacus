import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OccConfig, Product, VariantOption } from '@spartacus/core';

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
  styleVariants: VariantOption[];

  @Input()
  selectedStyle: string;

  baseUrl = this.config.backend.occ.baseUrl;
}
