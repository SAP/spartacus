import { OnDestroy, OnInit } from '@angular/core';
import { TicketEvent } from '@spartacus/customer-ticketing/root';
import { Subscription } from 'rxjs';
import { CustomerTicketingDialogComponent } from '../../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';
import * as i0 from "@angular/core";
export declare class CustomerTicketingReopenDialogComponent extends CustomerTicketingDialogComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    ngOnInit(): void;
    reopenRequest(): void;
    protected onComplete(): void;
    protected onError(): void;
    protected prepareTicketEvent(): TicketEvent;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingReopenDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerTicketingReopenDialogComponent, "cx-customer-ticketing-reopen-dialog", never, {}, {}, never, never, false, never>;
}
