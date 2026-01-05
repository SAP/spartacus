/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { OmfConfiguration } from '@spartacus/omf';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class OmfConfig {
  omf?: OmfConfiguration;
}

declare module '@spartacus/core' {
  interface Config extends OmfConfig {}
}
