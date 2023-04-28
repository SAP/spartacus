/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AnonymousConsentsConfig } from '@spartacus/core';

@Injectable()
export class ConsentManagementService {
  constructor(protected anonymousConsentsConfig: AnonymousConsentsConfig) {}
  fillRequiredConsents(): string[] {
    if (this.anonymousConsentsConfig.anonymousConsents) {
      if (this.anonymousConsentsConfig.anonymousConsents.requiredConsents) {
        return this.anonymousConsentsConfig.anonymousConsents.requiredConsents;
      }
    }
    return [];
  }
}
