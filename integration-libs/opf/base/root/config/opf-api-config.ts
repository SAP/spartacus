/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { OpfApiBackendConfig } from '../model/opf-api-backend-config.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class OpfApiConfig extends Config {
  backend?: OpfApiBackendConfig;
}

declare module '@spartacus/core' {
  interface BackendConfig extends OpfApiBackendConfig {}
}
