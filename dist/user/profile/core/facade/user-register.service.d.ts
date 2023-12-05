import { AuthService, Command, CommandService } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title, UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import { UserProfileService } from './user-profile.service';
import { Store } from '@ngrx/store';
import * as i0 from "@angular/core";
export declare class UserRegisterService implements UserRegisterFacade {
    protected userProfile: UserProfileService;
    protected userConnector: UserProfileConnector;
    protected authService: AuthService;
    protected command: CommandService;
    protected store: Store;
    protected registerCommand: Command<{
        user: UserSignUp;
    }, User>;
    protected registerGuestCommand: Command<{
        guid: string;
        password: string;
    }, User>;
    constructor(userProfile: UserProfileService, userConnector: UserProfileConnector, authService: AuthService, command: CommandService, store: Store);
    /**
     * Register a new user.
     *
     * @param submitFormData as UserRegisterFormData
     */
    register(user: UserSignUp): Observable<User>;
    /**
     * Register a new user from guest.
     *
     * @param guid
     * @param password
     */
    registerGuest(guid: string, password: string): Observable<User>;
    /**
     * Returns titles that can be used for the user profiles.
     */
    getTitles(): Observable<Title[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserRegisterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserRegisterService>;
}
