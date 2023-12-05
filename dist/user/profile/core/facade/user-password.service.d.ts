import { Command, CommandService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import * as i0 from "@angular/core";
export declare class UserPasswordService implements UserPasswordFacade {
    protected userProfileConnector: UserProfileConnector;
    protected userIdService: UserIdService;
    protected command: CommandService;
    protected updateCommand: Command<{
        oldPassword: string;
        newPassword: string;
    }>;
    protected resetCommand: Command<{
        token: string;
        password: string;
    }>;
    protected requestForgotPasswordEmailCommand: Command<{
        email: string;
    }>;
    constructor(userProfileConnector: UserProfileConnector, userIdService: UserIdService, command: CommandService);
    /**
     * Updates the password for the user
     *
     * The method returns an observable with `LoaderState` information, including the
     * actual user data.
     *
     * @param oldPassword the current password that will be changed
     * @param newPassword the new password
     */
    update(oldPassword: string, newPassword: string): Observable<unknown>;
    /**
     * Reset new password. Part of the forgot password flow.
     *
     * @param token
     * @param password
     */
    reset(token: string, password: string): Observable<unknown>;
    requestForgotPasswordEmail(email: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserPasswordService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserPasswordService>;
}
