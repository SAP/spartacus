import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICON_TYPE } from '@spartacus/storefront';
import {
  CustomerTicketingFacade,
  TicketDetails,
  TicketList,
} from '@spartacus/customer-ticketing/root';
import { combineLatest, Observable } from 'rxjs';
import { RoutingService, TranslationService } from '@spartacus/core';
import { STATUS, TEXT_COLOR_CLASS } from '@spartacus/customer-ticketing/root';

@Component({
  selector: 'cx-customer-ticketing-list',
  templateUrl: './customer-ticketing-list.component.html',
})
export class CustomerTicketingListComponent {
  constructor(
    protected customerTicketingFacade: CustomerTicketingFacade,
    protected routing: RoutingService,
    protected translation: TranslationService
  ) {}
  PAGE_SIZE = 5;
  sortType: string = 'byId';
  iconTypes = ICON_TYPE;
  customerTicketsFlag: boolean = true;
  tickets$: Observable<TicketList | undefined> =
    this.customerTicketingFacade.getTickets(this.PAGE_SIZE);
  tickets: Observable<Array<TicketDetails>> = this.tickets$?.pipe(
    map((ticketList) => ticketList?.tickets)
  );

  goToTicketDetail(ticketId: string): void {
    this.routing.go({
      cxRoute: 'supportTicketDetails',
      params: { ticketCode: ticketId },
    });
  }

  getSortLabels(): Observable<{ byTicketId: string; byDate: string }> {
    return combineLatest([
      this.translation.translate('customerTicketing.ticketId'),
      this.translation.translate('customerTicketing.changedOn'),
    ]).pipe(
      map(([textByTicketId, textByDate]) => {
        return {
          byTicketId: textByTicketId,
          byDate: textByDate,
        };
      })
    );
  }

  changeSortCode(sortCode: string): void {
    this.sortType = sortCode;
    this.pageChange(0);
  }

  pageChange(page: number): void {
    const ticketListParams = this.createTicketListEvent(this.sortType, page);
    this.fetchTicketList(ticketListParams);
  }

  createTicketListEvent(
    sortCode: string,
    currentPage: number
  ): { currentPage: number; sortCode: string } {
    return {
      currentPage: currentPage,
      sortCode: sortCode,
    };
  }

  private fetchTicketList(ticketListParams: {
    sortCode: string;
    currentPage: number;
  }): void {
    this.tickets$ = this.customerTicketingFacade.getTickets(
      this.PAGE_SIZE,
      ticketListParams.currentPage,
      ticketListParams.sortCode
    );
    this.tickets = this.tickets$?.pipe(
      map((ticketList) => ticketList?.tickets)
    );
  }

  getStatusClass = (status: string): string => {
    switch (status) {
      case STATUS.OPEN:
      case STATUS.INPROCESS:
        return TEXT_COLOR_CLASS.GREEN;
      case STATUS.CLOSED:
        return TEXT_COLOR_CLASS.GREY;
      default:
        return '';
    }
  };
}
