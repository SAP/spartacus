import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { Title, UserSignUp } from '@spartacus/user/profile/root';
import { UserProfileAdapter } from './user-profile.adapter';
import * as i0 from "@angular/core";
export declare class UserProfileConnector {
    protected userProfileAdapter: UserProfileAdapter;
    constructor(userProfileAdapter: UserProfileAdapter);
    update(username: string, user: User): Observable<unknown>;
    register(user: UserSignUp): Observable<User>;
    registerGuest(guid: string, password: string): Observable<User>;
    requestForgotPasswordEmail(userEmailAddress: string): Observable<unknown>;
    resetPassword(token: string, newPassword: string): Observable<unknown>;
    updateEmail(userId: string, currentPassword: string, newUserId: string): Observable<unknown>;
    updatePassword(userId: string, oldPassword: string, newPassword: string): Observable<unknown>;
    remove(userId: string): Observable<unknown>;
    getTitles(): Observable<Title[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserProfileConnector>;
}
