import { B2BUser } from '@spartacus/core';
import { LoadStatus } from './organization-item-status';

export interface UserCreationNotifierData {
  status: LoadStatus;
  item: B2BUser | undefined;
}
