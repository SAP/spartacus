import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { PageType, ComponentDecorator, SlotDecorator } from '@spartacus/core';
import { filter, take } from 'rxjs/operators';
import * as i2 from '@spartacus/smartedit/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SmartEditService {
    constructor(cmsService, routingService, baseSiteService, zone, winRef, rendererFactory, config) {
        this.cmsService = cmsService;
        this.routingService = routingService;
        this.baseSiteService = baseSiteService;
        this.zone = zone;
        this.winRef = winRef;
        this.rendererFactory = rendererFactory;
        this.config = config;
        this.isPreviewPage = false;
        if (winRef.nativeWindow) {
            const window = winRef.nativeWindow;
            // rerender components and slots after editing
            window.smartedit = window.smartedit || {};
            window.smartedit.renderComponent = (componentId, componentType, parentId) => {
                return this.renderComponent(componentId, componentType, parentId);
            };
            // reprocess page
            window.smartedit.reprocessPage = this.reprocessPage;
        }
    }
    processCmsPage() {
        this.baseSiteService
            .get()
            .pipe(filter((site) => Boolean(site)), take(1))
            .subscribe((site) => {
            this.defaultPreviewCategoryCode = site.defaultPreviewCategoryCode;
            this.defaultPreviewProductCode = site.defaultPreviewProductCode;
            this.cmsService
                .getCurrentPage()
                .pipe(filter(Boolean))
                .subscribe((cmsPage) => {
                this._currentPageId = cmsPage.pageId;
                // before adding contract to page, we need redirect to that page
                this.goToPreviewPage(cmsPage);
                this.addPageContract(cmsPage);
            });
        });
    }
    /**
     * add CSS classes in a body tag
     */
    addPageContract(cmsPage) {
        const renderer = this.rendererFactory.createRenderer('body', null);
        const element = this.winRef.document.body;
        // remove old page contract
        const previousContract = [];
        Array.from(element.classList).forEach((attr) => previousContract.push(attr));
        previousContract.forEach((attr) => renderer.removeClass(element, attr));
        // add new page contract
        this.addSmartEditContract(element, renderer, cmsPage.properties);
    }
    /**
     * go to the default preview page
     */
    goToPreviewPage(cmsPage) {
        // only the first page is the smartedit preview page
        if (!this.isPreviewPage) {
            this.isPreviewPage = true;
            if (cmsPage.type === PageType.PRODUCT_PAGE &&
                this.defaultPreviewProductCode) {
                this.routingService.go({
                    cxRoute: 'product',
                    params: { code: this.defaultPreviewProductCode, name: '' },
                });
            }
            else if (cmsPage.type === PageType.CATEGORY_PAGE &&
                this.defaultPreviewCategoryCode) {
                this.routingService.go({
                    cxRoute: 'category',
                    params: { code: this.defaultPreviewCategoryCode },
                });
            }
        }
    }
    /**
     * re-render CMS components and slots
     */
    renderComponent(componentId, componentType, parentId) {
        if (componentId) {
            this.zone.run(() => {
                // without parentId, it is slot
                if (!parentId) {
                    if (this._currentPageId) {
                        this.cmsService.refreshPageById(this._currentPageId);
                    }
                    else {
                        this.cmsService.refreshLatestPage();
                    }
                }
                else if (componentType) {
                    this.cmsService.refreshComponent(componentId);
                }
            });
        }
        return true;
    }
    reprocessPage() {
        // TODO: reprocess page API
    }
    /**
     * add smartedit HTML markup contract
     */
    addSmartEditContract(element, renderer, properties) {
        if (properties) {
            // check each group of properties, e.g. smartedit
            Object.keys(properties).forEach((group) => {
                const name = 'data-' + group + '-';
                const groupProps = properties[group];
                // check each property in the group
                Object.keys(groupProps).forEach((propName) => {
                    const propValue = groupProps[propName];
                    if (propName === 'classes') {
                        const classes = propValue.split(' ');
                        classes.forEach((classItem) => {
                            renderer.addClass(element, classItem);
                        });
                    }
                    else {
                        renderer.setAttribute(element, name +
                            propName
                                .split(/(?=[A-Z])/)
                                .join('-')
                                .toLowerCase(), propValue);
                    }
                });
            });
        }
    }
}
SmartEditService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditService, deps: [{ token: i1.CmsService }, { token: i1.RoutingService }, { token: i1.BaseSiteService }, { token: i0.NgZone }, { token: i1.WindowRef }, { token: i0.RendererFactory2 }, { token: i2.SmartEditConfig }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i1.RoutingService }, { type: i1.BaseSiteService }, { type: i0.NgZone }, { type: i1.WindowRef }, { type: i0.RendererFactory2 }, { type: i2.SmartEditConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SmartEditComponentDecorator extends ComponentDecorator {
    constructor(smartEditService) {
        super();
        this.smartEditService = smartEditService;
    }
    decorate(element, renderer, component) {
        if (component) {
            this.smartEditService.addSmartEditContract(element, renderer, component.properties);
        }
    }
}
SmartEditComponentDecorator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditComponentDecorator, deps: [{ token: SmartEditService }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditComponentDecorator.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditComponentDecorator, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditComponentDecorator, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: SmartEditService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SmartEditSlotDecorator extends SlotDecorator {
    constructor(smartEditService) {
        super();
        this.smartEditService = smartEditService;
    }
    decorate(element, renderer, slot) {
        if (slot) {
            this.smartEditService.addSmartEditContract(element, renderer, slot.properties);
        }
    }
}
SmartEditSlotDecorator.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditSlotDecorator, deps: [{ token: SmartEditService }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditSlotDecorator.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditSlotDecorator, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditSlotDecorator, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: SmartEditService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const smartEditDecorators = [
    {
        provide: ComponentDecorator,
        useExisting: SmartEditComponentDecorator,
        multi: true,
    },
    {
        provide: SlotDecorator,
        useExisting: SmartEditSlotDecorator,
        multi: true,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SmartEditCoreModule {
    constructor(smartEditService) {
        this.smartEditService = smartEditService;
        this.smartEditService.processCmsPage();
    }
}
SmartEditCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditCoreModule, deps: [{ token: SmartEditService }], target: i0.ɵɵFactoryTarget.NgModule });
SmartEditCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SmartEditCoreModule });
SmartEditCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditCoreModule, providers: [...smartEditDecorators] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [...smartEditDecorators],
                }]
        }], ctorParameters: function () { return [{ type: SmartEditService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SmartEditCoreModule, SmartEditService };
//# sourceMappingURL=spartacus-smartedit-core.mjs.map
