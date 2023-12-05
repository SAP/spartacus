import * as i0 from '@angular/core';
import { Injectable, inject, isDevMode, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { Config, LoggerService, provideDefaultConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PersonalizationConfig {
}
PersonalizationConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PersonalizationConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PERSONALIZATION_FEATURE = 'personalization';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultPersonalizationConfig = {
    personalization: {
        enabled: false,
        httpHeaderName: {
            id: 'Occ-Personalization-Id',
            timestamp: 'Occ-Personalization-Time',
        },
        context: {
            slotPosition: 'PlaceholderContentSlot',
            componentId: 'PersonalizationScriptComponent',
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccPersonalizationIdInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.enabled = false;
        this.PERSONALIZATION_ID_KEY = 'personalization-id';
        this.logger = inject(LoggerService);
        if (this.winRef.isBrowser()) {
            this.enabled =
                (this.winRef.localStorage && this.config.personalization?.enabled) ||
                    false;
            if (this.enabled) {
                if (!this.config.personalization?.httpHeaderName && isDevMode()) {
                    this.logger.warn(`There is no httpHeaderName configured in Personalization`);
                }
                this.requestHeader =
                    this.config.personalization?.httpHeaderName?.id.toLowerCase();
                this.personalizationId = this.winRef.localStorage?.getItem(this.PERSONALIZATION_ID_KEY);
            }
            else if (this.winRef.localStorage?.getItem(this.PERSONALIZATION_ID_KEY)) {
                this.winRef.localStorage.removeItem(this.PERSONALIZATION_ID_KEY);
            }
        }
    }
    intercept(request, next) {
        if (!this.enabled) {
            return next.handle(request);
        }
        if (this.requestHeader &&
            this.personalizationId &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.personalizationId,
                },
            });
        }
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse &&
                this.requestHeader &&
                event.headers.keys().includes(this.requestHeader)) {
                const receivedId = event.headers.get(this.requestHeader);
                if (this.personalizationId !== receivedId) {
                    this.personalizationId = receivedId;
                    if (this.personalizationId) {
                        this.winRef.localStorage?.setItem(this.PERSONALIZATION_ID_KEY, this.personalizationId);
                    }
                }
            }
        }));
    }
}
OccPersonalizationIdInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationIdInterceptor, deps: [{ token: PersonalizationConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccPersonalizationIdInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationIdInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationIdInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: PersonalizationConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccPersonalizationTimeInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.enabled = false;
        this.PERSONALIZATION_TIME_KEY = 'personalization-time';
        this.logger = inject(LoggerService);
        if (this.winRef.isBrowser()) {
            this.enabled =
                (this.winRef.localStorage && this.config.personalization?.enabled) ||
                    false;
            if (this.enabled) {
                if (!this.config.personalization?.httpHeaderName && isDevMode()) {
                    this.logger.warn(`There is no httpHeaderName configured in Personalization`);
                }
                this.requestHeader =
                    this.config.personalization?.httpHeaderName?.timestamp.toLowerCase();
                this.timestamp = this.winRef.localStorage?.getItem(this.PERSONALIZATION_TIME_KEY);
            }
            else if (this.winRef.localStorage?.getItem(this.PERSONALIZATION_TIME_KEY)) {
                this.winRef.localStorage.removeItem(this.PERSONALIZATION_TIME_KEY);
            }
        }
    }
    intercept(request, next) {
        if (!this.enabled) {
            return next.handle(request);
        }
        if (this.requestHeader &&
            this.timestamp &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.timestamp,
                },
            });
        }
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse &&
                this.requestHeader &&
                event.headers.keys().includes(this.requestHeader)) {
                const receivedTimestamp = event.headers.get(this.requestHeader);
                if (this.timestamp !== receivedTimestamp) {
                    this.timestamp = receivedTimestamp;
                    if (this.timestamp) {
                        this.winRef.localStorage?.setItem(this.PERSONALIZATION_TIME_KEY, this.timestamp);
                    }
                }
            }
        }));
    }
}
OccPersonalizationTimeInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationTimeInterceptor, deps: [{ token: PersonalizationConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccPersonalizationTimeInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationTimeInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationTimeInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: PersonalizationConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useExisting: OccPersonalizationIdInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useExisting: OccPersonalizationTimeInterceptor,
        multi: true,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultPersonalizationComponentsConfig() {
    const config = {
        featureModules: {
            [PERSONALIZATION_FEATURE]: {
                cmsComponents: ['PersonalizationScriptComponent'],
            },
        },
    };
    return config;
}
class PersonalizationRootModule {
}
PersonalizationRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PersonalizationRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationRootModule });
PersonalizationRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationRootModule, providers: [
        ...interceptors,
        provideDefaultConfig(defaultPersonalizationConfig),
        provideDefaultConfigFactory(defaultPersonalizationComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...interceptors,
                        provideDefaultConfig(defaultPersonalizationConfig),
                        provideDefaultConfigFactory(defaultPersonalizationComponentsConfig),
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

export { OccPersonalizationIdInterceptor, OccPersonalizationTimeInterceptor, PERSONALIZATION_FEATURE, PersonalizationConfig, PersonalizationRootModule, defaultPersonalizationComponentsConfig };
//# sourceMappingURL=spartacus-tracking-personalization-root.mjs.map
