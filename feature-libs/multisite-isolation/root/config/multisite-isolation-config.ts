/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class MultisiteIsolationConfig extends OccConfig {
  multisiteIsolation?: {
    enabled?: boolean;
    isolationDetection?: boolean;
    decorator?: string;
  };
}

declare module '@spartacus/core' {
  interface Config extends MultisiteIsolationConfig {}
}
