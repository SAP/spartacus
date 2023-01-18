/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-resell-dialog',
  templateUrl: './resell-dialog.component.html',
})
export class ResellDialogComponent implements OnInit {
  readonly focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'input',
    focusOnEscape: true,
  };

  readonly ICON_TYPE = ICON_TYPE;
  /** The reason given closing the dialog window without selecting a location */
  readonly CLOSE_WITHOUT_SELECTION = 'CLOSE_WITHOUT_SELECTION';
  /** The reason given closing the dialog window after selecting a location */
  readonly LOCATION_SELECTED = 'LOCATION_SELECTED';

  stage = 'marketplaces';

  get title() {
    switch (this.stage) {
      case 'marketplaces':
        return 'Select a Market';
      case 'login':
        return 'Log in to eBay';
      case 'details':
        return 'Item details';
      default:
        return '';
    }
  }

  constructor(
    protected elementRef: ElementRef,
    protected launchDialogService: LaunchDialogService
  ) {
    // Intentional empty constructor
  }

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if (
      (event.target as any).tagName === this.elementRef.nativeElement.tagName
    ) {
      this.close(this.CLOSE_WITHOUT_SELECTION);
    }
  }

  ngOnInit() {}

  next(reference: string) {
    if (reference === 'login') {
      this.stage = 'details';
    } else {
      this.stage = 'login';
    }
  }

  /**
   * Close the dialog window. This has additional side effects based upon whether
   * we are making a selection on the PDP or in the cart/during checkout.
   *
   * On the PDP:
   *
   * If the dialog is closed without making a selection, then the radio buttons
   * are left on pickup if there already exists an intended pickup location or
   * to delivery if not.
   *
   * Not on the PDP:
   *
   * If the window is closed after making a selection, then the cart is updated
   * to the the new selection.
   *
   * @param reason The reason the dialog window was closed
   */
  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
