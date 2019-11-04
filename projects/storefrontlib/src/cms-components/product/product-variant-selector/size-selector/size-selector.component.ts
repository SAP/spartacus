import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { OccConfig, Product, VariantOption } from '@spartacus/core';

@Component({
  selector: 'cx-size-selector',
  templateUrl: './size-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantSizeSelectorComponent {
  constructor(private config: OccConfig) {}

  @Input()
  product: Product;

  @Input()
  sizeVariants: VariantOption[];

  @Output() changeSizeEvent = new EventEmitter<string>();

  baseUrl = this.config.backend.occ.baseUrl;

  changeSize(productCode: string) {
    this.changeSizeEvent.next(productCode);
  }
}
