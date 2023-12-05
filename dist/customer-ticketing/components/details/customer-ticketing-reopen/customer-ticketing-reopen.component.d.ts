import { ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerTicketingReopenComponent implements OnDestroy {
    protected customerTicketingFacade: CustomerTicketingFacade;
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    protected subscription: Subscription;
    element: ElementRef;
    enableReopenButton$: Observable<boolean | undefined>;
    constructor(customerTicketingFacade: CustomerTicketingFacade, launchDialogService: LaunchDialogService, vcr: ViewContainerRef);
    openDialog(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingReopenComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerTicketingReopenComponent, "cx-customer-ticketing-reopen", never, {}, {}, never, never, false, never>;
}
