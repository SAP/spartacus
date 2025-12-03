/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { StateUtils, ErrorAction } from "@spartacus/core";

export const ASSISTED_SESSION_REGISTRATION_START = '[Asm] Assisted Session Registration Start';
export const ASSISTED_SESSION_REGISTRATION_START_FAIL = '[Asm] Assisted Session Registration Start Fail';
export const ASSISTED_SESSION_REGISTRATION_START_SUCCESS = '[Asm] Assisted Session Registration Start Success';

export class AssistedSessionRegistrationStart extends StateUtils.LoaderLoadAction {
  readonly type = ASSISTED_SESSION_REGISTRATION_START;
  constructor() {
    super(ASSISTED_SESSION_REGISTRATION_START);
  }
}

export class AssistedSessionRegistrationFail
  extends StateUtils.LoaderFailAction
  implements ErrorAction
{
  readonly type = ASSISTED_SESSION_REGISTRATION_START_FAIL;
  constructor(public payload: any) {
    super(ASSISTED_SESSION_REGISTRATION_START_FAIL, payload);
  }
}

export class AssistedSessionRegistrationSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = ASSISTED_SESSION_REGISTRATION_START_SUCCESS;
  constructor() {
    super(ASSISTED_SESSION_REGISTRATION_START_SUCCESS);
  }
}

export type ASMSessionAction = AssistedSessionRegistrationStart
  | AssistedSessionRegistrationFail
  | AssistedSessionRegistrationSuccess;

