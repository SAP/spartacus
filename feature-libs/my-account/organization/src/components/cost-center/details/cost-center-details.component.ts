import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { CostCenter, CostCenterService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CurrentCostCenterService } from '../current-cost-center-code';

@Component({
  selector: 'cx-cost-center-details',
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentCostCenterService],
})
export class CostCenterDetailsComponent {
  costCenter$: Observable<CostCenter> = this.currentCostCenterService
    .get({ forceReload: true })
    .pipe(filter((costCenters) => Boolean(costCenters)));

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
