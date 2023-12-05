import * as i1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoggerService, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import { CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER, CUSTOMER_TICKETING_CATEGORY_NORMALIZER, CUSTOMER_TICKETING_DETAILS_NORMALIZER, CUSTOMER_TICKETING_CREATE_NORMALIZER, CUSTOMER_TICKETING_LIST_NORMALIZER, CUSTOMER_TICKETING_EVENT_NORMALIZER, CUSTOMER_TICKETING_FILE_NORMALIZER, CustomerTicketingAdapter } from '@spartacus/customer-ticketing/core';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccCustomerTicketingAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    getTicketAssociatedObjects(customerId) {
        return this.http
            .get(this.getTicketAssociatedObjectsEndpoint(customerId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), map((associatedObjectList) => associatedObjectList.ticketAssociatedObjects ?? []), this.converter.pipeableMany(CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER));
    }
    getTicketAssociatedObjectsEndpoint(customerId) {
        return this.occEndpoints.buildUrl('getTicketAssociatedObjects', {
            urlParams: {
                customerId,
            },
        });
    }
    getTicketCategories() {
        return this.http
            .get(this.getTicketCategoriesEndpoint())
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), map((categoryList) => categoryList.ticketCategories ?? []), this.converter.pipeableMany(CUSTOMER_TICKETING_CATEGORY_NORMALIZER));
    }
    getTicketCategoriesEndpoint() {
        return this.occEndpoints.buildUrl('getTicketCategories');
    }
    getTicket(customerId, ticketId) {
        return this.http
            .get(this.getTicketEndpoint(customerId, ticketId))
            .pipe(catchError((errorResponse) => {
            return throwError(normalizeHttpError(errorResponse, this.logger));
        }), tap((ticket) => ticket.ticketEvents?.reverse()), this.converter.pipeable(CUSTOMER_TICKETING_DETAILS_NORMALIZER));
    }
    getTicketEndpoint(customerId, ticketId) {
        return this.occEndpoints.buildUrl('getTicket', {
            urlParams: {
                customerId,
                ticketId,
            },
        });
    }
    createTicket(customerId, ticket) {
        return this.http
            .post(this.getCreateTicketEndpoint(customerId), ticket, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(CUSTOMER_TICKETING_CREATE_NORMALIZER));
    }
    getCreateTicketEndpoint(customerId) {
        return this.occEndpoints.buildUrl('createTicket', {
            urlParams: {
                customerId,
            },
        });
    }
    getTickets(customerId, pageSize, currentPage, sort) {
        return this.http
            .get(this.getTicketsEndpoint(customerId, pageSize, currentPage, sort))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(CUSTOMER_TICKETING_LIST_NORMALIZER));
    }
    getTicketsEndpoint(customerId, pageSize, currentPage, sort) {
        return this.occEndpoints.buildUrl('getTickets', {
            urlParams: {
                customerId,
            },
            queryParams: {
                pageSize,
                currentPage,
                sort,
            },
        });
    }
    createTicketEvent(customerId, ticketId, ticketEvent) {
        return this.http
            .post(this.getCreateTicketEventEndpoint(customerId, ticketId), ticketEvent, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(CUSTOMER_TICKETING_EVENT_NORMALIZER));
    }
    getCreateTicketEventEndpoint(customerId, ticketId) {
        return this.occEndpoints.buildUrl('createTicketEvent', {
            urlParams: {
                customerId,
                ticketId,
            },
        });
    }
    uploadAttachment(customerId, ticketId, eventCode, file) {
        const formData = new FormData();
        formData.append('ticketEventAttachment', file);
        return this.http
            .post(this.getUploadAttachmentEndpoint(customerId, ticketId, eventCode), formData)
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(CUSTOMER_TICKETING_FILE_NORMALIZER));
    }
    getUploadAttachmentEndpoint(customerId, ticketId, eventCode) {
        return this.occEndpoints.buildUrl('uploadAttachment', {
            urlParams: {
                customerId,
                ticketId,
                eventCode,
            },
        });
    }
    downloadAttachment(customerId, ticketId, eventCode, attachmentId) {
        const httpOptions = {
            responseType: 'blob',
        };
        return this.http
            .get(this.getDownloadAttachmentEndpoint(customerId, ticketId, eventCode, attachmentId), httpOptions)
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(CUSTOMER_TICKETING_FILE_NORMALIZER));
    }
    getDownloadAttachmentEndpoint(customerId, ticketId, eventCode, attachmentId) {
        return this.occEndpoints.buildUrl('downloadAttachment', {
            urlParams: {
                customerId,
                ticketId,
                eventCode,
                attachmentId,
            },
        });
    }
}
OccCustomerTicketingAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCustomerTicketingAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCustomerTicketingAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCustomerTicketingAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCustomerTicketingAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

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
const defaultOccCustomerTicketingConfig = {
    backend: {
        occ: {
            endpoints: {
                getTicket: 'users/${customerId}/tickets/${ticketId}',
                getTickets: 'users/${customerId}/tickets',
                createTicketEvent: 'users/${customerId}/tickets/${ticketId}/events',
                getTicketCategories: '/ticketCategories',
                getTicketAssociatedObjects: 'users/${customerId}/ticketAssociatedObjects',
                createTicket: 'users/${customerId}/tickets',
                uploadAttachment: '/users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments',
                downloadAttachment: '/users/${customerId}/tickets/${ticketId}/events/${eventCode}/attachments/${attachmentId}',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingOccModule {
}
CustomerTicketingOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingOccModule, imports: [CommonModule] });
CustomerTicketingOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingOccModule, providers: [
        provideDefaultConfig(defaultOccCustomerTicketingConfig),
        {
            provide: CustomerTicketingAdapter,
            useClass: OccCustomerTicketingAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccCustomerTicketingConfig),
                        {
                            provide: CustomerTicketingAdapter,
                            useClass: OccCustomerTicketingAdapter,
                        },
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

/**
 * Generated bundle index. Do not edit.
 */

export { CustomerTicketingOccModule, OccCustomerTicketingAdapter };
//# sourceMappingURL=spartacus-customer-ticketing-occ.mjs.map
