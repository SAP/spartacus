import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  @Input()
  more = false;
  @Input()
  quantity = 0;
  @Output()
  updateEntryEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  removeEntryEvent: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    const entryFG = this.form.get('entryForm') as FormGroup;
    this.entry$.pipe(
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
