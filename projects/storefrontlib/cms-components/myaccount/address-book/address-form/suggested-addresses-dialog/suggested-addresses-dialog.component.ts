/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { Address } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { FocusConfig, LaunchDialogService } from '../../../../../layout';
import { ICON_TYPE } from '../../../../misc/icon/index';

@Component({
  selector: 'cx-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestedAddressDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  selectedAddress: Address;

  data$ = this.launchDialogService.data$;

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

  ngOnInit(): void {
    this.data$.pipe(take(1)).subscribe((data) => this.setSelectedAddress(data));
  }

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
