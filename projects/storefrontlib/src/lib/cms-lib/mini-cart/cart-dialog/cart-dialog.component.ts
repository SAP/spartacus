import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'y-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDialogComponent {
  onDelete = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  removeEntry(entry, event: Event) {
    this.onDelete.emit(entry);
  }
}
