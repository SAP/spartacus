/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

interface ExternalRoutesConfigDefinition {
  internal?: string[];
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ExternalRoutesConfig {
  routing?: ExternalRoutesConfigDefinition;
}

declare module '../configurable-routes/config/routing-config' {
  interface RoutingConfigDefinition extends ExternalRoutesConfigDefinition {}
}
