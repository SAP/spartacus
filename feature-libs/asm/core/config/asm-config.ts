/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AsmConfig as AsmConfigRoot } from '@spartacus/asm/root';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
/**
 * In an upcoming major version, this will be moved officially to @spartacus/asm/root. (CXSPA-1449)
 */
export abstract class AsmConfig extends AsmConfigRoot {}

declare module '@spartacus/core' {
  interface Config extends AsmConfig {}
}
