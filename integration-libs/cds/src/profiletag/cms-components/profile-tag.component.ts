/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileTagInjectorService } from '../services/profile-tag.injector.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-profiletag',
  template: `
    @if (profileTagEnabled$ | async) {}
  `,
  imports: [AsyncPipe],
})
export class ProfileTagComponent {
  private profileTagInjector = inject(ProfileTagInjectorService);

  profileTagEnabled$: Observable<boolean> = this.profileTagInjector.track();
}
