import { Component, OnInit } from '@angular/core';
import {
  B2BSearchConfig,
  CxDatePipe,
  EntitiesModel,
  OrderApproval,
  OrderApprovalService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

// const x = <Observable<ListingModel>>of({
//   pagination: {
//     currentPage: 0,
//     pageSize: 20,
//     sort: 'byDate',
//     totalPages: 1,
//     totalResults: 1,
//   },
//   sorts: [
//     {
//       code: 'byDate',
//       selected: true,
//     },
//     {
//       code: 'byCode',
//       selected: false,
//     },
//   ],
//   values: [
//     {
//       POCode: 'wip',
//       code: '00000120',
//       date: 'Jun 18, 2020',
//       placedBy: 'Mark Rivers Custom Retail',
//       status: 'Approved approved',
//       total: '$157,394.99',
//     },
//     {
//       POCode: 'wip',
//       code: '00000090',
//       date: 'Jun 17, 2020',
//       placedBy: 'Mark Rivers Custom Retail',
//       status: 'Approved approved',
//       total: '$157,394.99',
//     },
//   ],
// });

@Component({
  selector: 'cx-order-approval-list',
  templateUrl: './order-approval-list.component.html',
})
export class OrderApprovalListComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'orderApprovals';

  constructor(
    protected routingService: RoutingService,
    protected orderApprovalService: OrderApprovalService,
    protected cxDate: CxDatePipe
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
      tap((queryParams: B2BSearchConfig): void =>
        this.orderApprovalService.loadOrderApprovals(queryParams)
      ),
      switchMap(
        (queryParams: B2BSearchConfig): Observable<EntitiesModel<any>> =>
          this.orderApprovalService.getList(queryParams).pipe(
            filter(Boolean),
            map((orderApprovalList: EntitiesModel<OrderApproval>) => ({
              sorts: orderApprovalList.sorts,
              pagination: orderApprovalList.pagination,
              values: orderApprovalList.values.map(
                (orderApproval: OrderApproval) => ({
                  code: orderApproval.order.code,
                  POCode: 'wip',
                  placedBy: `${orderApproval.order.orgCustomer.name} ${orderApproval.order.orgCustomer.orgUnit.name}`,
                  date: this.cxDate.transform(orderApproval.order.created),
                  status: `${orderApproval.order.statusDisplay
                    .split(/\.|\s/)
                    .shift()
                    .charAt(0)
                    .toUpperCase()}${orderApproval.order.statusDisplay
                    .split(/\.|\s/)
                    .shift()
                    .slice(1)} ${orderApproval.order.statusDisplay
                    .split(/\.|\s/)
                    .pop()}`,
                  total: orderApproval.order.totalPrice.formattedValue,
                })
              ),
            }))
          )
      )
    );

    this.data$.subscribe(console.log);
  }
}
