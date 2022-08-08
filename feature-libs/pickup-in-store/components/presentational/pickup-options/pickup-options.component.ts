import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PickupOption } from '@spartacus/pickup-in-store/root';

@Component({
  selector: 'cx-pickup-delivery-options',
  templateUrl: './pickup-options.component.html',
})
export class PickupOptionsComponent implements OnChanges {
  @Input() selectedOption: PickupOption;
  @Input() displayPickupLocation: string;

  @Output() pickupOptionChange = new EventEmitter<PickupOption>();
  @Output() pickupLocationChange = new EventEmitter<undefined>();

  @ViewChild('open') element: ElementRef;

  deliveryOptionsForm = new FormGroup({
    deliveryOption: new FormControl(),
  });

  ngOnChanges(): void {
    this.deliveryOptionsForm
      .get('deliveryOption')
      ?.setValue(this.selectedOption);
  }

  onPickupOptionChange(option: PickupOption): void {
    this.pickupOptionChange.emit(option);
  }

  onPickupLocationChange(): void {
    this.pickupLocationChange.emit();
  }
}
