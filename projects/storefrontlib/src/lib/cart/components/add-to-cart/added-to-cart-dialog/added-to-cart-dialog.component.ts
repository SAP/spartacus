import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'y-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.scss']
})
export class AddedToCartDialogComponent implements OnInit {
  entry$: Observable<any>;
  cart$: Observable<any>;
  isLoading$: Observable<boolean>;
  form: FormGroup = this.fb.group({
    entryForm: this.fb.group({
      entryNumber: [0],
      quantity: [0]
    })
  });

  @Output() updateEntryEvent: EventEmitter<any> = new EventEmitter();
  @Output() removeEntryEvent: EventEmitter<any> = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<AddedToCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    const entryFG = this.form.get('entryForm') as FormGroup;

    this.cart$ = this.data.cart$;
    this.isLoading$ = this.data.isLoading$;
    this.entry$ = this.data.entry$.pipe(
      tap((entry: any) => {
        if (entry !== undefined && Object.keys(entry).length !== 0) {
          entryFG.setControl('entryNumber', this.fb.control(entry.entryNumber));
          if (!entryFG.controls['quantity']) {
            // create form control for entry
            entryFG.setControl('quantity', this.fb.control(entry.quantity));
          } else {
            // update form if entry changes
            entryFG.controls['quantity'].setValue(entry.quantity);
          }
        }
      })
    );
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
