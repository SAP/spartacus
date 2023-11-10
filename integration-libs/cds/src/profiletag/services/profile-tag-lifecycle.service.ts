/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { AuthActions, ConsentService, isNotUndefined } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';
import { ConsentChangedPushEvent } from '../model/profile-tag.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagLifecycleService {
  constructor(
    protected consentService: ConsentService,
    protected config: CdsConfig,
    protected actionsSubject: ActionsSubject
  ) {}

  consentChanged(): Observable<ConsentChangedPushEvent> {
    return this.consentService
      .getConsent(this.config.cds?.consentTemplateId ?? '')
      .pipe(
        filter(isNotUndefined),
        map((profileConsent) => {
          return this.consentService.isConsentGiven(profileConsent);
        }),
        map((granted) => {
          return new ConsentChangedPushEvent(granted);
        })
      );
  }

  loginSuccessful(): Observable<boolean> {
    return this.actionsSubject.pipe(
      filter((action) => action.type === AuthActions.LOGIN),
      map(() => true)
    );
  }
}
