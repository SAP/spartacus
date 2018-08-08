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

  @Output()
  updateEntryEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  removeEntryEvent: EventEmitter<any> = new EventEmitter();
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
      const entryFG = this.form.get('entryForm') as FormGroup;
      if (entry !== undefined) {
        entryFG.setControl('entryNumber', this.fb.control(entry.entryNumber));
        if (!entryFG.controls['quantity']) {
          // create form control for entry
          entryFG.setControl('quantity', this.fb.control(entry.quantity));
        } else {
          // update form if entry changes
          entryFG.controls['quantity'].setValue(entry.quantity);
        }
      }
    });
  }

  updateEntry({
    entry,
    updatedQuantity
  }: {
    entry: any;
    updatedQuantity: number;
  }) {
    this.updateEntryEvent.emit({ entry, updatedQuantity });
  }

  removeEntry(entry) {
    this.removeEntryEvent.emit(entry);
  }
}
