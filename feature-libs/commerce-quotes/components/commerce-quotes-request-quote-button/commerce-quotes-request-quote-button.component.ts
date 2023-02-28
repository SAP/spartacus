/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-commerce-quotes-request-quote-button',
  templateUrl: './commerce-quotes-request-quote-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesRequestQuoteButtonComponent {
  @ViewChild('element') element: ElementRef;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  showDialog() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.REQUEST_QUOTE,
      this.element,
      this.vcr
    );
    dialog?.pipe(take(1)).subscribe();
  }
}
