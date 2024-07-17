/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { AuthService, OAuthLibWrapperService } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, filter, map, switchMap, take, tap, timer } from 'rxjs';

@Component({
  selector: 'cx-extend-session-dialog',
  templateUrl: './extend-session-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendSessionDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
    focusOnEscape: true,
  };
  timeLeft$: Observable<string>;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected el: ElementRef,
    protected authService: AuthService,
    protected oAuthLibWrapperService: OAuthLibWrapperService
  ) {}

  ngOnInit(): void {
    this.timeLeft$ = this.launchDialogService.data$.pipe(
      filter((data) => !!data.timeLeft),
      switchMap(({ timeLeft }) =>
        timer(0, 1000).pipe(
          take(timeLeft + 1),
          tap((val) => {
            if (val === timeLeft) {
              // If user didn't take any action in the given time, close the modal
              this.dismissModal('Timeout');
            }
          }),
          map((val) => this.formatTime(timeLeft - val))
        )
      )
    );
  }

  continueSession() {
    this.oAuthLibWrapperService.refreshToken();
    this.dismissModal('Continue Session');
  }

  logout() {
    this.authService.logout();
    this.dismissModal('Logout');
  }

  dismissModal(reason?: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}
