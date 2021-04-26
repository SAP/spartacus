import { Component, ChangeDetectionStrategy } from '@angular/core';
import { VariantsMultiDimensionalService } from '../../core/services/variants-multi-dimensional.service';

@Component({
  selector: 'cx-variants-multi-dimensional',
  templateUrl: './variants-multi-dimensional.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsMultiDimensionalComponent {
  constructor(
    public multiDimensionalService: VariantsMultiDimensionalService
  ) {}
}
