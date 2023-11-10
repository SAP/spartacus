/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CdsBackendConnector } from '../connectors/cds-backend-connector';
import { ProfileTagLifecycleService } from './profile-tag-lifecycle.service';
import { ProfileTagEventService } from './profiletag-event.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagInjectorService {
  constructor(
    private profileTagEventTracker: ProfileTagEventService,
    private cdsBackendConnector: CdsBackendConnector,
    private profileTagLifecycleService: ProfileTagLifecycleService
  ) {}

  track(): Observable<boolean> {
    return this.profileTagEventTracker
      .addTracker()
      .pipe(
        switchMap((_) =>
          merge(
            this.profileTagEventTracker.getProfileTagEvents(),
            this.notifyEcOfLoginSuccessful()
          ).pipe(map(() => true))
        )
      );
  }

  private notifyEcOfLoginSuccessful(): Observable<boolean> {
    return this.profileTagLifecycleService.loginSuccessful().pipe(
      switchMap((_) => {
        return this.cdsBackendConnector
          .notifySuccessfulLogin()
          .pipe(map(() => true));
      })
    );
  }
}
