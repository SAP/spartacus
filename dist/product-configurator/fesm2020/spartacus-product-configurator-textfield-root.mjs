import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory, provideDefaultConfig } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonConfiguratorModule } from '@spartacus/product-configurator/common';
import { PageLayoutComponent, CmsPageGuard } from '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE = 'productConfiguratorTextfield';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const cmsComponents = ['TextfieldConfigurationForm'];
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultProductConfiguratorTextfieldComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE]: {
                cmsComponents,
            },
        },
    };
    return config;
}
/**
 * Contains feature module configuration
 */
class TextfieldConfiguratorRootFeatureModule {
}
TextfieldConfiguratorRootFeatureModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootFeatureModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorRootFeatureModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootFeatureModule });
TextfieldConfiguratorRootFeatureModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootFeatureModule, providers: [
        provideDefaultConfigFactory(defaultProductConfiguratorTextfieldComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootFeatureModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        provideDefaultConfigFactory(defaultProductConfiguratorTextfieldComponentsConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultTextfieldRoutingConfig = {
    routing: {
        routes: {
            configureTEXTFIELD: {
                paths: ['configure/textfield/:ownerType/entityKey/:entityKey'],
            },
            configureOverviewTEXTFIELD: {
                paths: [
                    'configure-overview/textfield/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
                    'configure-overview/textfield/:ownerType/entityKey/:entityKey',
                ],
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Provides the default cx routing configuration for the textfield configurator
 */
class TextfieldConfiguratorRoutingModule {
    static forRoot() {
        return {
            ngModule: TextfieldConfiguratorRoutingModule,
            providers: [provideDefaultConfig(defaultTextfieldRoutingConfig)],
        };
    }
}
TextfieldConfiguratorRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRoutingModule });
TextfieldConfiguratorRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRoutingModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRoutingModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Exposes the root modules that we need to statically load. Contains page mappings
 */
class TextfieldConfiguratorRootModule {
    static forRoot() {
        return {
            ngModule: TextfieldConfiguratorRootModule,
        };
    }
}
TextfieldConfiguratorRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootModule, imports: [CommonModule,
        CommonConfiguratorModule,
        TextfieldConfiguratorRootFeatureModule, TextfieldConfiguratorRoutingModule, i2.RouterModule] });
TextfieldConfiguratorRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                TextfieldConfigurationTemplate: {
                    slots: ['TextfieldConfigContent'],
                },
            },
        }),
    ], imports: [CommonModule,
        CommonConfiguratorModule,
        TextfieldConfiguratorRootFeatureModule,
        TextfieldConfiguratorRoutingModule.forRoot(),
        RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'configureTEXTFIELD',
                },
                canActivate: [CmsPageGuard],
            },
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'configureOverviewTEXTFIELD',
                },
                canActivate: [CmsPageGuard],
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CommonConfiguratorModule,
                        TextfieldConfiguratorRootFeatureModule,
                        TextfieldConfiguratorRoutingModule.forRoot(),
                        RouterModule.forChild([
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'configureTEXTFIELD',
                                },
                                canActivate: [CmsPageGuard],
                            },
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'configureOverviewTEXTFIELD',
                                },
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                TextfieldConfigurationTemplate: {
                                    slots: ['TextfieldConfigContent'],
                                },
                            },
                        }),
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

export { PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE, TextfieldConfiguratorRootFeatureModule, TextfieldConfiguratorRootModule, TextfieldConfiguratorRoutingModule, defaultProductConfiguratorTextfieldComponentsConfig };
//# sourceMappingURL=spartacus-product-configurator-textfield-root.mjs.map
