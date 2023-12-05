import { OnDestroy } from '@angular/core';
import { EventService } from '@spartacus/core';
import { MessageEvent, MessagingComponent, MessagingConfigs } from '@spartacus/storefront';
import { CustomerTicketingConfig, CustomerTicketingFacade, TicketDetails, TicketEvent } from '@spartacus/customer-ticketing/root';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerTicketingMessagesComponent implements OnDestroy {
    protected customerTicketingConfig: CustomerTicketingConfig;
    protected customerTicketingFacade: CustomerTicketingFacade;
    protected eventService: EventService;
    messagingComponent: MessagingComponent;
    ticketDetails$: Observable<TicketDetails | undefined>;
    constructor(customerTicketingConfig: CustomerTicketingConfig, customerTicketingFacade: CustomerTicketingFacade, eventService: EventService);
    subscription: Subscription;
    messageEvents$: Observable<Array<MessageEvent>>;
    messagingConfigs: MessagingConfigs;
    onSend(event: {
        files: FileList | undefined;
        message: string;
    }): void;
    downloadAttachment(event: {
        messageCode: string | undefined;
        attachmentId: string | undefined;
        fileName: string | undefined;
    }): void;
    protected prepareMessageEvents(): Observable<Array<MessageEvent>>;
    protected prepareMessagingConfigs(): MessagingConfigs;
    protected prepareTicketEvent(messageText: string): TicketEvent;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingMessagesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerTicketingMessagesComponent, "cx-customer-ticketing-messages", never, {}, {}, never, never, false, never>;
}
