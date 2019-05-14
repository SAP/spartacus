import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '@spartacus/core';
import { ICON_TYPES } from '../../../../../../../cms-components/misc/icon/index';

@Component({
  selector: 'cx-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestedAddressDialogComponent implements OnInit {
  iconTypes = ICON_TYPES;

  constructor(public activeModal: NgbActiveModal) {}

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
}
