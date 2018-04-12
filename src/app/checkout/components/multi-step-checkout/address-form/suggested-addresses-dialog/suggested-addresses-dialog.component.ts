import {
  Component,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'y-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  styleUrls: ['./suggested-addresses-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestedAddressDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuggestedAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
