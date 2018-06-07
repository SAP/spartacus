import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'y-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.scss']
})
export class AddedToCartDialogComponent implements OnInit {
  entry$: Observable<any>;
  cart$: Observable<any>;
  form: FormGroup;
  addedQuantity: number;

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
        this.form = this.fb.group({
          entryArry: this.fb.array([
            this.fb.group({
              entryNumber: entry.entryNumber,
              quantity: entry.quantity
            })
          ])
        });
      }
    });
  }

  updateEntry(event) {
    this.updateEntryEvent.emit({ entry: event, form: this.form });
  }
}
