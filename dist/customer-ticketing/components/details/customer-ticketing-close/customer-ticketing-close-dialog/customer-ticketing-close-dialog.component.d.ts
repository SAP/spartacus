import { OnDestroy, OnInit } from '@angular/core';
import { TicketEvent } from '@spartacus/customer-ticketing/root';
import { Subscription } from 'rxjs';
import { CustomerTicketingDialogComponent } from '../../../shared/customer-ticketing-dialog/customer-ticketing-dialog.component';
import * as i0 from "@angular/core";
export declare class CustomerTicketingCloseDialogComponent extends CustomerTicketingDialogComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    ngOnInit(): void;
    closeRequest(): void;
    protected prepareTicketEvent(): TicketEvent;
    protected onComplete(): void;
    protected onError(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingCloseDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerTicketingCloseDialogComponent, "cx-customer-ticketing-close-dialog", never, {}, {}, never, never, false, never>;
}
