/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { AsmConfig as AsmConfigRoot } from '@spartacus/asm/root';

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
