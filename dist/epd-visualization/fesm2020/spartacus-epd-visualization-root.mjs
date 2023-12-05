import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { Config, provideDefaultConfigFactory, provideConfigValidator } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class EpdVisualizationConfig {
}
EpdVisualizationConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
EpdVisualizationConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationConfig, decorators: [{
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
function getUrl(urlString) {
    try {
        return new URL(urlString);
    }
    catch {
        return null;
    }
}
function isHttpOrHttps(url) {
    return url.protocol === 'http:' || url.protocol === 'https:';
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function epdVisualizationConfigValidator(epdVisualizationConfig) {
    const epdVisualization = epdVisualizationConfig.epdVisualization;
    if (!epdVisualization) {
        return unconfiguredPropertyMessage('epdVisualization');
    }
    if (invalidApis(epdVisualization)) {
        return invalidApis(epdVisualization);
    }
    if (invalidUi5(epdVisualization)) {
        return invalidUi5(epdVisualization);
    }
    if (invalidUsageIds(epdVisualization)) {
        return invalidUsageIds(epdVisualization);
    }
    if (invalidVisualPicking(epdVisualization)) {
        return invalidVisualPicking(epdVisualization);
    }
}
function unconfiguredPropertyMessage(propertyName) {
    return `No value configured for ${propertyName} in the EPD Visualization library configuration.`;
}
function invalidUrlMessage(propertyName, url) {
    return `URL value '${url}' configured for ${propertyName} in the EPD Visualization library configuration is not valid.`;
}
function invalidUrlProtocolMessage(propertyName) {
    return `URL for ${propertyName} must use HTTPS or HTTP protocol.`;
}
function invalidApis(epdVisualization) {
    if (!epdVisualization.apis) {
        return unconfiguredPropertyMessage('epdVisualization.apis');
    }
    const configApisBaseUrlProperty = 'epdVisualization.apis.baseUrl';
    if (!epdVisualization.apis.baseUrl) {
        return unconfiguredPropertyMessage(configApisBaseUrlProperty);
    }
    const apiBaseUrl = getUrl(epdVisualization.apis.baseUrl);
    if (!apiBaseUrl) {
        return invalidUrlMessage(configApisBaseUrlProperty, epdVisualization.apis.baseUrl);
    }
    if (!isHttpOrHttps(apiBaseUrl)) {
        return invalidUrlProtocolMessage(configApisBaseUrlProperty);
    }
    return undefined;
}
function invalidUi5(epdVisualization) {
    if (!epdVisualization.ui5) {
        return unconfiguredPropertyMessage('epdVisualization.ui5');
    }
    const configUi5BootstrapUrlProperty = 'epdVisualization.ui5.bootstrapUrl';
    if (!epdVisualization.ui5.bootstrapUrl) {
        return unconfiguredPropertyMessage(configUi5BootstrapUrlProperty);
    }
    const ui5BootStrapUrl = getUrl(epdVisualization.ui5.bootstrapUrl);
    if (!ui5BootStrapUrl) {
        return invalidUrlMessage(configUi5BootstrapUrlProperty, epdVisualization.ui5.bootstrapUrl);
    }
    if (!isHttpOrHttps(ui5BootStrapUrl)) {
        return invalidUrlProtocolMessage(configUi5BootstrapUrlProperty);
    }
    return undefined;
}
function invalidUsageIds(epdVisualization) {
    if (!epdVisualization.usageIds) {
        return unconfiguredPropertyMessage('epdVisualization.usageIds');
    }
    if (!epdVisualization.usageIds.folderUsageId.name) {
        return unconfiguredPropertyMessage('epdVisualization.usageIds.folderUsageId.name');
    }
    if (!epdVisualization.usageIds.folderUsageId.keys?.length) {
        return unconfiguredPropertyMessage('epdVisualization.usageIds.folderUsageId.keys');
    }
    for (let i = 0; i < epdVisualization.usageIds.folderUsageId.keys.length; i++) {
        if (!epdVisualization.usageIds.folderUsageId.keys[i].name) {
            return unconfiguredPropertyMessage(`epdVisualization.usageIds.folderUsageId.keys[${i}].name`);
        }
        if (!epdVisualization.usageIds.folderUsageId.keys[i].value) {
            return unconfiguredPropertyMessage(`epdVisualization.usageIds.folderUsageId.keys[${i}].value`);
        }
    }
    if (!epdVisualization.usageIds.productUsageId.source) {
        return unconfiguredPropertyMessage('epdVisualization.usageIds.productUsageId.source');
    }
    if (!epdVisualization.usageIds.productUsageId.category) {
        return unconfiguredPropertyMessage('epdVisualization.usageIds.productUsageId.category');
    }
    if (!epdVisualization.usageIds.productUsageId.keyName) {
        return unconfiguredPropertyMessage('epdVisualization.usageIds.productUsageId.keyName');
    }
    return undefined;
}
function invalidVisualPicking(epdVisualization) {
    if (!epdVisualization.visualPicking) {
        return unconfiguredPropertyMessage('epdVisualization.visualPicking');
    }
    if (!epdVisualization.visualPicking.productReferenceType) {
        return unconfiguredPropertyMessage('epdVisualization.visualPicking.productReferenceType');
    }
    return undefined;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getEpdVisualizationDefaultConfig() {
    return {
        epdVisualization: {
            usageIds: {
                folderUsageId: {
                    name: 'CommerceCloud-Folder',
                    keys: [
                        {
                            name: 'Function',
                            value: 'Online',
                        },
                    ],
                },
                productUsageId: {
                    name: 'CommerceCloud-SparePart',
                    source: 'CommerceCloud',
                    category: 'SpareParts',
                    keyName: 'ProductCode',
                },
            },
            visualPicking: {
                productReferenceType: 'SPAREPART',
            },
        },
    };
}

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
const EPD_VISUALIZATION_FEATURE = 'epd-visualization';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultEpdVisualizationComponentsConfig() {
    const config = {
        featureModules: {
            [EPD_VISUALIZATION_FEATURE]: {
                cmsComponents: ['VisualPickingTabComponent'],
            },
        },
    };
    return config;
}
class EpdVisualizationRootModule {
}
EpdVisualizationRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
EpdVisualizationRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationRootModule });
EpdVisualizationRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationRootModule, providers: [
        provideDefaultConfigFactory(defaultEpdVisualizationComponentsConfig),
        provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
        provideConfigValidator(epdVisualizationConfigValidator),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultEpdVisualizationComponentsConfig),
                        provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
                        provideConfigValidator(epdVisualizationConfigValidator),
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A subset of the content types that may be returned by the EPD Visualization service.
 * We use filtering to ensure that we only get visualizations of the types below returned.
 * Some values start with numbers, so the identifiers do not match the values
 */
var ContentType;
(function (ContentType) {
    /**
     * 3D content (rendered using WebGL)
     */
    ContentType["Model3D"] = "3DModel";
    /**
     * 2D vector content (rendered using SVG)
     */
    ContentType["Drawing2D"] = "2DDrawing";
})(ContentType || (ContentType = {}));

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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class EventListenerUtils {
    constructor() {
        this.listeners = [];
    }
    initialize(renderer) {
        this.renderer = renderer;
    }
    attachEventListener(nativeElement, eventName, callback) {
        const listener = {
            nativeElement,
            eventName,
            endListener: this.renderer.listen(nativeElement, eventName, callback),
        };
        this.listeners.push(listener);
    }
    detachEventListeners(nativeElement, eventName) {
        this._detachEventListeners(this.listeners.filter((listener) => listener.nativeElement === nativeElement &&
            listener.eventName === eventName));
    }
    detachAllEventListeners(nativeElement) {
        this._detachEventListeners(this.listeners.filter((listener) => listener.nativeElement === nativeElement));
    }
    _detachEventListeners(eventListeners) {
        const listenersSet = new Set(eventListeners);
        eventListeners.forEach((listener) => {
            listener.endListener();
        });
        this.listeners = this.listeners.filter((listener) => !listenersSet.has(listener));
    }
}

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

export { ContentType, EPD_VISUALIZATION_FEATURE, EpdVisualizationConfig, EpdVisualizationRootModule, EventListenerUtils, defaultEpdVisualizationComponentsConfig, epdVisualizationConfigValidator, getEpdVisualizationDefaultConfig, getUrl, isHttpOrHttps };
//# sourceMappingURL=spartacus-epd-visualization-root.mjs.map
