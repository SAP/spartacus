import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { CustomerTicketingComponentsModule } from '@spartacus/customer-ticketing/components';
import { CustomerTicketingCoreModule } from '@spartacus/customer-ticketing/core';
import { CustomerTicketingOccModule } from '@spartacus/customer-ticketing/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingModule {
}
CustomerTicketingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingModule, imports: [CustomerTicketingComponentsModule,
        CustomerTicketingCoreModule,
        CustomerTicketingOccModule] });
CustomerTicketingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingModule, imports: [CustomerTicketingComponentsModule,
        CustomerTicketingCoreModule,
        CustomerTicketingOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CustomerTicketingComponentsModule,
                        CustomerTicketingCoreModule,
                        CustomerTicketingOccModule,
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

export { CustomerTicketingModule };
//# sourceMappingURL=spartacus-customer-ticketing.mjs.map
