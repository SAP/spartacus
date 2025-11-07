/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-product-image-zoom-dialog',
  templateUrl: 'product-image-zoom-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProductImageZoomDialogComponent {
  protected launchDialogService = inject(LaunchDialogService);
  protected el = inject(ElementRef);

  iconType = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  @Input() galleryIndex: number;

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  close(reason = ''): void {
    this.launchDialogService.closeDialog(reason);
  }
}
