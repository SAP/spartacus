import { UrlCommand, User } from '@spartacus/core';

export interface AsmCustomer360Review {
  productName: string;
  productCode: string;
  createdAt: string;
  updatedAt: string;
  rating: string;
  reviewStatus: string;
  reviewText: string;
}

export interface AsmCustomer360ReviewList {
  reviews: Array<AsmCustomer360Review>;
}

export interface AsmCustomer360StoreLocation {
  address: string;
}

export enum AsmDialogActionType {
  START_SESSION = 'START_SESSION',
  NAVIGATE = 'NAVIGATE',
}

export interface AsmDialogActionEvent {
  selectedUser: User;
  actionType: AsmDialogActionType;
  route?: UrlCommand;
}

import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    ASM_CUSTOMER_360 = 'ASM_CUSTOMER_360',
  }
}
