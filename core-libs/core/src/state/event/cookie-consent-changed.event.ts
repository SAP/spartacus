/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '../../event/cx-event';

/**
 * Fired when the user accepts or rejects optional browser storage (cookies,
 * localStorage, sessionStorage). Customizations can subscribe via
 * EventService.get(CookieConsentChangedEvent) to clear their own optional
 * storage entries.
 */
export class CookieConsentChangedEvent extends CxEvent {
  static readonly type = 'CookieConsentChangedEvent';
  /** true = user accepted optional cookies/storage; false = user rejected */
  accepted: boolean;
}
