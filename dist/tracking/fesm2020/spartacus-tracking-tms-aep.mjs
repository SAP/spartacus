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
 * Default Adobe Experience Platform Launch collector.
 */
class AepCollectorService {
    constructor(scriptLoader) {
        this.scriptLoader = scriptLoader;
    }
    /**
     * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `digitalData`
     */
    init(config, windowObject) {
        const dataLayerProperty = config.dataLayerProperty ?? 'digitalData';
        windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? {};
        if (config.scriptUrl) {
            this.scriptLoader.embedScript({ src: config.scriptUrl });
        }
    }
    pushEvent(config, windowObject, event) {
        const dataLayerProperty = config.dataLayerProperty ?? 'digitalData';
        windowObject[dataLayerProperty] = {
            ...windowObject[dataLayerProperty],
            ...event,
        };
    }
}
AepCollectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AepCollectorService, deps: [{ token: i1.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
AepCollectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AepCollectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AepCollectorService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ScriptLoader }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAdobeExperiencePlatformConfig = {
    tagManager: {
        aep: {
            collector: AepCollectorService,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AepModule {
}
AepModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AepModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AepModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AepModule });
AepModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AepModule, providers: [provideDefaultConfig(defaultAdobeExperiencePlatformConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AepModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideDefaultConfig(defaultAdobeExperiencePlatformConfig)],
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

export { AepCollectorService, AepModule };
//# sourceMappingURL=spartacus-tracking-tms-aep.mjs.map
