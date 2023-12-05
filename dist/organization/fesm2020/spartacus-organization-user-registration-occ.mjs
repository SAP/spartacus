import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoggerService, InterceptorUtil, USE_CLIENT_TOKEN, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import { ORGANIZATION_USER_REGISTRATION_SERIALIZER, UserRegistrationAdapter } from '@spartacus/organization/user-registration/core';
import * as i1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccUserRegistrationAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    registerUser(userData) {
        const url = this.getOrganizationUserRegistrationEndpoint();
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        userData = this.converter.convert(userData, ORGANIZATION_USER_REGISTRATION_SERIALIZER);
        return this.http
            .post(url, userData, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    getOrganizationUserRegistrationEndpoint() {
        return this.occEndpoints.buildUrl('organizationUserRegistration');
    }
}
OccUserRegistrationAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserRegistrationAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserRegistrationAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserRegistrationAdapter, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserRegistrationAdapter, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
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
const defaultOccOrganizationUserRegistrationConfig = {
    backend: {
        occ: {
            endpoints: {
                organizationUserRegistration: '/orgUsers',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRegistrationOccModule {
}
UserRegistrationOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserRegistrationOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationOccModule, imports: [CommonModule] });
UserRegistrationOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationOccModule, providers: [
        provideDefaultConfig(defaultOccOrganizationUserRegistrationConfig),
        {
            provide: UserRegistrationAdapter,
            useExisting: OccUserRegistrationAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccOrganizationUserRegistrationConfig),
                        {
                            provide: UserRegistrationAdapter,
                            useExisting: OccUserRegistrationAdapter,
                        },
                    ],
                }]
        }] });

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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { OccUserRegistrationAdapter, UserRegistrationOccModule };
//# sourceMappingURL=spartacus-organization-user-registration-occ.mjs.map
