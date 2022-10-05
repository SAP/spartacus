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
 * @deprecated. To extend, please use ../../root/asm-config.ts
 */
export abstract class AsmConfig extends AsmConfigRoot {}
