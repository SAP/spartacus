/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AnonymousConsentsConfig, ConsentTemplate } from '@spartacus/core';

@Injectable()
export class ConsentManagementComponentService {
  constructor(protected anonymousConsentsConfig?: AnonymousConsentsConfig) {}
  /**
   * Returns the list of mandatory consents
   * @param _templateList - list of all active consents. This parameter is not needed in core
   * implementation. But is needed in CDC implementation to fetch only the required consents
   * from this list
   * @returns array of consent IDs
   */
  getRequiredConsents(_templateList: ConsentTemplate[]): string[] {
    return (
      this.anonymousConsentsConfig?.anonymousConsents?.requiredConsents || []
    );
  }
}
