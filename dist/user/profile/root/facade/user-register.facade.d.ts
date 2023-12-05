import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title, UserSignUp } from '../model/user-profile.model';
import * as i0 from "@angular/core";
export declare abstract class UserRegisterFacade {
    /**
     * Register a new user.
     *
     * @param submitFormData as UserRegisterFormData
     */
    abstract register(user: UserSignUp): Observable<User>;
    /**
     * Register a new user from guest.
     *
     * @param guid
     * @param password
     */
    abstract registerGuest(guid: string, password: string): Observable<User>;
    /**
     * Returns titles that can be used for the user profiles.
     */
    abstract getTitles(): Observable<Title[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserRegisterFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserRegisterFacade>;
}
