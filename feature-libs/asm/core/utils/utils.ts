/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsmDialogActionEvent, AsmDialogActionType } from '@spartacus/asm/root';
import { UrlCommand, User } from '@spartacus/core';

/**
 * Return event from ASM dialog action
 */
export function getAsmDialogActionEvent(
  customerEntry: User,
  action: AsmDialogActionType,
  route?: UrlCommand
): AsmDialogActionEvent {
  const event: AsmDialogActionEvent = {
    actionType: action,
    selectedUser: customerEntry,
    route: route,
  };
  return event;
}
