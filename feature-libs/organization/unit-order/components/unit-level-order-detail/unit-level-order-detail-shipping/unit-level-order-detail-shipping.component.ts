import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { UnitLevelOrderDetailService } from '../unit-level-order-detail.service';

@Component({
  selector: 'cx-unit-level-order-detail-shipping',
  templateUrl: './unit-level-order-detail-shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitLevelOrderDetailShippingComponent {
  constructor(
    private unitLevelOrderDetailService: UnitLevelOrderDetailService
  ) {}

  order$: Observable<Order> =
    this.unitLevelOrderDetailService.getOrderDetails();
}
