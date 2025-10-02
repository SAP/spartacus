/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { FocusDirective } from '@spartacus/storefront';
import { IconComponent } from '@spartacus/storefront';
import { ProductImageZoomViewComponent } from '../product-image-zoom-view/product-image-zoom-view.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-product-image-zoom-dialog',
  templateUrl: 'product-image-zoom-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FocusDirective,
    IconComponent,
    ProductImageZoomViewComponent,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class ProductImageZoomDialogComponent {
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

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef
  ) {}

  close(reason = ''): void {
    this.launchDialogService.closeDialog(reason);
  }
}
