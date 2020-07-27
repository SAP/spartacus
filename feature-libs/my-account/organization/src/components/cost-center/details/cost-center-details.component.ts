import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { CostCenter, CostCenterService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, switchMapTo, tap } from 'rxjs/operators';
import { CurrentCostCenterService } from '../current-cost-center-code';

@Component({
  selector: 'cx-cost-center-details',
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentCostCenterService],
})
export class CostCenterDetailsComponent {
  /**
   * The model of the current cost center.
   *
   * It reloads the model when trying to get it.
   */
  costCenter$: Observable<
    CostCenter
  > = this.currentCostCenterService.code$.pipe(
    tap((code) => this.costCentersService.load(code)),
    switchMapTo(this.currentCostCenterService.model$),
    filter(Boolean)
  );

  constructor(
    protected currentCostCenterService: CurrentCostCenterService,
    protected costCentersService: CostCenterService,
    // TODO: consider relying on css only
    protected modalService: ModalService
  ) {}

  update(costCenter: CostCenter) {
    this.costCentersService.update(costCenter.code, costCenter);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
