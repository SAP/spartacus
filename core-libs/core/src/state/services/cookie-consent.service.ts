/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { WindowRef } from '../../window/window-ref';
import { CookieConsentChangedEvent } from '../event/cookie-consent-changed.event';

/**
 * Manages the user's optional cookie/browser-storage consent.
 *
 * When the user rejects optional cookies, a CookieConsentChangedEvent is
 * dispatched so that state-persistence features and customizations can stop
 * writing to optional storage keys.
 *
 * The consent decision is persisted under a dedicated non-rejectable key
 * (`spartacus⚿cookieConsent`) so it survives page refreshes.
 * Default is accepted (true) for backward compatibility.
 */
@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  protected winRef = inject(WindowRef);
  protected eventService = inject(EventService);

  private readonly CONSENT_KEY = 'spartacus⚿cookieConsent';

  private accepted$ = new BehaviorSubject<boolean>(this.readPersistedConsent());

  isOptionalCookiesAccepted(): Observable<boolean> {
    return this.accepted$.asObservable().pipe(distinctUntilChanged());
  }

  rejectOptionalCookies(): void {
    this.setConsent(false);
  }

  acceptOptionalCookies(): void {
    this.setConsent(true);
  }

  private setConsent(accepted: boolean): void {
    this.winRef.localStorage?.setItem(
      this.CONSENT_KEY,
      JSON.stringify({ accepted })
    );
    this.accepted$.next(accepted);
    const event = new CookieConsentChangedEvent();
    event.accepted = accepted;
    this.eventService.dispatch(event);
  }

  private readPersistedConsent(): boolean {
    try {
      const raw = this.winRef.localStorage?.getItem(this.CONSENT_KEY);
      return raw ? (JSON.parse(raw).accepted ?? true) : true;
    } catch {
      return true;
    }
  }
}
