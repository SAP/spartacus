import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { OrderEntry } from '@spartacus/core';

@Component({
  selector: 'cx-cancellation-return-items',
  templateUrl: './cancellation-return-items.component.html',
})
export class CancellationReturnItemsComponent implements OnInit {
  @Input() entries: OrderEntry[];
  @Input() confirmation = false;
  @Input() cancelOrder = true;

  form: FormGroup;
  inputsControl: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      entryInput: this.formBuilder.array([]),
    });

    this.inputsControl = this.form.get('entryInput') as FormArray;
    this.entries.forEach(entry => {
      this.inputsControl.push(
        this.formBuilder.group({
          orderEntryNumber: entry.entryNumber,
          quantity: '',
        })
      );
    });

    console.log(this.form.value);
  }

  setComplete() {
    console.log('here');

    for (let i = 0; i < this.entries.length; i++) {
      this.inputsControl.at(i).setValue({
        orderEntryNumber: this.entries[i].entryNumber,
        quantity: this.entries[i].quantity,
      });
    }

    console.log(this.form.value);
  }

  confirm() {
    console.log(this.form.value);
  }
}
