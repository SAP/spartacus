import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import * as i3 from '@spartacus/storefront';
import { ICON_TYPE, IconModule } from '@spartacus/storefront';
import * as i1 from '@spartacus/product/future-stock/root';
import * as i4 from '@spartacus/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FutureStockAccordionComponent {
    constructor(futureStockService) {
        this.futureStockService = futureStockService;
        this.futureStocks$ = this.futureStockService.getFutureStock();
        this.expanded = false;
        this.iconType = ICON_TYPE;
    }
    toggle() {
        this.expanded = !this.expanded;
    }
}
FutureStockAccordionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionComponent, deps: [{ token: i1.FutureStockFacade }], target: i0.ɵɵFactoryTarget.Component });
FutureStockAccordionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: FutureStockAccordionComponent, selector: "cx-future-stock-accordion", ngImport: i0, template: "<ng-container *ngIf=\"futureStocks$ | async as futureStocks\">\n  <button\n    id=\"cx-future-stock-accordion-header\"\n    class=\"cx-future-stock-accordion-header\"\n    aria-controls=\"cx-future-stock-accordion-content\"\n    [attr.aria-expanded]=\"expanded\"\n    (click)=\"toggle()\"\n  >\n    {{ 'futureStockDropdown.header' | cxTranslate }}\n    <cx-icon\n      [type]=\"expanded ? iconType.CARET_UP : iconType.CARET_DOWN\"\n      aria-hidden=\"true\"\n    ></cx-icon>\n  </button>\n\n  <ng-container *ngIf=\"expanded\">\n    <ng-container *ngIf=\"futureStocks?.futureStocks?.length; else noStocks\">\n      <div\n        id=\"cx-future-stock-accordion-content\"\n        class=\"cx-future-stock-accordion-content\"\n        aria-labelledby=\"cx-future-stock-accordion-header\"\n        *ngFor=\"let futureStock of futureStocks.futureStocks\"\n      >\n        {{ futureStock.formattedDate }} -\n        {{ 'futureStockDropdown.quantity' | cxTranslate }}\n        {{ futureStock.stock.stockLevel }}\n      </div>\n    </ng-container>\n\n    <ng-template #noStocks>\n      <div\n        id=\"cx-future-stock-accordion-content\"\n        class=\"cx-future-stock-accordion-content\"\n        aria-labelledby=\"cx-future-stock-accordion-header\"\n      >\n        {{ 'futureStockDropdown.noFutureStocks' | cxTranslate }}\n      </div>\n    </ng-template>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-future-stock-accordion', template: "<ng-container *ngIf=\"futureStocks$ | async as futureStocks\">\n  <button\n    id=\"cx-future-stock-accordion-header\"\n    class=\"cx-future-stock-accordion-header\"\n    aria-controls=\"cx-future-stock-accordion-content\"\n    [attr.aria-expanded]=\"expanded\"\n    (click)=\"toggle()\"\n  >\n    {{ 'futureStockDropdown.header' | cxTranslate }}\n    <cx-icon\n      [type]=\"expanded ? iconType.CARET_UP : iconType.CARET_DOWN\"\n      aria-hidden=\"true\"\n    ></cx-icon>\n  </button>\n\n  <ng-container *ngIf=\"expanded\">\n    <ng-container *ngIf=\"futureStocks?.futureStocks?.length; else noStocks\">\n      <div\n        id=\"cx-future-stock-accordion-content\"\n        class=\"cx-future-stock-accordion-content\"\n        aria-labelledby=\"cx-future-stock-accordion-header\"\n        *ngFor=\"let futureStock of futureStocks.futureStocks\"\n      >\n        {{ futureStock.formattedDate }} -\n        {{ 'futureStockDropdown.quantity' | cxTranslate }}\n        {{ futureStock.stock.stockLevel }}\n      </div>\n    </ng-container>\n\n    <ng-template #noStocks>\n      <div\n        id=\"cx-future-stock-accordion-content\"\n        class=\"cx-future-stock-accordion-content\"\n        aria-labelledby=\"cx-future-stock-accordion-header\"\n      >\n        {{ 'futureStockDropdown.noFutureStocks' | cxTranslate }}\n      </div>\n    </ng-template>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.FutureStockFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FutureStockAccordionModule {
}
FutureStockAccordionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockAccordionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionModule, declarations: [FutureStockAccordionComponent], imports: [CommonModule, I18nModule, IconModule], exports: [FutureStockAccordionComponent] });
FutureStockAccordionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                FutureStockComponent: {
                    component: FutureStockAccordionComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule],
                    declarations: [FutureStockAccordionComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                FutureStockComponent: {
                                    component: FutureStockAccordionComponent,
                                },
                            },
                        }),
                    ],
                    exports: [FutureStockAccordionComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FutureStockComponentsModule {
}
FutureStockComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockComponentsModule, imports: [CommonModule, FutureStockAccordionModule] });
FutureStockComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockComponentsModule, imports: [CommonModule, FutureStockAccordionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FutureStockAccordionModule],
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

export { FutureStockAccordionComponent, FutureStockComponentsModule };
//# sourceMappingURL=spartacus-product-future-stock-components.mjs.map
