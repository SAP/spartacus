import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CUSTOMER_TICKETING_FEATURE } from '../feature-name';
import { AssociatedObjects, Category, TicketDetails } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CustomerTicketingFacade,
      feature: CUSTOMER_TICKETING_FEATURE,
      methods: [
        'getTicketState',
        'getTicket',
        'getTicketCategoriesState',
        'getTicketCategories',
        'getTicketAssociatedObjectsState',
        'getTicketAssociatedObjects',
      ],
    }),
})
export abstract class CustomerTicketingFacade {
  abstract getTicketState(): Observable<QueryState<TicketDetails | undefined>>;

  abstract getTicket(): Observable<TicketDetails | undefined>;

  abstract getTicketCategoriesState(): Observable<
    QueryState<Category[] | undefined>
  >;

  abstract getTicketCategories(): Observable<Category[]>;

  abstract getTicketAssociatedObjectsState(): Observable<
    QueryState<AssociatedObjects[] | undefined>
  >;

  abstract getTicketAssociatedObjects(): Observable<AssociatedObjects[]>;
}
