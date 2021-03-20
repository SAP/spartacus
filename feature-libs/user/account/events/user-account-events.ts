import { User } from '@spartacus/user/account/root';
import { CxEvent } from '@spartacus/core';

export abstract class UserAccountEvent extends CxEvent {
  user: User;
}

export class UserAccountChangedEvent extends UserAccountEvent {
  static readonly type = 'UserAccountChangedEvent';
}
