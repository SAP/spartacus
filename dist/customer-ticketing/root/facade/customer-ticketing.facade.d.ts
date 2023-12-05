import { QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AssociatedObject, Category, TicketDetails, TicketEvent, TicketList, TicketStarter } from '../model';
import * as i0 from "@angular/core";
export declare abstract class CustomerTicketingFacade {
    abstract getTicketState(): Observable<QueryState<TicketDetails | undefined>>;
    abstract getTicket(): Observable<TicketDetails | undefined>;
    abstract getTicketsState(pageSize: number, currentPage?: number, sort?: string): Observable<QueryState<TicketList | undefined>>;
    abstract getTickets(pageSize: number, currentPage?: number, sort?: string): Observable<TicketList | undefined>;
    abstract getTicketCategoriesState(): Observable<QueryState<Category[]>>;
    abstract getTicketCategories(): Observable<Category[]>;
    abstract getTicketAssociatedObjectsState(): Observable<QueryState<AssociatedObject[]>>;
    abstract getTicketAssociatedObjects(): Observable<AssociatedObject[]>;
    abstract createTicket(ticket: TicketStarter): Observable<TicketDetails>;
    abstract createTicketEvent(ticketEvent: TicketEvent, containsAttachment?: boolean): Observable<TicketEvent>;
    abstract uploadAttachment(file: File, eventCode: string, ticketId?: string): Observable<unknown>;
    abstract downloadAttachment(eventCode: string | undefined, attachmentId: string | undefined): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerTicketingFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomerTicketingFacade>;
}
