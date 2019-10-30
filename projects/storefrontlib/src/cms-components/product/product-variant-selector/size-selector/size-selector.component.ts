import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { Product } from '../../../../../../core/src/model';

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
  sizeVariants: any; // TODO: Create custom interface?

  @Output() changeSizeEvent = new EventEmitter<string>();

  baseUrl = this.config.backend.occ.baseUrl; // TODO: Get rid of this one

  changeSize(productCode: string) {
    this.changeSizeEvent.next(productCode);
  }
}
