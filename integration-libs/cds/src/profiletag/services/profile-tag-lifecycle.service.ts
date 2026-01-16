/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import {
  AuthActions,
  ConsentService,
  FeatureConfigService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { CdsConfig } from '../../config/cds-config';
import { ConsentChangedPushEvent } from '../model/profile-tag.model';
import { LOGIN_EVENTS } from '../tokens/login-events.token';

@Injectable({
  providedIn: 'root',
})
export class ProfileTagLifecycleService {
  private readonly loginEnvelopes$ = inject(LOGIN_EVENTS);
  private readonly featureConfigService = inject(FeatureConfigService);

  constructor(
    protected consentService: ConsentService,
    protected config: CdsConfig,
    protected actionsSubject: ActionsSubject
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
    const cdsLoginEventsToken = this.featureConfigService.isEnabled(
      'cdsLoginEventsToken'
    );
    if (cdsLoginEventsToken) {
      return this.loginEnvelopes$.pipe(
        distinctUntilChanged((a, b) => a.timestamp === b.timestamp),
        map(() => true)
      );
    }
    return this.actionsSubject.pipe(
      filter((action) => action.type === AuthActions.LOGIN),
      map(() => true)
    );
  }
}
