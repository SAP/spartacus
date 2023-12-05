import { OnDestroy } from '@angular/core';
import { EventService, RoutingService, TranslationService } from '@spartacus/core';
import { CustomerTicketingFacade, TicketDetails } from '@spartacus/customer-ticketing/root';
import { Card } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerTicketingDetailsComponent implements OnDestroy {
    protected translation: TranslationService;
    protected customerTicketingFacade: CustomerTicketingFacade;
    protected routingService: RoutingService;
    protected eventService: EventService;
    dateFormat: string;
    subscription: Subscription;
    ticketDetails$: Observable<TicketDetails | undefined>;
    constructor(translation: TranslationService, customerTicketingFacade: CustomerTicketingFacade, routingService: RoutingService, eventService: EventService);
    prepareCardContent(entity: string | undefined, titleTranslation: string, id?: string | undefined): Observable<Card>;
    getStatusClass(id?: string | undefined): string;
    protected reloadOnRedirection(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerTicketingDetailsComponent, "cx-customer-ticketing-details", never, {}, {}, never, never, false, never>;
}
