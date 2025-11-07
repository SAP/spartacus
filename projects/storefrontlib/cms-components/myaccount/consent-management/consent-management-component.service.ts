/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { AnonymousConsentsConfig, ConsentTemplate } from '@spartacus/core';

@Injectable()
export class ConsentManagementComponentService {
  protected anonymousConsentsConfig? = inject(AnonymousConsentsConfig);

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
