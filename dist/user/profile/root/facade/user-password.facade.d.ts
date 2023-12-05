import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class UserPasswordFacade {
    /**
     * Updates the password for the user
     *
     * The method returns an observable with `LoaderState` information, including the
     * actual user data.
     *
     * @param oldPassword the current password that will be changed
     * @param newPassword the new password
     */
    abstract update(oldPassword: string, newPassword: string): Observable<unknown>;
    /**
     * Reset new password. Part of the forgot password flow.
     *
     * @param token
     * @param password
     */
    abstract reset(token: string, password: string): Observable<unknown>;
    abstract requestForgotPasswordEmail(email: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserPasswordFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserPasswordFacade>;
}
