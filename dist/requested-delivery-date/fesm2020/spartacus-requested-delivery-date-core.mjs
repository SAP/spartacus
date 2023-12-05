import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { HttpErrorHandler, HttpResponseStatus, GlobalMessageType } from '@spartacus/core';
import { RequestedDeliveryDateFacade } from '@spartacus/requested-delivery-date/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RequestedDeliveryDateAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RequestedDeliveryDateConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    setRequestedDeliveryDate(userId, cartId, requestedDate) {
        return this.adapter.setRequestedDeliveryDate(userId, cartId, requestedDate);
    }
}
RequestedDeliveryDateConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateConnector, deps: [{ token: RequestedDeliveryDateAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
RequestedDeliveryDateConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: RequestedDeliveryDateAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class RequestedDeliveryDateBadRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) && this.getErrors(errorResponse)?.length > 0);
    }
    handleError(request, response) {
        if (request && this.getErrors(response)?.length) {
            this.globalMessageService.add({ key: 'requestedDeliveryDate.errorMessage' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        return (response.error?.errors).filter((error) => error?.type === 'ValidationError' &&
            error?.message === 'checkout.multi.requestedretrievaldatevalid.error');
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
RequestedDeliveryDateBadRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateBadRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
RequestedDeliveryDateBadRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateBadRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateBadRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RequestedDeliveryDateService {
    /**
     * Set requested delivery date
     */
    setRequestedDeliveryDate(userId, cartId, requestedDate) {
        return this.requestedDeliveryDateConnector.setRequestedDeliveryDate(userId, cartId, requestedDate);
    }
    constructor(requestedDeliveryDateConnector) {
        this.requestedDeliveryDateConnector = requestedDeliveryDateConnector;
    }
}
RequestedDeliveryDateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateService, deps: [{ token: RequestedDeliveryDateConnector }], target: i0.ɵɵFactoryTarget.Injectable });
RequestedDeliveryDateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: RequestedDeliveryDateConnector }]; } });

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
class RequestedDeliveryDateCoreModule {
}
RequestedDeliveryDateCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RequestedDeliveryDateCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateCoreModule });
RequestedDeliveryDateCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateCoreModule, providers: [
        RequestedDeliveryDateService,
        {
            provide: RequestedDeliveryDateFacade,
            useExisting: RequestedDeliveryDateService,
        },
        {
            provide: HttpErrorHandler,
            useExisting: RequestedDeliveryDateBadRequestHandler,
            multi: true,
        },
        RequestedDeliveryDateConnector,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        RequestedDeliveryDateService,
                        {
                            provide: RequestedDeliveryDateFacade,
                            useExisting: RequestedDeliveryDateService,
                        },
                        {
                            provide: HttpErrorHandler,
                            useExisting: RequestedDeliveryDateBadRequestHandler,
                            multi: true,
                        },
                        RequestedDeliveryDateConnector,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { RequestedDeliveryDateAdapter, RequestedDeliveryDateConnector, RequestedDeliveryDateCoreModule, RequestedDeliveryDateService };
//# sourceMappingURL=spartacus-requested-delivery-date-core.mjs.map
