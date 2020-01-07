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
  OrderEntry,
  Price,
} from '@spartacus/core';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';
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
  @Input() cancelOrder = true;
  @Input() orderCode: string;

  @Output() confirm = new EventEmitter<CancelOrReturnRequestEntryInput[]>();

  form: FormGroup;

  constructor(
    private cancelOrReturnService: OrderCancelOrReturnService,
    protected orderAmendService: OrderAmendService
  ) {}

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
    return this.cancelOrReturnService.getCancelledOrReturnedPrice(entry);
  }

  back(): void {
    this.cancelOrReturnService.backToOrder(this.orderCode);
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
    return (
      (this.cancelOrder
        ? entry.cancellableQuantity
        : entry.returnableQuantity) || entry.quantity
    );
  }
}
