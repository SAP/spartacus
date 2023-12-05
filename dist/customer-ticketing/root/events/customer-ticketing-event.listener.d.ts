import { OnDestroy } from '@angular/core';
import { EventService, GlobalMessageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerTicketingEventListener implements OnDestroy {
    protected eventService: EventService;
    protected globalMessageService: GlobalMessageService;
    protected subscriptions: Subscription;
    constructor(eventService: EventService, globalMessageService: GlobalMessageService);
    protected onTicketCreatedEvent(): void;
    protected onLanguageAndCurrencySetEvent(): void;
    protected onLoginAndLogoutEvent(): void;
    protected onNewMessage(): void;
    protected onTicketClosed(): void;
    protected onTicketReopened(): void;
    protected onUploadAttachmentSucess(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerTicketingEventListener>;
}
