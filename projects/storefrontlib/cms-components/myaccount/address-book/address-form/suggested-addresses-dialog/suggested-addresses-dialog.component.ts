import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Address } from '@spartacus/core';
import { FocusConfig, LaunchDialogService } from '../../../../../layout';
import { tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../misc/icon/index';

@Component({
  selector: 'cx-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestedAddressDialogComponent {
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  selectedAddress: Address;

  data$ = this.launchDialogService.data$.pipe(tap(this.setSelectedAddress));

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.closeModal('Cross click');
    }
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {}

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
