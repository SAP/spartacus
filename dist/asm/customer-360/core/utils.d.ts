import { AsmDialogActionEvent, AsmDialogActionType } from '@spartacus/asm/customer-360/root';
import { UrlCommand, User } from '@spartacus/core';
/**
 * Return event from ASM dialog action
 */
export declare function getAsmDialogActionEvent(customerEntry: User, action: AsmDialogActionType, route?: UrlCommand): AsmDialogActionEvent;
