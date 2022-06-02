import { CustomerListColumnActionType } from '@spartacus/asm/root';
import { User } from '@spartacus/core';

export interface CustomerListActionEvent {
  selectedUser: User;
  actionType: CustomerListColumnActionType;
}
