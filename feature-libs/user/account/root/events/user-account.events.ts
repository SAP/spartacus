import { CxEvent } from '@spartacus/core';
import { User } from '../model/user.model';

export abstract class UserAccountEvent extends CxEvent {
  user: User;
}

export class UserAccountChangedEvent extends UserAccountEvent {
  static readonly type = 'UserAccountChangedEvent';
}
