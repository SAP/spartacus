import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'y-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  styleUrls: ['./suggested-addresses-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestedAddressDialogComponent {
  public data: any;
  constructor() {}
}
