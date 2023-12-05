import { HttpClient } from '@angular/common/http';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { UserProfileAdapter } from '@spartacus/user/profile/core';
import { Title, UserSignUp } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccUserProfileAdapter implements UserProfileAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    update(userId: string, user: User): Observable<unknown>;
    register(user: UserSignUp): Observable<User>;
    registerGuest(guid: string, password: string): Observable<User>;
    requestForgotPasswordEmail(userEmailAddress: string): Observable<unknown>;
    resetPassword(token: string, newPassword: string): Observable<unknown>;
    updateEmail(userId: string, currentPassword: string, newUserId: string): Observable<unknown>;
    updatePassword(userId: string, oldPassword: string, newPassword: string): Observable<unknown>;
    close(userId: string): Observable<unknown>;
    loadTitles(): Observable<Title[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserProfileAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserProfileAdapter>;
}
