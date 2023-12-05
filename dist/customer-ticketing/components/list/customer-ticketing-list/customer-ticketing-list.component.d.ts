import { RoutingService, TranslationService } from '@spartacus/core';
import { CustomerTicketingConfig, CustomerTicketingFacade, TicketList } from '@spartacus/customer-ticketing/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerTicketingListComponent {
    protected customerTicketingFacade: CustomerTicketingFacade;
    protected routingService: RoutingService;
    protected translationService: TranslationService;
    protected customerTicketingConfig: CustomerTicketingConfig;
    constructor(customerTicketingFacade: CustomerTicketingFacade, routingService: RoutingService, translationService: TranslationService, customerTicketingConfig: CustomerTicketingConfig);
    PAGE_SIZE: number;
    sortType: string;
    iconTypes: typeof ICON_TYPE;
    tickets$: Observable<TicketList | undefined>;
    goToTicketDetail(ticketId: string | undefined): void;
    getSortLabels(): Observable<{
        byTicketId: string;
        byDate: string;
    }>;
    changeSortCode(sortCode: string): void;
    pageChange(page: number): void;
    createTicketListEvent(sortCode: string, currentPage: number): {
        currentPage: number;
        sortCode: string;
    };
    private fetchTicketList;
    getStatusClass: (status: string) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerTicketingListComponent, "cx-customer-ticketing-list", never, {}, {}, never, never, false, never>;
}
