import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
  RoutingService,
  GlobalMessageService,
  GlobalMessageType
} from '@spartacus/core';
import {
  CustomerTicketingAdapter,
  CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER,
  CUSTOMER_TICKETING_CATEGORY_NORMALIZER,
  CUSTOMER_TICKETING_CREATE_NORMALIZER,
  CUSTOMER_TICKETING_DETAILS_NORMALIZER,
  CUSTOMER_TICKETING_EVENT_NORMALIZER,
  CUSTOMER_TICKETING_FILE_NORMALIZER,
  CUSTOMER_TICKETING_LIST_NORMALIZER,
} from '@spartacus/customer-ticketing/core';
import {
  AssociatedObject,
  AssociatedObjectsList,
  CategoriesList,
  Category,
  TicketDetails,
  TicketEvent,
  TicketList,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class OccCustomerTicketingAdapter implements CustomerTicketingAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}
  getTicketAssociatedObjects(
    customerId: string
  ): Observable<AssociatedObject[]> {
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
    return this.http
      .get<CategoriesList>(this.getTicketCategoriesEndpoint())
      .pipe(
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
        catchError((error) => {
          if(error.error.errors[0].type === 'NotFoundError'
              && error.error.errors[0].message.toLowerCase().startsWith('ticket'))
              {
                this.routingService.go({ cxRoute: 'supportTickets' });
                this.globalMessageService.add(
                  { key: 'httpHandlers.ticketNotFound' },
                  GlobalMessageType.MSG_TYPE_ERROR
                );
              }
          return throwError(normalizeHttpError(error));
        }),
        tap((ticket) => ticket.ticketEvents?.reverse()),
        this.converter.pipeable(CUSTOMER_TICKETING_DETAILS_NORMALIZER)
      );
  }

  createTicket(
    customerId: string,
    ticket: TicketStarter
  ): Observable<TicketStarter> {
    ticket = this.converter.convert(
      ticket,
      CUSTOMER_TICKETING_CREATE_NORMALIZER
    );
    return this.http
      .post<TicketStarter>(this.getCreateTicketEndpoint(customerId), ticket, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_CREATE_NORMALIZER)
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

  protected getCreateTicketEndpoint(customerId: string): string {
    return this.occEndpoints.buildUrl('createTicket', {
      urlParams: {
        customerId,
      },
    });
  }

  getTickets(
    customerId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<TicketList> {
    return this.http
      .get<TicketList>(
        this.getTicketsEndpoint(customerId, pageSize, currentPage, sort)
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_LIST_NORMALIZER)
      );
  }

  protected getTicketsEndpoint(
    customerId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): string {
    return this.occEndpoints.buildUrl('getTickets', {
      urlParams: {
        customerId,
      },
      queryParams: {
        pageSize,
        currentPage,
        sort,
      },
    });
  }

  createTicketEvent(
    customerId: string,
    ticketId: string,
    ticketEvent: TicketEvent
  ): Observable<TicketEvent> {
    ticketEvent = this.converter.convert(
      ticketEvent,
      CUSTOMER_TICKETING_EVENT_NORMALIZER
    );

    return this.http
      .post<TicketEvent>(
        this.getCreateTicketEventEndpoint(customerId, ticketId),
        ticketEvent,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_EVENT_NORMALIZER)
      );
  }

  protected getCreateTicketEventEndpoint(
    customerId: string,
    ticketId: string
  ): string {
    return this.occEndpoints.buildUrl('createTicketEvent', {
      urlParams: {
        customerId,
        ticketId,
      },
    });
  }

  uploadAttachment(
    customerId: string,
    ticketId: string,
    eventCode: string,
    file: File
  ): Observable<unknown> {
    file = this.converter.convert(file, CUSTOMER_TICKETING_FILE_NORMALIZER);
    let formData: FormData = new FormData();
    formData.append('ticketEventAttachment', file);

    return this.http
      .post(
        this.getUploadAttachmentEndpoint(customerId, ticketId, eventCode),
        formData
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_FILE_NORMALIZER)
      );
  }

  protected getUploadAttachmentEndpoint(
    customerId: string,
    ticketId: string,
    eventCode: string
  ): string {
    return this.occEndpoints.buildUrl('uploadAttachment', {
      urlParams: {
        customerId,
        ticketId,
        eventCode,
      },
    });
  }

  downloadAttachment(
    customerId: string,
    ticketId: string,
    eventCode: string,
    attachmentId: string
  ): Observable<unknown> {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    return this.http
      .get(
        this.getDownloadAttachmentEndpoint(
          customerId,
          ticketId,
          eventCode,
          attachmentId
        ),
        httpOptions
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(CUSTOMER_TICKETING_FILE_NORMALIZER)
      );
  }

  protected getDownloadAttachmentEndpoint(
    customerId: string,
    ticketId: string,
    eventCode: string,
    attachmentId: string
  ): string {
    return this.occEndpoints.buildUrl('downloadAttachment', {
      urlParams: {
        customerId,
        ticketId,
        eventCode,
        attachmentId,
      },
    });
  }
}
