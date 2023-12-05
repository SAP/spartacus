import * as i0 from '@angular/core';
import { InjectionToken, Injectable, NgModule } from '@angular/core';
import { AsmCustomer360Facade } from '@spartacus/asm/customer-360/root';
import { of } from 'rxjs';
import { take, concatMap } from 'rxjs/operators';
import * as i1 from '@spartacus/core';
import * as i3 from '@spartacus/user/account/root';
import { StoreFinderModule } from '@spartacus/storefinder';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ASM_CUSTOMER_360_NORMALIZER = new InjectionToken('AsmCustomer360Normalizer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360Adapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360Connector {
    constructor(asmCustomer360Adapter) {
        this.asmCustomer360Adapter = asmCustomer360Adapter;
    }
    getAsmCustomer360Data(request) {
        return this.asmCustomer360Adapter.getAsmCustomer360Data(request);
    }
}
AsmCustomer360Connector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Connector, deps: [{ token: AsmCustomer360Adapter }], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360Connector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Connector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Connector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360Adapter }]; } });

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
class AsmCustomer360Service {
    constructor(commandService, asmCustomer360Connector, userAccountFacade) {
        this.commandService = commandService;
        this.asmCustomer360Connector = asmCustomer360Connector;
        this.userAccountFacade = userAccountFacade;
        this.asmCustomer360Command$ = this.commandService.create((tabComponents) => {
            return this.userAccountFacade.get().pipe(take(1), concatMap((customer) => {
                const queries = tabComponents.reduce((requests, component) => {
                    if (component.requestData) {
                        return requests.concat(component.requestData);
                    }
                    return requests;
                }, []);
                if (queries.length > 0) {
                    const request = {
                        queries,
                        options: {
                            userId: customer?.customerId ?? '',
                        },
                    };
                    return this.asmCustomer360Connector.getAsmCustomer360Data(request);
                }
                else {
                    return of({
                        value: [],
                    });
                }
            }));
        });
    }
    get360Data(components) {
        return this.asmCustomer360Command$.execute(components);
    }
}
AsmCustomer360Service.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Service, deps: [{ token: i1.CommandService }, { token: AsmCustomer360Connector }, { token: i3.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360Service.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Service });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Service, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CommandService }, { type: AsmCustomer360Connector }, { type: i3.UserAccountFacade }]; } });

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
const facadeProviders = [
    AsmCustomer360Service,
    {
        provide: AsmCustomer360Facade,
        useExisting: AsmCustomer360Service,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360CoreModule {
}
AsmCustomer360CoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360CoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CoreModule, imports: [StoreFinderModule] });
AsmCustomer360CoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CoreModule, providers: [AsmCustomer360Connector, ...facadeProviders], imports: [StoreFinderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [StoreFinderModule],
                    providers: [AsmCustomer360Connector, ...facadeProviders],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Return event from ASM dialog action
 */
function getAsmDialogActionEvent(customerEntry, action, route) {
    const event = {
        actionType: action,
        selectedUser: customerEntry,
        route: route,
    };
    return event;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ASM_CUSTOMER_360_NORMALIZER, AsmCustomer360Adapter, AsmCustomer360Connector, AsmCustomer360CoreModule, AsmCustomer360Service, getAsmDialogActionEvent };
//# sourceMappingURL=spartacus-asm-customer-360-core.mjs.map
