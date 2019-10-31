import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { Product } from '../../../../../../core/src/model';

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
  styleVariants: any; // TODO: Create custom interface?

  @Input()
  selectedStyle: string;

  baseUrl = this.config.backend.occ.baseUrl; // TODO: Get rid of this one
}
