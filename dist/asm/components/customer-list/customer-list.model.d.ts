import { CustomerListColumnActionType } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
export interface CustomerListAction {
    selectedUser: User;
    actionType: CustomerListColumnActionType;
}
