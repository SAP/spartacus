import { Component, ChangeDetectionStrategy } from '@angular/core';
import { VariantsMultiDimensionalService } from '../../core/services/variants-multi-dimensional.service';

@Component({
  selector: 'cx-order-grid',
  templateUrl: './order-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderGridComponent {
  constructor(
    public multiDimensionalService: VariantsMultiDimensionalService
  ) {}
}
