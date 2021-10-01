import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-spare-parts-filter',
  templateUrl: './spare-parts-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SparePartsFilterComponent {
  /**
   * The filter input value.
   */
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  iconTypes = ICON_TYPE;

  /**
   * Clears the filter input field
   */
  public clear(): void {
    if (this.value !== '') {
      this.value = '';
      this.valueChange.emit(this.value);
    }
  }
}
