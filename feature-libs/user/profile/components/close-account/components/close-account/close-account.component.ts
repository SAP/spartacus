// SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { CloseAccountModalComponent } from '../close-account-modal/close-account-modal.component';

@Component({
  selector: 'cx-close-account',
  templateUrl: './close-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountComponent {
  modal: any;
  constructor(protected modalService: ModalService) {}

  openModal(): void {
    this.modal = this.modalService.open(CloseAccountModalComponent, {
      centered: true,
    }).componentInstance;
  }
}
