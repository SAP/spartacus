/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class S4omConfig {
  s4om?: {
    previewMimeTypes: string[];
  };
}

declare module '@spartacus/core' {
  interface Config extends S4omConfig {
  }
}
