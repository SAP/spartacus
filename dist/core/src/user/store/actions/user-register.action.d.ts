import { StateUtils } from '../../../state/utils/index';
export declare const REGISTER_USER_SUCCESS = "[User] Register User Success";
/**
 * @deprecated since 3.2, moved to `@spartacus/user/profile/core`
 */
export declare class RegisterUserSuccess extends StateUtils.EntitySuccessAction {
    readonly type = "[User] Register User Success";
    constructor();
}
export type UserRegisterOrRemoveAction = RegisterUserSuccess;
