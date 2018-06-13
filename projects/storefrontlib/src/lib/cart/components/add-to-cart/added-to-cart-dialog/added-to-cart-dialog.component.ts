import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'y-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.scss']
})
export class AddedToCartDialogComponent implements OnInit {
  entry$: Observable<any>;
  cart$: Observable<any>;
  form: FormGroup = this.fb.group({
    entryForm: this.fb.group({
      entryNumber: [0],
      quantity: [0]
    })
  });
  addedQuantity = 1;

  get absQuantity() {
    return Math.abs(this.addedQuantity);
  }

  @Output() updateEntryEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddedToCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.entry$ = this.data.entry$;
    this.cart$ = this.data.cart$;

    this.entry$.subscribe(entry => {
      if (entry !== undefined) {
        const control = this.form.get('entryForm') as FormGroup;
        control.setControl('entryNumber', this.fb.control(entry.entryNumber));
        control.setControl('quantity', this.fb.control(entry.quantity));
      }
    });
  }

  updateEntry(event) {
    // form is the source of truth. event is the previous value
    this.addedQuantity += this.form.value.entryForm.quantity - event.quantity;
    this.updateEntryEvent.emit(this.form);
  }
}
