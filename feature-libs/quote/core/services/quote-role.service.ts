/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { QuoteRoleType, QuoteState } from '@spartacus/quote/root';

@Injectable({
  providedIn: 'root',
})
export class QuoteRoleService {
  stateToRole(state: QuoteState): QuoteRoleType {
    let foundRole: QuoteRoleType = QuoteRoleType.NOT_AVAILABLE;
    Object.values(QuoteRoleType).forEach((role) => {
      if (state.startsWith(role + '_')) {
        foundRole = role;
      }
    });
    return foundRole;
  }
}
