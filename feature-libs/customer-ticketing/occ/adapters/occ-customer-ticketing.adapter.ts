import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import {
  CustomerTicketingAdapter,
  CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER,
  CUSTOMER_TICKETING_CATEGORY_NORMALIZER,
  CUSTOMER_TICKETING_NORMALIZER,
} from '@spartacus/customer-ticketing/core';
import {
  AssociatedObjects,
  AssociatedObjectsList,
  Category,
  CategoryList,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OccCustomerTicketingAdapter implements CustomerTicketingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}
  getTicketAssociatedObjects(
    customerId: string
  ): Observable<AssociatedObjects[]> {
    return this.http
      .get<AssociatedObjectsList>(
        this.getTicketAssociatedObjectsEndpoint(customerId)
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        map(
          (associatedObjectList) =>
            associatedObjectList.ticketAssociatedObjects ?? []
        ),
        this.converter.pipeableMany(
          CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER
        )
      );
  }

  protected getTicketAssociatedObjectsEndpoint(customerId: string): string {
    return this.occEndpoints.buildUrl('getTicketAssociatedObjects', {
      urlParams: {
        customerId,
      },
    });
  }

  getTicketCategories(): Observable<Category[]> {
    return this.http.get<CategoryList>(this.getTicketCategoriesEndpoint()).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      map((categoryList) => categoryList.ticketCategories ?? []),
      this.converter.pipeableMany(CUSTOMER_TICKETING_CATEGORY_NORMALIZER)
    );
  }

  protected getTicketCategoriesEndpoint(): string {
    return this.occEndpoints.buildUrl('getTicketCategories');
  }

  getTicket(customerId: string, ticketId: string): Observable<TicketDetails> {
    return this.http
      .get<TicketDetails>(this.getTicketEndpoint(customerId, ticketId))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_NORMALIZER)
      );
  }

  protected getTicketEndpoint(customerId: string, ticketId: string): string {
    return this.occEndpoints.buildUrl('getTicket', {
      urlParams: {
        customerId,
        ticketId,
      },
    });
  }
}
