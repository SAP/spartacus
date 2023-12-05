import { ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { CustomerTicketingFacade } from '@spartacus/customer-ticketing/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerTicketingCloseComponent implements OnDestroy {
    protected customerTicketingFacade: CustomerTicketingFacade;
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    protected subscription: Subscription;
    element: ElementRef;
    enableCloseButton$: Observable<boolean | undefined>;
    constructor(customerTicketingFacade: CustomerTicketingFacade, launchDialogService: LaunchDialogService, vcr: ViewContainerRef);
    openDialog(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingCloseComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerTicketingCloseComponent, "cx-customer-ticketing-close", never, {}, {}, never, never, false, never>;
}
