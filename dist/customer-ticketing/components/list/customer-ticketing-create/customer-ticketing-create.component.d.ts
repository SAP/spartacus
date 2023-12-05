import { ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CustomerTicketingCreateComponent implements OnDestroy {
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    protected subscription: Subscription;
    element: ElementRef;
    constructor(launchDialogService: LaunchDialogService, vcr: ViewContainerRef);
    openCreateNewTicketDialog(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingCreateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerTicketingCreateComponent, "cx-customer-ticketing-create", never, {}, {}, never, never, false, never>;
}
