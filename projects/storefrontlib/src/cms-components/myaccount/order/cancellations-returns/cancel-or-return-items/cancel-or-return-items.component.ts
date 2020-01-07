import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CancelOrReturnRequestEntryInput,
  Order,
  OrderEntry,
  Price,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderAmendService } from '../order-amend.service';

function ValidateQuantity(control: FormControl) {
  if (!Object.keys(control.value).find(key => Number(control.value[key]) > 0)) {
    return { required: true };
  }
  return null;
}

@Component({
  selector: 'cx-cancel-or-return-items',
  templateUrl: './cancel-or-return-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelOrReturnItemsComponent implements OnInit {
  @Input() entries: OrderEntry[];
  @Input() confirmRequest = false;

  @Output() confirm = new EventEmitter<CancelOrReturnRequestEntryInput[]>();

  form: FormGroup;

  constructor(protected orderAmendService: OrderAmendService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  getControl(entry: OrderEntry): FormControl {
    return <FormControl>this.form.get(entry.entryNumber.toString());
  }

  setAll(): void {
    this.entries.forEach(entry =>
      this.getControl(entry).setValue(this.getMaxAmmendQuantity(entry))
    );
  }

  getOrder(): Observable<Order> {
    return this.orderAmendService.getOrder();
  }

  confirmEntryInputs(): void {
    const inputs: CancelOrReturnRequestEntryInput[] = [];
    for (const input of this.form.value.entryInput) {
      if (input.quantity > 0) {
        inputs.push(input);
      }
    }
    this.confirm.emit(inputs);
  }

  getItemPrice(entry: OrderEntry): Price {
    return this.orderAmendService.getEntryPrice(entry);
  }

  /**
   * Builds the form for the given order entries
   */
  private buildForm(): void {
    this.form = new FormGroup({}, { validators: [ValidateQuantity] });

    this.entries.forEach(entry => {
      const key = entry.entryNumber.toString();
      this.form.addControl(
        key,
        new FormControl(0, {
          validators: [
            Validators.min(1),
            Validators.max(this.getMaxAmmendQuantity(entry)),
          ],
        })
      );
    });
  }

  getMaxAmmendQuantity(entry: OrderEntry) {
    return this.orderAmendService.getMaxAmmendQuantity(entry);
  }

  isCancellation() {
    return this.orderAmendService.isCancellation();
  }
}
