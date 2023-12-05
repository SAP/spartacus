import { AssociatedObject, Category, TicketDetails, TicketEvent, TicketList, TicketStarter } from '@spartacus/customer-ticketing/root';
import { Observable } from 'rxjs';
import { CustomerTicketingAdapter } from './customer-ticketing.adapter';
import * as i0 from "@angular/core";
export declare class CustomerTicketingConnector {
    protected adapter: CustomerTicketingAdapter;
    constructor(adapter: CustomerTicketingAdapter);
    getTicket(customerId: string, ticketId: string): Observable<TicketDetails>;
    getTickets(customerId: string, pageSize?: number, currentPage?: number, sort?: string): Observable<TicketList>;
    getTicketCategories(): Observable<Category[]>;
    getTicketAssociatedObjects(customerId: string): Observable<AssociatedObject[]>;
    createTicket(customerId: string, ticket: TicketStarter): Observable<TicketStarter>;
    createTicketEvent(customerId: string, ticketId: string, ticketEvent: TicketEvent): Observable<TicketEvent>;
    uploadAttachment(customerId: string, ticketId: string, eventCode: string, file: File): Observable<unknown>;
    downloadAttachment(customerId: string, ticketId: string, eventCode: string, attachmentId: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerTicketingConnector>;
}
