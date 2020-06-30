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
        (
          queryParams: B2BSearchConfig
        ): Observable<EntitiesModel<OrderApproval>> =>
          this.orderApprovalService.getList(queryParams).pipe(
            filter(Boolean),
            map((orderApprovalList: EntitiesModel<OrderApproval>) => ({
              sorts: orderApprovalList.sorts,
              pagination: orderApprovalList.pagination,
              values: orderApprovalList.values.map(
                (orderApproval: OrderApproval) => ({
                  code: orderApproval.order.code,
                  POCode: orderApproval.order.purchaseOrderNumber || 'None',
                  placedBy: `${orderApproval.order.orgCustomer.name} ${orderApproval.order.orgCustomer.orgUnit.name}`,
                  date: this.cxDate.transform(orderApproval.order.created),
                  status: `${orderApproval.order.statusDisplay}`,
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
