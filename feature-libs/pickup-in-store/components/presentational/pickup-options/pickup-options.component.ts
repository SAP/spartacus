import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

export type PickupOption = 'delivery' | 'pickup';

@Component({
  selector: 'cx-pickup-delivery-options',
  templateUrl: './pickup-options.component.html',
})
export class PickupOptionsComponent implements OnInit {
  @Input() selectedOption: Observable<PickupOption>;
  @Input() displayPickupLocation: string;

  @Output() pickupOptionChange = new EventEmitter<PickupOption>();
  @Output() pickupLocationChange = new EventEmitter<undefined>();

  @ViewChild('open') element: ElementRef;
  subscription = new Subscription();

  deliveryOptionsForm = new FormGroup({
    deliveryOption: new FormControl(),
  });

  ngOnInit() {
    this.selectedOption.subscribe((option) => {
      this.deliveryOptionsForm.get('deliveryOption')?.setValue(option);
    });
  }

  onPickupOptionChange(option: PickupOption): void {
    this.pickupOptionChange.emit(option);
  }

  onPickupLocationChange(): void {
    this.pickupLocationChange.emit();
  }
}
