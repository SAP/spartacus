/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_CTA_FEATURE } from '../feature-name';
import { CtaScriptsRequest, CtaScriptsResponse } from '../model';

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
    ctaScriptsRequest: CtaScriptsRequest
  ): Observable<CtaScriptsResponse>;
  abstract listenScriptReadyEvent(): Observable<string>;
  abstract emitScriptReadyEvent(scriptIdentifier: string): void;
}
