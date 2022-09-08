import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Address } from '@spartacus/core';
import { LaunchDialogService } from '../../../../../layout';
import { tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../misc/icon/index';

@Component({
  selector: 'cx-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestedAddressDialogComponent {
  iconTypes = ICON_TYPE;

  selectedAddress: Address;

  data$ = this.launchDialogService.data$.pipe(tap(this.setSelectedAddress));

  constructor(protected launchDialogService: LaunchDialogService) {}

  closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  setSelectedAddress(data: {
    suggestedAddresses: Address[];
    enteredAddress: Address;
  }): void {
    this.selectedAddress = data.suggestedAddresses?.length
      ? data.suggestedAddresses[0]
      : data.enteredAddress;
  }
}
