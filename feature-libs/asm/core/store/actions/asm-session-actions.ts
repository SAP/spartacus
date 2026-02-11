/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { AsmSessionCreationOptions } from '@spartacus/asm/root';
import { StateUtils, ErrorAction } from '@spartacus/core';

export const ASSISTED_SESSION_CREATION =
  '[Asm] Assisted Session Event creation';
export const ASSISTED_SESSION_CREATION_FAIL =
  '[Asm] Assisted Session Event creation Fail';
export const ASSISTED_SESSION_CREATION_SUCCESS =
  '[Asm] Assisted Session Event creation Success';

export class AsmSessionCreationAction extends StateUtils.LoaderLoadAction {
  readonly type = ASSISTED_SESSION_CREATION;
  constructor(public payload: AsmSessionCreationOptions) {
    super(ASSISTED_SESSION_CREATION);
  }
}

export class AsmSessionCreationFail
  extends StateUtils.LoaderFailAction
  implements ErrorAction
{
  readonly type = ASSISTED_SESSION_CREATION_FAIL;
  constructor(public payload: any) {
    super(ASSISTED_SESSION_CREATION_FAIL, payload);
  }
}

export class AsmSessionCreationSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = ASSISTED_SESSION_CREATION_SUCCESS;
  constructor() {
    super(ASSISTED_SESSION_CREATION_SUCCESS);
  }
}

export type AsmSessionAction =
  | AsmSessionCreationAction
  | AsmSessionCreationFail
  | AsmSessionCreationSuccess;
