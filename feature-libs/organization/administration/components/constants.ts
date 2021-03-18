import { CxEvent } from '@spartacus/core';
import { MessageData } from './shared/message/message.model';

// This is not for the public API
export const ROUTE_PARAMS = {
  budgetCode: 'budgetCode',
  unitCode: 'unitCode',
  costCenterCode: 'costCenterCode',
  userCode: 'userCode',
  userGroupCode: 'userGroupCode',
  permissionCode: 'permissionCode',
  addressCode: 'addressId',
};

// TODO:#my-account-architecture - Number.MAX_VALUE?
export const MAX_OCC_INTEGER_VALUE = 2147483647;

export class OrgMessageEvent extends CxEvent {
  constructor(public message: MessageData) {
    super();
  }
}
