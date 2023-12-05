import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { EpdVisualizationComponentsModule } from '@spartacus/epd-visualization/components';
import { EpdVisualizationCoreModule } from '@spartacus/epd-visualization/core';
import { EpdVisualizationApiModule } from '@spartacus/epd-visualization/epd-visualization-api';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class EpdVisualizationModule {
}
EpdVisualizationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
EpdVisualizationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationModule, imports: [EpdVisualizationComponentsModule,
        EpdVisualizationCoreModule,
        EpdVisualizationApiModule] });
EpdVisualizationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationModule, imports: [EpdVisualizationComponentsModule,
        EpdVisualizationCoreModule,
        EpdVisualizationApiModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        EpdVisualizationComponentsModule,
                        EpdVisualizationCoreModule,
                        EpdVisualizationApiModule,
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

export { EpdVisualizationModule };
//# sourceMappingURL=spartacus-epd-visualization.mjs.map
