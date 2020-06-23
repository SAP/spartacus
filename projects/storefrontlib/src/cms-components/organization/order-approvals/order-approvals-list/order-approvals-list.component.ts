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

@Component({
  selector: 'cx-order-approvals-list',
  templateUrl: './order-approvals-list.component.html',
})
export class OrderApprovalsListComponent extends AbstractListingComponent
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

    this.data$.subscribe((data: ListingModel) => console.log(data));
  }
}
