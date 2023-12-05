import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { OrderComponentsModule } from '@spartacus/order/components';
import { OrderCoreModule } from '@spartacus/order/core';
import { OrderOccModule } from '@spartacus/order/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderModule {
}
OrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderModule, imports: [OrderCoreModule, OrderOccModule, OrderComponentsModule] });
OrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderModule, imports: [OrderCoreModule, OrderOccModule, OrderComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OrderCoreModule, OrderOccModule, OrderComponentsModule],
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

export { OrderModule };
//# sourceMappingURL=spartacus-order.mjs.map
