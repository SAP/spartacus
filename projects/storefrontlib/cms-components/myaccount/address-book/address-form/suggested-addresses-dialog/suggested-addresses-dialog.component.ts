import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Address } from '@spartacus/core';
import { ModalService } from '../../../../../shared/components/modal/index';
import { ICON_TYPE } from '../../../../misc/icon/index';

@Component({
  selector: 'cx-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestedAddressDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;

  constructor(protected modalService: ModalService) {}

  @Input()
  suggestedAddresses: Address[];
  @Input()
  enteredAddress: Address;

  selectedAddress: Address;

  ngOnInit(): void {
    this.selectedAddress = this.suggestedAddresses.length
      ? this.suggestedAddresses[0]
      : this.enteredAddress;
  }

  closeModal(reason?: any): void {
    this.modalService.closeActiveModal(reason);
  }
}
