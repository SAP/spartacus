import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReturnRequestList, OrderReturnRequestService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-order-return-requests',
  templateUrl: './order-return-requests.component.html',
})
export class OrderReturnRequestsComponent implements OnInit, OnDestroy {
  constructor(private returnRequestService: OrderReturnRequestService) {}

  returnRequests$: Observable<ReturnRequestList>;
  isLoaded$: Observable<boolean>;

  private PAGE_SIZE = 5;

  sortType: string;

  ngOnInit(): void {
    this.returnRequests$ = this.returnRequestService
      .getOrderReturnRequestList(this.PAGE_SIZE)
      .pipe(
        tap((requestList: ReturnRequestList) => {
          if (requestList.pagination) {
            this.sortType = requestList.pagination.sort;
          }
        })
      );
  }

  ngOnDestroy(): void {}
}
