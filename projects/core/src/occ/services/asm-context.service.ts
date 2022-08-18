/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OCC_ASM_TOKEN, OccAsmContext } from '../utils';

/**
 * Used to provide an ASM context for certain endpoints.
 * For example, if an endpoint needs to pass in the emulated user's ID to resolve access issues,
 * you should create a context.
 * @see feature-libs/asm/root/interceptors/user-id.interceptor.ts
 */
@Injectable({
  providedIn: 'root',
})
export class AsmContextService {
  createContext(contextObj: OccAsmContext): HttpContext {
    const context = new HttpContext();
    return context.set(OCC_ASM_TOKEN, contextObj);
  }
}
