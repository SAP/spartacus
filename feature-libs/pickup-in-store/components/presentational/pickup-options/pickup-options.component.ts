import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PickupOption } from '@spartacus/pickup-in-store/root';

/**
 * The presentational component of a pair of radio buttons for pickup options for a product.
 */
@Component({
  selector: 'cx-pickup-delivery-options',
  templateUrl: './pickup-options.component.html',
})
export class PickupOptionsComponent implements OnChanges {
  /** The selected option, either `'pickup'` or `'delivery'`. */
  @Input() selectedOption: PickupOption;
  /** The location to display in the pickup option. */
  @Input() displayPickupLocation: string | undefined;

  /** Emitted when the selected option is changed. */
  @Output() pickupOptionChange = new EventEmitter<PickupOption>();
  /** Emitted when a new store should be selected. */
  @Output() pickupLocationChange = new EventEmitter<undefined>();

  pickupOptionsForm = new FormGroup({
    pickupOption: new FormControl(),
  });

  ngOnChanges(): void {
    this.pickupOptionsForm.get('pickupOption')?.setValue(this.selectedOption);
  }

  /** Emit a new selected option. */
  onPickupOptionChange(option: PickupOption): void {
    this.pickupOptionChange.emit(option);
  }

  /** Emit to indicate a new store should be selected. */
  onPickupLocationChange(): void {
    this.pickupLocationChange.emit();
  }
}
