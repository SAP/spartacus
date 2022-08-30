/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Address } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { ModalService } from '../../../../../shared/components/modal/index';
import { ICON_TYPE } from '../../../../misc/icon/index';

@Component({
  selector: 'cx-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestedAddressDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;

  constructor(protected modalService: ModalService, protected launchDialogService: LaunchDialogService) {
    this.launchDialogService.data$.subscribe((data) => {
      console.log(data);
      this.suggestedAddresses = data.suggestedAddresses;
      this.enteredAddress = data.enteredAddress;
    });
  }

  @Input()
  suggestedAddresses: Address[];
  @Input()
  enteredAddress: Address;

  selectedAddress: Address;

  ngOnInit(): void {
    console.log("Oninit called");
    this.launchDialogService.data$.subscribe((data) => {
      console.log(data);
      this.suggestedAddresses = data.suggestedAddresses;
      this.enteredAddress = data.enteredAddress;

      this.selectedAddress = this.suggestedAddresses?.length
      ? this.suggestedAddresses[0]
      : this.enteredAddress;

    });
  }

  closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }
}
