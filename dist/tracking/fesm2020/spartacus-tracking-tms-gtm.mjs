import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { provideDefaultConfig } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Default Google Tag Manager collector.
 */
class GtmCollectorService {
    constructor(winRef) {
        this.winRef = winRef;
    }
    /**
     * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `dataLayer`
     */
    init(config, windowObject) {
        const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
        windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? [];
        if (config.gtmId) {
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                const f = d.getElementsByTagName(s)[0];
                const j = d.createElement(s);
                const dl = l !== 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode?.insertBefore(j, f);
            })(windowObject, this.winRef.document, 'script', dataLayerProperty, config.gtmId);
        }
    }
    pushEvent(config, windowObject, event) {
        const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
        windowObject[dataLayerProperty].push(event);
    }
}
GtmCollectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmCollectorService, deps: [{ token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
GtmCollectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmCollectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmCollectorService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultGoogleTagManagerConfig = {
    tagManager: {
        gtm: {
            collector: GtmCollectorService,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class GtmModule {
}
GtmModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GtmModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: GtmModule });
GtmModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmModule, providers: [provideDefaultConfig(defaultGoogleTagManagerConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GtmModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideDefaultConfig(defaultGoogleTagManagerConfig)],
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

/**
 * Generated bundle index. Do not edit.
 */

export { GtmCollectorService, GtmModule };
//# sourceMappingURL=spartacus-tracking-tms-gtm.mjs.map
