import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {
  OrderEntry,
  CancelOrReturnRequestEntryInput,
  Price,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { OrderCancelOrReturnService } from '../cancel-or-return.service';

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
  inputsControl: FormArray;
  disableConfirmBtn = true;

  constructor(
    private formBuilder: FormBuilder,
    private cancelOrReturnService: OrderCancelOrReturnService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      entryInput: this.formBuilder.array([]),
    });

    this.inputsControl = this.form.get('entryInput') as FormArray;

    this.entries.forEach(entry => {
      this.inputsControl.push(
        this.formBuilder.group({
          orderEntryNumber: entry.entryNumber,
          quantity: this.cancelOrReturnService.getEntryCancelledOrReturnedQty(
            entry
          ),
        })
      );
    });

    this.disableEnableConfirm();
    if (this.entries.length < 1) {
      this.globalMessageService.add(
        { key: 'orderDetails.cancellationAndReturn.noCancellableItems' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  setAll(): void {
    for (let i = 0; i < this.entries.length; i++) {
      this.inputsControl.at(i).setValue({
        orderEntryNumber: this.entries[i].entryNumber,
        quantity: this.cancelOrder
          ? this.entries[i].cancellableQuantity
          : this.entries[i].returnableQuantity,
      });
    }
    this.disableEnableConfirm();
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

  updateQty(): void {
    this.disableEnableConfirm();
  }

  getItemPrice(entry: OrderEntry): Price {
    return this.cancelOrReturnService.getCancelledOrReturnedPrice(entry);
  }

  back(): void {
    this.cancelOrReturnService.backToOrder(this.orderCode);
  }

  protected disableEnableConfirm(): void {
    if (this.entries.length > 0) {
      for (const input of this.form.value.entryInput) {
        if (input.quantity > 0) {
          this.disableConfirmBtn = false;
          return;
        }
      }
    }
    this.disableConfirmBtn = true;
  }
}
