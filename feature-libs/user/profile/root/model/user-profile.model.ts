import { Address, Currency, Language } from '@spartacus/core';

declare module '@spartacus/user/account/root' {
  export interface User {
    currency?: Currency;
    customerId?: string;
    deactivationDate?: Date;
    defaultAddress?: Address;
    displayUid?: string;
    firstName?: string;
    language?: Language;
    lastName?: string;
    name?: string;
    title?: string;
    titleCode?: string;
    uid?: string;
    roles?: string[];
  }
}

export interface Title {
  code?: string;
  name?: string;
}

export interface UserSignUp {
  firstName?: string;
  lastName?: string;
  password?: string;
  titleCode?: string;
  uid?: string;
}
