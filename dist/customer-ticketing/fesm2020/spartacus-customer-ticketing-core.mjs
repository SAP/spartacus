import * as i0 from '@angular/core';
import { Injectable, InjectionToken, PLATFORM_ID, Inject, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { CommandStrategy, HttpErrorHandler, HttpResponseStatus, getLastValueSync, GlobalMessageType, PageMetaResolver, PageType } from '@spartacus/core';
import * as i3 from '@spartacus/customer-ticketing/root';
import { GetTicketCategoryQueryReloadEvent, GetTicketCategoryQueryResetEvent, GetTicketAssociatedObjectsQueryReloadEvent, GetTicketAssociatedObjectsQueryResetEvent, GetTicketQueryReloadEvent, GetTicketQueryResetEvent, GetTicketsQueryReloadEvents, GetTicketsQueryResetEvents, TicketCreatedEvent, TicketClosedEvent, TicketReopenedEvent, NewMessageEvent, UploadAttachmentSuccessEvent, CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { combineLatest, throwError, of } from 'rxjs';
import { switchMap, map, distinctUntilChanged, take, tap, concatMap } from 'rxjs/operators';
import * as i2 from '@spartacus/cart/base/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getTicket(customerId, ticketId) {
        return this.adapter.getTicket(customerId, ticketId);
    }
    getTickets(customerId, pageSize, currentPage, sort) {
        return this.adapter.getTickets(customerId, pageSize, currentPage, sort);
    }
    getTicketCategories() {
        return this.adapter.getTicketCategories();
    }
    getTicketAssociatedObjects(customerId) {
        return this.adapter.getTicketAssociatedObjects(customerId);
    }
    createTicket(customerId, ticket) {
        return this.adapter.createTicket(customerId, ticket);
    }
    createTicketEvent(customerId, ticketId, ticketEvent) {
        return this.adapter.createTicketEvent(customerId, ticketId, ticketEvent);
    }
    uploadAttachment(customerId, ticketId, eventCode, file) {
        return this.adapter.uploadAttachment(customerId, ticketId, eventCode, file);
    }
    downloadAttachment(customerId, ticketId, eventCode, attachmentId) {
        return this.adapter.downloadAttachment(customerId, ticketId, eventCode, attachmentId);
    }
}
CustomerTicketingConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingConnector, deps: [{ token: CustomerTicketingAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerTicketingConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CustomerTicketingAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CUSTOMER_TICKETING_DETAILS_NORMALIZER = new InjectionToken('CustomerTicketingDetailsNormalizer');
const CUSTOMER_TICKETING_EVENT_NORMALIZER = new InjectionToken('CustomerTicketingEventNormalizer');
const CUSTOMER_TICKETING_FILE_NORMALIZER = new InjectionToken('CustomerTicketingFileNormalizer');
const CUSTOMER_TICKETING_LIST_NORMALIZER = new InjectionToken('CustomerTicketingListNormalizer');
const CUSTOMER_TICKETING_CATEGORY_NORMALIZER = new InjectionToken('CustomerTicketingCategoryNormalizer');
const CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER = new InjectionToken('CustomerTicketingAssociatedObjectsNormalizer');
const CUSTOMER_TICKETING_CREATE_NORMALIZER = new InjectionToken('CustomerTicketingCreateNormalizer');

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
class CustomerTicketingService {
    getTicketCategoriesQueryReloadEvents() {
        return [GetTicketCategoryQueryReloadEvent];
    }
    getTicketCategoriesQueryResetEvents() {
        return [GetTicketCategoryQueryResetEvent];
    }
    getTicketAssociatedObjectsQueryReloadEvents() {
        return [GetTicketAssociatedObjectsQueryReloadEvent];
    }
    getTicketAssociatedObjectsQueryResetEvents() {
        return [GetTicketAssociatedObjectsQueryResetEvent];
    }
    getTicketQueryReloadEvents() {
        return [GetTicketQueryReloadEvent];
    }
    getTicketQueryResetEvents() {
        return [GetTicketQueryResetEvent];
    }
    getTicketsQueryReloadEvents() {
        return [GetTicketsQueryReloadEvents];
    }
    getTicketsQueryResetEvents() {
        return [GetTicketsQueryResetEvents];
    }
    getTicketsQuery$(pageSize, currentPage, sort) {
        return this.queryService.create(() => this.customerTicketingListPreConditions().pipe(switchMap((customerId) => this.customerTicketingConnector.getTickets(customerId, pageSize, currentPage, sort))), {
            reloadOn: this.getTicketsQueryReloadEvents(),
            resetOn: this.getTicketsQueryResetEvents(),
        });
    }
    customerTicketingPreConditions() {
        return combineLatest([
            this.userIdService.getUserId(),
            this.routingService.getParams().pipe(map((params) => params.ticketCode), distinctUntilChanged()),
        ]).pipe(take(1), map(([userId, ticketId]) => {
            if (!userId) {
                throw new Error('Customer ticketing pre conditions not met');
            }
            return [userId, ticketId];
        }));
    }
    customerTicketingListPreConditions() {
        return this.userIdService.getUserId().pipe(take(1), map((userId) => {
            if (!userId) {
                throw new Error('Customer ticketing list pre conditions not met');
            }
            return userId;
        }));
    }
    constructor(queryService, commandService, userIdService, customerTicketingConnector, routingService, eventService) {
        this.queryService = queryService;
        this.commandService = commandService;
        this.userIdService = userIdService;
        this.customerTicketingConnector = customerTicketingConnector;
        this.routingService = routingService;
        this.eventService = eventService;
        this.createTicketCommand = this.commandService.create((ticketStarted) => this.customerTicketingPreConditions().pipe(switchMap(([customerId]) => this.customerTicketingConnector.createTicket(customerId, ticketStarted)), tap(() => {
            this.eventService.dispatch({}, TicketCreatedEvent);
        })), {
            strategy: CommandStrategy.Queue,
        });
        this.createTicketEventCommand = this.commandService.create((payload) => this.customerTicketingPreConditions().pipe(switchMap(([customerId, ticketId]) => this.customerTicketingConnector
            .createTicketEvent(customerId, ticketId, payload.ticketEvent)
            .pipe(tap(() => {
            if (payload.ticketEvent.toStatus?.id === "CLOSED" /* STATUS.CLOSED */) {
                this.eventService.dispatch({}, TicketClosedEvent);
            }
            else if (!payload.containsAttachment) {
                if (payload.ticketEvent.toStatus?.id === "OPEN" /* STATUS.OPEN */ ||
                    payload.ticketEvent.toStatus?.id === "INPROCESS" /* STATUS.INPROCESS */) {
                    this.eventService.dispatch({}, TicketReopenedEvent);
                }
                else {
                    this.eventService.dispatch({}, NewMessageEvent);
                }
            }
        })))), {
            strategy: CommandStrategy.Queue,
        });
        this.uploadAttachmentCommand = this.commandService.create((payload) => this.customerTicketingPreConditions().pipe(switchMap(([customerId, ticketId]) => this.customerTicketingConnector
            .uploadAttachment(customerId, payload.ticketId ?? ticketId, payload.eventCode, payload.file)
            .pipe(tap(() => this.eventService.dispatch({}, UploadAttachmentSuccessEvent))))), {
            strategy: CommandStrategy.Queue,
        });
        this.downloadAttachmentCommand = this.commandService.create((payload) => this.customerTicketingPreConditions().pipe(switchMap(([customerId, ticketId]) => this.customerTicketingConnector.downloadAttachment(customerId, ticketId, payload.eventCode, payload.attachmentId))), {
            strategy: CommandStrategy.Queue,
        });
        this.getTicketQuery$ = this.queryService.create(() => this.customerTicketingPreConditions().pipe(switchMap(([customerId, ticketId]) => this.customerTicketingConnector.getTicket(customerId, ticketId))), {
            reloadOn: this.getTicketQueryReloadEvents(),
            resetOn: this.getTicketQueryResetEvents(),
        });
        this.getTicketCategoriesQuery = this.queryService.create(() => this.customerTicketingConnector.getTicketCategories(), {
            reloadOn: this.getTicketCategoriesQueryReloadEvents(),
            resetOn: this.getTicketCategoriesQueryResetEvents(),
        });
        this.getTicketAssociatedObjectsQuery = this.queryService.create(() => this.customerTicketingPreConditions().pipe(switchMap(([customerId]) => this.customerTicketingConnector.getTicketAssociatedObjects(customerId))), {
            reloadOn: this.getTicketAssociatedObjectsQueryReloadEvents(),
            resetOn: this.getTicketAssociatedObjectsQueryResetEvents(),
        });
    }
    getTicketAssociatedObjectsState() {
        return this.getTicketAssociatedObjectsQuery.getState();
    }
    getTicketAssociatedObjects() {
        return this.getTicketAssociatedObjectsState().pipe(concatMap((state) => state?.error ? throwError(state.error) : of(state)), map((state) => state.data ?? []));
    }
    getTicketCategoriesState() {
        return this.getTicketCategoriesQuery.getState();
    }
    getTicketCategories() {
        return this.getTicketCategoriesState().pipe(map((state) => state.data ?? []));
    }
    getTicketState() {
        return this.getTicketQuery$.getState();
    }
    getTicket() {
        return this.getTicketState().pipe(map((state) => state.data));
    }
    createTicket(ticketStarted) {
        return this.createTicketCommand.execute(ticketStarted);
    }
    getTicketsState(pageSize, currentPage, sort) {
        return this.getTicketsQuery$(pageSize, currentPage, sort).getState();
    }
    getTickets(pageSize, currentPage, sort) {
        return this.getTicketsState(pageSize, currentPage, sort).pipe(map((state) => state.data));
    }
    createTicketEvent(ticketEvent, containsAttachment = false) {
        return this.createTicketEventCommand.execute({
            ticketEvent,
            containsAttachment,
        });
    }
    uploadAttachment(file, eventCode, ticketId) {
        return this.uploadAttachmentCommand.execute({ file, eventCode, ticketId });
    }
    downloadAttachment(eventCode, attachmentId) {
        return this.downloadAttachmentCommand.execute({ eventCode, attachmentId });
    }
}
CustomerTicketingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingService, deps: [{ token: i1.QueryService }, { token: i1.CommandService }, { token: i1.UserIdService }, { token: CustomerTicketingConnector }, { token: i1.RoutingService }, { token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerTicketingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.QueryService }, { type: i1.CommandService }, { type: i1.UserIdService }, { type: CustomerTicketingConnector }, { type: i1.RoutingService }, { type: i1.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    CustomerTicketingService,
    {
        provide: CustomerTicketingFacade,
        useExisting: CustomerTicketingService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Check if the returned error is of type notFound.
 */
function isNotFoundError(error) {
    return (error.reason === "notFound" /* OccHttpErrorReason.NOT_FOUND_ERROR */ &&
        error.type === "NotFoundError" /* OccHttpErrorType.NOT_FOUND_ERROR */);
}

class NotFoundTicketRequestHandler extends HttpErrorHandler {
    constructor(globalMessageService, routingService, platformId) {
        super(globalMessageService, platformId);
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.platformId = platformId;
        this.responseStatus = HttpResponseStatus.NOT_FOUND;
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) &&
            this.isCustomerTicketingDetailsRoute() &&
            this.getErrors(errorResponse).some(isNotFoundError));
    }
    handleError(request, response) {
        this.handleTicketNotFoundError(request, response);
    }
    isCustomerTicketingDetailsRoute() {
        return (getLastValueSync(this.routingService.getRouterState())?.state
            ?.semanticRoute === 'supportTicketDetails');
    }
    handleTicketNotFoundError(_request, response) {
        this.getErrors(response)
            .filter((e) => isNotFoundError(e))
            .forEach(() => {
            this.routingService.go({ cxRoute: 'supportTickets' });
            this.globalMessageService.add({ key: 'customerTicketingDetails.ticketNotFound' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    getErrors(response) {
        return response.error?.errors || [];
    }
}
NotFoundTicketRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotFoundTicketRequestHandler, deps: [{ token: i1.GlobalMessageService }, { token: i1.RoutingService }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
NotFoundTicketRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotFoundTicketRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotFoundTicketRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }, { type: i1.RoutingService }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingPageMetaResolver extends PageMetaResolver {
    constructor(translationService, activeCartFacade, basePageMetaResolver, customerTicketingFacade, translation, semanticPath) {
        super();
        this.translationService = translationService;
        this.activeCartFacade = activeCartFacade;
        this.basePageMetaResolver = basePageMetaResolver;
        this.customerTicketingFacade = customerTicketingFacade;
        this.translation = translation;
        this.semanticPath = semanticPath;
        this.CUSTOMER_SERVICE_TRANSLATION_KEY = 'customerTicketing.customerService';
        this.CUSTOMER_SERVICE_SEMANTIC_ROUTE = 'supportTickets';
        this.customerServiceBreadCrumb$ = this.translation.translate(this.CUSTOMER_SERVICE_TRANSLATION_KEY).pipe(map((label) => [
            {
                label,
                link: this.semanticPath.get(this.CUSTOMER_SERVICE_SEMANTIC_ROUTE),
            },
        ]));
        this.pageType = PageType.CONTENT_PAGE;
        this.pageUid = 'support-ticket-details';
    }
    resolveTitle() {
        return this.basePageMetaResolver.resolveTitle();
    }
    /**
     * @override
     * Resolves the page heading for the Customer Ticket Details Page.
     * The page heading is used in the UI (`<h1>`), where as the page
     * title is used by the browser and crawlers.
     */
    resolveHeading() {
        return this.customerTicketingFacade
            .getTicket()
            .pipe(map((ticket) => ticket?.subject || ''));
    }
    resolveDescription() {
        return this.basePageMetaResolver.resolveDescription();
    }
    resolveRobots() {
        return this.basePageMetaResolver.resolveRobots();
    }
    resolveBreadcrumbs() {
        return combineLatest([
            this.customerServiceBreadCrumb$,
            this.basePageMetaResolver.resolveBreadcrumbs(),
        ]).pipe(map(([customerServiceBreadCrumb, breadcrumbs = []]) => {
            const [home, ...restBreadcrumbs] = breadcrumbs;
            return [home, ...customerServiceBreadCrumb, ...restBreadcrumbs];
        }));
    }
}
CustomerTicketingPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingPageMetaResolver, deps: [{ token: i1.TranslationService }, { token: i2.ActiveCartFacade }, { token: i1.BasePageMetaResolver }, { token: i3.CustomerTicketingFacade }, { token: i1.TranslationService }, { token: i1.SemanticPathService }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerTicketingPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i2.ActiveCartFacade }, { type: i1.BasePageMetaResolver }, { type: i3.CustomerTicketingFacade }, { type: i1.TranslationService }, { type: i1.SemanticPathService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingCoreModule {
}
CustomerTicketingCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCoreModule });
CustomerTicketingCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCoreModule, providers: [
        ...facadeProviders,
        CustomerTicketingConnector,
        CustomerTicketingPageMetaResolver,
        {
            provide: HttpErrorHandler,
            useExisting: NotFoundTicketRequestHandler,
            multi: true,
        },
        {
            provide: PageMetaResolver,
            useExisting: CustomerTicketingPageMetaResolver,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...facadeProviders,
                        CustomerTicketingConnector,
                        CustomerTicketingPageMetaResolver,
                        {
                            provide: HttpErrorHandler,
                            useExisting: NotFoundTicketRequestHandler,
                            multi: true,
                        },
                        {
                            provide: PageMetaResolver,
                            useExisting: CustomerTicketingPageMetaResolver,
                            multi: true,
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

export { CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER, CUSTOMER_TICKETING_CATEGORY_NORMALIZER, CUSTOMER_TICKETING_CREATE_NORMALIZER, CUSTOMER_TICKETING_DETAILS_NORMALIZER, CUSTOMER_TICKETING_EVENT_NORMALIZER, CUSTOMER_TICKETING_FILE_NORMALIZER, CUSTOMER_TICKETING_LIST_NORMALIZER, CustomerTicketingAdapter, CustomerTicketingConnector, CustomerTicketingCoreModule, CustomerTicketingPageMetaResolver, CustomerTicketingService, NotFoundTicketRequestHandler, isNotFoundError };
//# sourceMappingURL=spartacus-customer-ticketing-core.mjs.map
