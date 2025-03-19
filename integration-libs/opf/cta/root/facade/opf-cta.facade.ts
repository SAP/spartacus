/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_CTA_FEATURE } from '../feature-name';
import { OpfCtaScriptsRequest, OpfCtaScriptsResponse } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfCtaFacade,
      feature: OPF_CTA_FEATURE,
      methods: [
        'getCtaScripts',
        'listenScriptReadyEvent',
        'emitScriptReadyEvent',
      ],
    }),
})
export abstract class OpfCtaFacade {
  /**
   * Get call-to-action scripts
   */
  abstract getCtaScripts(
    opfCtaScriptsRequest: OpfCtaScriptsRequest
  ): Observable<OpfCtaScriptsResponse>;
  abstract listenScriptReadyEvent(): Observable<string>;
  abstract emitScriptReadyEvent(scriptIdentifier: string): void;
}
