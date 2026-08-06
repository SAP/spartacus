/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ConsentService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';
import { ConsentChangedPushEvent } from '../model/profile-tag.model';
import { LOGIN_EVENTS } from '../tokens/login-events.token';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagLifecycleService {
  private readonly loginEnvelopes$ = inject(LOGIN_EVENTS);

  constructor(
    protected consentService: ConsentService,
    protected config: CdsConfig
  ) {}

  consentChanged(): Observable<ConsentChangedPushEvent> {
    return this.consentService
      .getConsent(this.config.cds?.consentTemplateId ?? '')
      .pipe(
        map((profileConsent) => {
          if (profileConsent) {
            return this.consentService.isConsentGiven(profileConsent);
          } else {
            return false;
          }
        }),
        distinctUntilChanged(),
        map((granted) => {
          return new ConsentChangedPushEvent(granted);
        })
      );
  }

  /**
   * Emits true only for unique login envelopes (deduped by timestamp across the app lifetime).
   */
  loginSuccessful(): Observable<boolean> {
    return this.loginEnvelopes$.pipe(
      distinctUntilChanged((a, b) => a.timestamp === b.timestamp),
      map(() => true)
    );
  }
}
