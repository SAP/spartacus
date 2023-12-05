import * as i0 from '@angular/core';
import { Injectable, inject, isDevMode, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { Config, LoggerService, provideDefaultConfig } from '@spartacus/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultSegmentRefsConfig = {
    segmentRefs: {
        httpHeaderName: 'Segmentrefs',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SegmentRefsConfig {
}
SegmentRefsConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SegmentRefsConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

class OccSegmentRefsInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.SEGMENT_REFS_KEY = 'segment-refs';
        this.SEGMENT_REFS_QUERY_PARAM = 'segmentrefs';
        this.logger = inject(LoggerService);
        this.initialize();
    }
    /**
     * Fetched the segment reference ID from URL query parameter and saves it into
     * browser local storage
     */
    initialize() {
        const url = this.winRef.location.href ?? '';
        const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
        this.segmentRefs = queryParams.get(this.SEGMENT_REFS_QUERY_PARAM);
        if (this.segmentRefs) {
            this.winRef.localStorage?.setItem(this.SEGMENT_REFS_KEY, this.segmentRefs);
        }
        else {
            this.segmentRefs = this.winRef.localStorage?.getItem(this.SEGMENT_REFS_KEY);
        }
        if (this.winRef.isBrowser()) {
            if (!this.config.segmentRefs?.httpHeaderName && isDevMode()) {
                this.logger.warn(`There is no httpHeaderName configured in Segment`);
            }
            this.requestHeader =
                this.config.segmentRefs?.httpHeaderName?.toLowerCase?.();
        }
    }
    /**
     * Adds a new request header 'Segmentrefs' to the given HTTP request.
     * @param request The outgoing request object to handle.
     * @param next The next interceptor in the chain, or the backend
     * if no interceptors remain in the chain.
     * @returns An observable of the event stream.
     */
    intercept(request, next) {
        if (this.winRef.isBrowser() &&
            this.requestHeader &&
            this.segmentRefs &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.segmentRefs,
                },
            });
        }
        return next.handle(request);
    }
}
OccSegmentRefsInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccSegmentRefsInterceptor, deps: [{ token: SegmentRefsConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccSegmentRefsInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccSegmentRefsInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccSegmentRefsInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: SegmentRefsConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const segmentRefsInterceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useExisting: OccSegmentRefsInterceptor,
        multi: true,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SegmentRefsRootModule {
}
SegmentRefsRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SegmentRefsRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsRootModule });
SegmentRefsRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsRootModule, providers: [
        ...segmentRefsInterceptors,
        provideDefaultConfig(defaultSegmentRefsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SegmentRefsRootModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [],
                    providers: [
                        ...segmentRefsInterceptors,
                        provideDefaultConfig(defaultSegmentRefsConfig),
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

export { SegmentRefsRootModule };
//# sourceMappingURL=spartacus-segment-refs-root.mjs.map
