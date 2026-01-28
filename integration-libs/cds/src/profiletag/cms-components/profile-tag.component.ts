/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileTagInjectorService } from '../services/profile-tag.injector.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-profiletag',
  template: `
    <ng-container *ngIf="profileTagEnabled$ | async"></ng-container>
  `,
  imports: [NgIf, AsyncPipe],
})
export class ProfileTagComponent {
  profileTagEnabled$: Observable<boolean> = this.profileTagInjector.track();
  constructor(private profileTagInjector: ProfileTagInjectorService) {}
}
