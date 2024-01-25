/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import { ICON_TYPE, FocusConfig } from '@spartacus/storefront';

@Component({
  selector: 'cx-clear-cart-dialog',
  templateUrl: './clear-cart-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearCartDialogComponent implements OnDestroy {
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button.btn-primary',
    focusOnEscape: true,
  };

  isClearing: boolean = false;

  iconTypes = ICON_TYPE;

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected el: ElementRef,
    protected clearCartDialogComponentService: ClearCartDialogComponentService
  ) {}

  clearCart(): void {
    this.isClearing = true;
    this.clearCartDialogComponentService.deleteActiveCart();
  }

  close(reason: string): void {
    this.clearCartDialogComponentService.closeDialog(reason);
  }

  ngOnDestroy(): void {
    this.close('close dialog on component destroy');
  }
}
