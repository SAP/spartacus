import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const QUALTRICS_FEATURE = 'qualtrics';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultQualtricsComponentsConfig() {
    const config = {
        featureModules: {
            [QUALTRICS_FEATURE]: {
                cmsComponents: ['QualtricsComponent'],
            },
        },
    };
    return config;
}
class QualtricsRootModule {
}
QualtricsRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QualtricsRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QualtricsRootModule });
QualtricsRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsRootModule, providers: [provideDefaultConfigFactory(defaultQualtricsComponentsConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideDefaultConfigFactory(defaultQualtricsComponentsConfig)],
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

export { QUALTRICS_FEATURE, QualtricsRootModule, defaultQualtricsComponentsConfig };
//# sourceMappingURL=spartacus-qualtrics-root.mjs.map
