import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoggerService, normalizeHttpError, InterceptorUtil, USE_CLIENT_TOKEN, provideDefaultConfig } from '@spartacus/core';
import { USER_PROFILE_SERIALIZER, USER_SIGN_UP_SERIALIZER, USER_PROFILE_NORMALIZER, TITLE_NORMALIZER, UserProfileAdapter } from '@spartacus/user/profile/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccUserProfileConfig = {
    backend: {
        occ: {
            endpoints: {
                userRegister: 'users',
                userForgotPassword: 'forgottenpasswordtokens',
                userResetPassword: 'resetpassword',
                userUpdateLoginId: 'users/${userId}/login',
                userUpdatePassword: 'users/${userId}/password',
                titles: 'titles',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };
const CONTENT_TYPE_URLENCODED_HEADER = {
    'Content-Type': 'application/x-www-form-urlencoded',
};
class OccUserProfileAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    update(userId, user) {
        const endpoint = this.occEndpoints.isConfigured('userUpdateProfile')
            ? 'userUpdateProfile'
            : 'user';
        const url = this.occEndpoints.buildUrl(endpoint, { urlParams: { userId } });
        user = this.converter.convert(user, USER_PROFILE_SERIALIZER);
        return this.http
            .patch(url, user)
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    register(user) {
        const url = this.occEndpoints.buildUrl('userRegister');
        let headers = new HttpHeaders(Object.assign({}, CONTENT_TYPE_JSON_HEADER));
        headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        user = this.converter.convert(user, USER_SIGN_UP_SERIALIZER);
        return this.http.post(url, user, { headers }).pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(USER_PROFILE_NORMALIZER));
    }
    registerGuest(guid, password) {
        const url = this.occEndpoints.buildUrl('userRegister');
        let headers = new HttpHeaders(Object.assign({}, CONTENT_TYPE_URLENCODED_HEADER));
        headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        const httpParams = new HttpParams()
            .set('guid', guid)
            .set('password', password);
        return this.http.post(url, httpParams, { headers }).pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(USER_PROFILE_NORMALIZER));
    }
    requestForgotPasswordEmail(userEmailAddress) {
        const url = this.occEndpoints.buildUrl('userForgotPassword');
        const httpParams = new HttpParams().set('userId', userEmailAddress);
        let headers = new HttpHeaders(Object.assign({}, CONTENT_TYPE_URLENCODED_HEADER));
        headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        return this.http
            .post(url, httpParams, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    resetPassword(token, newPassword) {
        const url = this.occEndpoints.buildUrl('userResetPassword');
        let headers = new HttpHeaders(Object.assign({}, CONTENT_TYPE_JSON_HEADER));
        headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        return this.http
            .post(url, { token, newPassword }, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    updateEmail(userId, currentPassword, newUserId) {
        const url = this.occEndpoints.buildUrl('userUpdateLoginId', {
            urlParams: { userId },
        });
        const httpParams = new HttpParams()
            .set('password', currentPassword)
            .set('newLogin', newUserId);
        const headers = new HttpHeaders(Object.assign({}, CONTENT_TYPE_URLENCODED_HEADER));
        return this.http
            .put(url, httpParams, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    updatePassword(userId, oldPassword, newPassword) {
        const url = this.occEndpoints.buildUrl('userUpdatePassword', {
            urlParams: { userId },
        });
        const httpParams = new HttpParams()
            .set('old', oldPassword)
            .set('new', newPassword);
        const headers = new HttpHeaders(Object.assign({}, CONTENT_TYPE_URLENCODED_HEADER));
        return this.http
            .put(url, httpParams, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    close(userId) {
        const endpoint = this.occEndpoints.isConfigured('userCloseAccount')
            ? 'userCloseAccount'
            : 'user';
        const url = this.occEndpoints.buildUrl(endpoint, { urlParams: { userId } });
        return this.http
            .delete(url)
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    loadTitles() {
        const url = this.occEndpoints.buildUrl('titles');
        return this.http.get(url).pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), map((titleList) => { var _a; return (_a = titleList.titles) !== null && _a !== void 0 ? _a : []; }), this.converter.pipeableMany(TITLE_NORMALIZER));
    }
}
OccUserProfileAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserProfileAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserProfileAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserProfileAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserProfileAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserProfileOccModule {
}
UserProfileOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserProfileOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserProfileOccModule });
UserProfileOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileOccModule, providers: [
        provideDefaultConfig(defaultOccUserProfileConfig),
        { provide: UserProfileAdapter, useClass: OccUserProfileAdapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileOccModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOccUserProfileConfig),
                        { provide: UserProfileAdapter, useClass: OccUserProfileAdapter },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { OccUserProfileAdapter, UserProfileOccModule, defaultOccUserProfileConfig };
//# sourceMappingURL=spartacus-user-profile-occ.mjs.map
