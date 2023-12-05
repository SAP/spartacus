import { CxEvent } from '@spartacus/core';
import { User } from '../model/user.model';
export declare abstract class UserAccountEvent extends CxEvent {
    user: User;
}
export declare class UserAccountChangedEvent extends UserAccountEvent {
    static readonly type = "UserAccountChangedEvent";
}
