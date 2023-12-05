import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { Config, CxEvent, GlobalMessageType, LanguageSetEvent, CurrencySetEvent, LogoutEvent, LoginEvent, provideDefaultConfigFactory, provideDefaultConfig, AuthGuard, facadeFactory } from '@spartacus/core';
import * as i1$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { Subscription, merge } from 'rxjs';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingConfig {
}
CustomerTicketingConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CustomerTicketingConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingConfig, decorators: [{
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
const MAX_INPUT_CHARACTERS = 5000;
const MAX_INPUT_CHARACTERS_FOR_SUBJECT = 255;
const MAX_SIZE_FOR_ATTACHMENT = 10;
const MAX_ENTRIES_FOR_ATTACHMENT = 1;
const DATE_FORMAT = 'MMMM d, YYYY h:mm aa';
const LIST_VIEW_PAGE_SIZE = 5;

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCustomerTicketingConfig = {
    customerTicketing: {
        attachmentRestrictions: {
            maxSize: MAX_SIZE_FOR_ATTACHMENT,
            allowedTypes: [
                '.pdf',
                '.txt',
                '.png',
                '.jpg',
                '.jpeg',
                '.gif',
                '.doc',
                '.docx',
                '.html',
                '.htm',
                '.zip',
            ],
        },
        inputCharactersLimit: MAX_INPUT_CHARACTERS,
        inputCharactersLimitForSubject: MAX_INPUT_CHARACTERS_FOR_SUBJECT,
        listViewPageSize: LIST_VIEW_PAGE_SIZE,
    },
};

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
const defaultCustomerTicketingRoutingConfig = {
    routing: {
        routes: {
            supportTickets: {
                paths: ['my-account/support-tickets'],
            },
            supportTicketDetails: {
                paths: ['my-account/support-ticket/:ticketCode'],
                paramsMapping: { ticketCode: 'ticketCode' },
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CUSTOMER_TICKETING_FEATURE = 'customerTicketing';
const CUSTOMER_TICKETING_CORE_FEATURE = 'customerTicketingCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class GetTicketQueryResetEvent extends CxEvent {
}
GetTicketQueryResetEvent.type = 'GetTicketQueryResetEvent';
class GetTicketQueryReloadEvent extends CxEvent {
}
GetTicketQueryReloadEvent.type = 'GetTicketQueryReloadEvent';
class GetTicketsQueryResetEvents extends CxEvent {
}
GetTicketsQueryResetEvents.type = 'GetTicketsQueryResetEvents';
class GetTicketsQueryReloadEvents extends CxEvent {
}
GetTicketsQueryReloadEvents.type = 'GetTicketsQueryReloadEvents';
class NewMessageEvent extends CxEvent {
}
NewMessageEvent.type = 'NewMessageEvent';
class TicketReopenedEvent extends CxEvent {
}
TicketReopenedEvent.type = 'TicketReopenedEvent';
class TicketClosedEvent extends CxEvent {
}
TicketClosedEvent.type = 'TicketClosedEvent';
class GetTicketCategoryQueryResetEvent extends CxEvent {
}
GetTicketCategoryQueryResetEvent.type = 'GetTicketCategoryQueryResetEvent';
class GetTicketCategoryQueryReloadEvent extends CxEvent {
}
GetTicketCategoryQueryReloadEvent.type = 'GetTicketCategoryQueryReloadEvent';
class GetTicketAssociatedObjectsQueryResetEvent extends CxEvent {
}
GetTicketAssociatedObjectsQueryResetEvent.type = 'GetTicketAssociatedObjectsQueryResetEvent';
class GetTicketAssociatedObjectsQueryReloadEvent extends CxEvent {
}
GetTicketAssociatedObjectsQueryReloadEvent.type = 'GetTicketAssociatedObjectsQueryReloadEvent';
class TicketCreatedEvent extends CxEvent {
}
TicketCreatedEvent.type = 'TicketCreatedEvent';
class CreateEvent extends CxEvent {
}
CreateEvent.type = 'CreateEvent';
class UploadAttachmentSuccessEvent extends CxEvent {
}
UploadAttachmentSuccessEvent.type = 'UploadAttachmentSuccessEvent';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingEventListener {
    constructor(eventService, globalMessageService) {
        this.eventService = eventService;
        this.globalMessageService = globalMessageService;
        this.subscriptions = new Subscription();
        this.onLanguageAndCurrencySetEvent();
        this.onLoginAndLogoutEvent();
        this.onTicketCreatedEvent();
        this.onNewMessage();
        this.onTicketClosed();
        this.onTicketReopened();
        this.onUploadAttachmentSucess();
    }
    onTicketCreatedEvent() {
        this.subscriptions.add(this.eventService.get(TicketCreatedEvent).subscribe(() => {
            this.globalMessageService.add({
                key: 'createCustomerTicket.ticketCreated',
            }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            this.eventService.dispatch({}, GetTicketsQueryReloadEvents);
        }));
    }
    onLanguageAndCurrencySetEvent() {
        this.subscriptions.add(merge(this.eventService.get(LanguageSetEvent), this.eventService.get(CurrencySetEvent)).subscribe(() => {
            this.eventService.dispatch({}, GetTicketsQueryReloadEvents);
            this.eventService.dispatch({}, GetTicketQueryReloadEvent);
        }));
    }
    onLoginAndLogoutEvent() {
        this.subscriptions.add(merge(this.eventService.get(LogoutEvent), this.eventService.get(LoginEvent)).subscribe(() => {
            this.eventService.dispatch({}, GetTicketQueryResetEvent);
            this.eventService.dispatch({}, GetTicketsQueryResetEvents);
            this.eventService.dispatch({}, GetTicketCategoryQueryResetEvent);
            this.eventService.dispatch({}, GetTicketAssociatedObjectsQueryResetEvent);
        }));
    }
    onNewMessage() {
        this.subscriptions.add(this.eventService.get(NewMessageEvent).subscribe(() => {
            this.eventService.dispatch({}, GetTicketQueryReloadEvent);
        }));
    }
    onTicketClosed() {
        this.subscriptions.add(this.eventService.get(TicketClosedEvent).subscribe(() => {
            this.eventService.dispatch({}, GetTicketQueryResetEvent);
            this.globalMessageService.add({
                key: 'customerTicketingDetails.requestClosed',
            }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }));
    }
    onTicketReopened() {
        this.subscriptions.add(this.eventService.get(TicketReopenedEvent).subscribe(() => {
            this.eventService.dispatch({}, GetTicketQueryReloadEvent);
            this.globalMessageService.add({
                key: 'customerTicketingDetails.requestReopened',
            }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }));
    }
    onUploadAttachmentSucess() {
        this.subscriptions.add(this.eventService.get(UploadAttachmentSuccessEvent).subscribe(() => {
            this.eventService.dispatch({}, GetTicketQueryReloadEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CustomerTicketingEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingEventListener, deps: [{ token: i1.EventService }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerTicketingEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerTicketingEventModule {
    constructor(_customerTicketingEventListener) {
        // Intentional empty constructor
    }
}
CustomerTicketingEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingEventModule, deps: [{ token: CustomerTicketingEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingEventModule });
CustomerTicketingEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: CustomerTicketingEventListener }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultCustomerTicketingComponentsConfig() {
    const config = {
        featureModules: {
            [CUSTOMER_TICKETING_FEATURE]: {
                cmsComponents: [
                    'SupportTicketHistoryComponent',
                    'SupportTicketUpdateComponent',
                    'SupportTicketDetailsComponent',
                    'SupportTicketReopenComponent',
                    'SupportTicketCloseComponent',
                    'MyAccountViewRequestsComponent',
                ],
            },
            // by default core is bundled together with components
            [CUSTOMER_TICKETING_CORE_FEATURE]: CUSTOMER_TICKETING_FEATURE,
        },
    };
    return config;
}
class CustomerTicketingRootModule {
}
CustomerTicketingRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingRootModule, imports: [CustomerTicketingEventModule, i1$1.RouterModule] });
CustomerTicketingRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingRootModule, providers: [
        provideDefaultConfigFactory(defaultCustomerTicketingComponentsConfig),
        provideDefaultConfig(defaultCustomerTicketingRoutingConfig),
        provideDefaultConfig(defaultCustomerTicketingConfig),
    ], imports: [CustomerTicketingEventModule,
        RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'supportTicketDetails',
                },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'supportTickets',
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CustomerTicketingEventModule,
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'supportTicketDetails',
                                },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'supportTickets',
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultCustomerTicketingComponentsConfig),
                        provideDefaultConfig(defaultCustomerTicketingRoutingConfig),
                        provideDefaultConfig(defaultCustomerTicketingConfig),
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
class CustomerTicketingFacade {
}
CustomerTicketingFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CustomerTicketingFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CustomerTicketingFacade,
        feature: CUSTOMER_TICKETING_FEATURE,
        methods: [
            'getTicketState',
            'getTicket',
            'getTicketsState',
            'getTickets',
            'createTicketEvent',
            'getTicketCategoriesState',
            'getTicketCategories',
            'getTicketAssociatedObjectsState',
            'getTicketAssociatedObjects',
            'createTicket',
            'uploadAttachment',
            'downloadAttachment',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CustomerTicketingFacade,
                        feature: CUSTOMER_TICKETING_FEATURE,
                        methods: [
                            'getTicketState',
                            'getTicket',
                            'getTicketsState',
                            'getTickets',
                            'createTicketEvent',
                            'getTicketCategoriesState',
                            'getTicketCategories',
                            'getTicketAssociatedObjectsState',
                            'getTicketAssociatedObjects',
                            'createTicket',
                            'uploadAttachment',
                            'downloadAttachment',
                        ],
                    }),
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { CUSTOMER_TICKETING_CORE_FEATURE, CUSTOMER_TICKETING_FEATURE, CreateEvent, CustomerTicketingConfig, CustomerTicketingEventListener, CustomerTicketingEventModule, CustomerTicketingFacade, CustomerTicketingRootModule, DATE_FORMAT, GetTicketAssociatedObjectsQueryReloadEvent, GetTicketAssociatedObjectsQueryResetEvent, GetTicketCategoryQueryReloadEvent, GetTicketCategoryQueryResetEvent, GetTicketQueryReloadEvent, GetTicketQueryResetEvent, GetTicketsQueryReloadEvents, GetTicketsQueryResetEvents, LIST_VIEW_PAGE_SIZE, MAX_ENTRIES_FOR_ATTACHMENT, MAX_INPUT_CHARACTERS, MAX_INPUT_CHARACTERS_FOR_SUBJECT, MAX_SIZE_FOR_ATTACHMENT, NewMessageEvent, TicketClosedEvent, TicketCreatedEvent, TicketReopenedEvent, UploadAttachmentSuccessEvent, defaultCustomerTicketingComponentsConfig, defaultCustomerTicketingConfig };
//# sourceMappingURL=spartacus-customer-ticketing-root.mjs.map
