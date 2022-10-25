import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { UnitLevelOrderDetailService } from '../unit-level-order-detail.service';

@Component({
  selector: 'cx-unit-level-order-detail-items-wrapper',
  templateUrl: './unit-level-order-detail-items-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitLevelOrderDetailItemsWrapperComponent {
  constructor(
    private unitLevelOrderDetailService: UnitLevelOrderDetailService
  ) {}

  order$: Observable<Order> =
    this.unitLevelOrderDetailService.getOrderDetails();
}
