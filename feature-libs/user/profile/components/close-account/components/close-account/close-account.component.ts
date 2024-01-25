/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { take } from 'rxjs/operators';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';

@Component({
  selector: 'cx-close-account',
  templateUrl: './close-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountComponent {
  @ViewChild('element') element: ElementRef;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  openModal(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CLOSE_ACCOUNT,
      this.element,
      this.vcr
    );

    dialog?.pipe(take(1)).subscribe();
  }
}
