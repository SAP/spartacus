/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfCtaScriptsRequest,
  OpfCtaScriptsResponse,
} from '@spartacus/opf/cta/root';
import { Observable } from 'rxjs';

export abstract class OpfCtaAdapter {
  /**
   * Abstract method used to get CTA scripts list
   */
  abstract getCtaScripts(
    opfCtaScriptsRequest: OpfCtaScriptsRequest
  ): Observable<OpfCtaScriptsResponse>;
}
