import { CustomerTicketingFacade, TicketList } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MyAccountV2CustomerTicketingComponent {
    protected readonly PAGE_SIZE = 1;
    protected customerTicketingFacade: CustomerTicketingFacade;
    tickets$: Observable<TicketList | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2CustomerTicketingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyAccountV2CustomerTicketingComponent, "cx-my-account-v2-customer-ticketing", never, {}, {}, never, never, false, never>;
}
