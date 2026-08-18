/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';

/**
 * Base event for B2B unit selection actions.
 */
export abstract class B2bUnitSelectionEvent extends CxEvent {
  /**
   * User ID of the logged-in B2B customer.
   */
  userId: string;
  /**
   * The unit name (uid) that was selected.
   */
  unitName: string;
}

/**
 * Fired when the user has successfully switched to a new organisation unit.
 * Other domains can listen to this event via `EventService.get(B2bUnitSwitchedEvent)`
 * to react to an org-unit change (e.g. clear caches, reload quotes, etc.).
 */
export class B2bUnitSwitchedEvent extends B2bUnitSelectionEvent {
  /**
   * Event's type
   */
  static readonly type = 'B2bUnitSwitchedEvent';
  /**
   * `true` when the app navigated to the home page after the switch;
   * `false` when the current page was reloaded in-place.
   */
  redirectedToHome: boolean;
}

/**
 * Fired when an attempt to switch organisation unit has failed.
 */
export class B2bUnitSwitchFailedEvent extends B2bUnitSelectionEvent {
  /**
   * Event's type
   */
  static readonly type = 'B2bUnitSwitchFailedEvent';
  /**
   * Normalised error payload.
   */
  error: unknown;
}
