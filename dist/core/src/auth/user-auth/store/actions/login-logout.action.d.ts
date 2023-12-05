import { Action } from '@ngrx/store';
export declare const LOGIN = "[Auth] Login";
export declare const LOGOUT = "[Auth] Logout";
export declare class Login implements Action {
    readonly type = "[Auth] Login";
}
export declare class Logout implements Action {
    readonly type = "[Auth] Logout";
}
export type LoginLogoutAction = Login | Logout;
