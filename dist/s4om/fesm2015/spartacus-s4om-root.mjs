import * as i0 from '@angular/core';
import { Component, Optional, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { CxDatePipe, UrlModule, I18nModule } from '@spartacus/core';
import { EMPTY } from 'rxjs';
import * as i1 from '@spartacus/cart/base/root';
import { CartOutlets } from '@spartacus/cart/base/root';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import { IconModule, provideOutlet, OutletPosition } from '@spartacus/storefront';
import { PDFInvoicesComponentsModule } from '@spartacus/pdf-invoices/components';
import { RequestedDeliveryDateComponentsModule } from '@spartacus/requested-delivery-date/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ScheduleLinesComponent {
    constructor(cartItemContext, translationService, datePipe) {
        var _a, _b;
        this.cartItemContext = cartItemContext;
        this.translationService = translationService;
        this.datePipe = datePipe;
        this.orderEntry$ = (_b = (_a = this.cartItemContext) === null || _a === void 0 ? void 0 : _a.item$) !== null && _b !== void 0 ? _b : EMPTY;
    }
    /**
     * Verifies whether the Schedule Line infos have any entries.
     * Only in this case we want to display the schedule line summary
     *
     * @param {OrderEntry} item - Cart item
     * @returns {boolean} - whether the Schedule Line information is present for the order
     */
    hasScheduleLines(item) {
        const scheduleLines = item.scheduleLines;
        return scheduleLines != null && scheduleLines.length > 0;
    }
    getScheduleLineInfoId(index) {
        return 'cx-schedule-line-info-' + index.toString();
    }
    getLongDate(date) {
        if (!date) {
            return '';
        }
        return this.datePipe.transform(date);
    }
}
ScheduleLinesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduleLinesComponent, deps: [{ token: i1.CartItemContext, optional: true }, { token: i2.TranslationService }, { token: i2.CxDatePipe }], target: i0.ɵɵFactoryTarget.Component });
ScheduleLinesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ScheduleLinesComponent, selector: "cx-schedule-lines", providers: [CxDatePipe], ngImport: i0, template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"hasScheduleLines(orderEntry)\">\n    <div class=\"cx-code\">\n      <div\n        *ngFor=\"let scheduleLine of orderEntry.scheduleLines; let i = index\"\n        class=\"cx-schedule-line-info\"\n        attr.aria-describedby=\"{{ getScheduleLineInfoId(i) }}\"\n      >\n        <div id=\"{{ getScheduleLineInfoId(i) }}\" class=\"cx-visually-hidden\">\n          {{\n            's4omScheduleLines.a11y.scheduleLineEntryInfo'\n              | cxTranslate\n                : {\n                    quantity: scheduleLine.confirmedQuantity,\n                    date: getLongDate(scheduleLine.confirmedAt)\n                  }\n          }}\n        </div>\n        <div class=\"cx-value\" aria-hidden=\"true\">\n          {{ scheduleLine?.confirmedAt | cxDate: 'M/d/yyyy' }}\n        </div>\n        <div class=\"cx-label\" aria-hidden=\"true\">\n          {{ 's4omScheduleLines.quantity' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\" aria-hidden=\"true\">\n          {{ scheduleLine?.confirmedQuantity }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduleLinesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-schedule-lines', providers: [CxDatePipe], template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"hasScheduleLines(orderEntry)\">\n    <div class=\"cx-code\">\n      <div\n        *ngFor=\"let scheduleLine of orderEntry.scheduleLines; let i = index\"\n        class=\"cx-schedule-line-info\"\n        attr.aria-describedby=\"{{ getScheduleLineInfoId(i) }}\"\n      >\n        <div id=\"{{ getScheduleLineInfoId(i) }}\" class=\"cx-visually-hidden\">\n          {{\n            's4omScheduleLines.a11y.scheduleLineEntryInfo'\n              | cxTranslate\n                : {\n                    quantity: scheduleLine.confirmedQuantity,\n                    date: getLongDate(scheduleLine.confirmedAt)\n                  }\n          }}\n        </div>\n        <div class=\"cx-value\" aria-hidden=\"true\">\n          {{ scheduleLine?.confirmedAt | cxDate: 'M/d/yyyy' }}\n        </div>\n        <div class=\"cx-label\" aria-hidden=\"true\">\n          {{ 's4omScheduleLines.quantity' | cxTranslate }}\n        </div>\n        <div class=\"cx-value\" aria-hidden=\"true\">\n          {{ scheduleLine?.confirmedQuantity }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () {
        return [{ type: i1.CartItemContext, decorators: [{
                        type: Optional
                    }] }, { type: i2.TranslationService }, { type: i2.CxDatePipe }];
    } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ScheduleLinesModule {
}
ScheduleLinesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduleLinesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ScheduleLinesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ScheduleLinesModule, declarations: [ScheduleLinesComponent], imports: [CommonModule, UrlModule, I18nModule, IconModule], exports: [ScheduleLinesComponent] });
ScheduleLinesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduleLinesModule, imports: [CommonModule, UrlModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduleLinesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UrlModule, I18nModule, IconModule],
                    declarations: [ScheduleLinesComponent],
                    entryComponents: [ScheduleLinesComponent],
                    exports: [ScheduleLinesComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const S4OM_FEATURE = 'S4HANA-Order-Management';

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
class S4omRootModule {
}
S4omRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: S4omRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
S4omRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: S4omRootModule, imports: [ScheduleLinesModule,
        RequestedDeliveryDateComponentsModule,
        PDFInvoicesComponentsModule] });
S4omRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: S4omRootModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_DETAILS,
            position: OutletPosition.AFTER,
            component: ScheduleLinesComponent,
        }),
    ], imports: [ScheduleLinesModule,
        RequestedDeliveryDateComponentsModule,
        PDFInvoicesComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: S4omRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ScheduleLinesModule,
                        RequestedDeliveryDateComponentsModule,
                        PDFInvoicesComponentsModule, //Adding dependency with PDF Invoices so that the library gets installed along with S4OM
                    ],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_DETAILS,
                            position: OutletPosition.AFTER,
                            component: ScheduleLinesComponent,
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

export { S4OM_FEATURE, S4omRootModule, ScheduleLinesComponent, ScheduleLinesModule };
//# sourceMappingURL=spartacus-s4om-root.mjs.map
