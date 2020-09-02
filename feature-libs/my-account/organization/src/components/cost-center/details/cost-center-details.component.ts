import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CostCenter } from '@spartacus/core';
import { Observable } from 'rxjs';
import { first, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CostCenterService } from '../../../core/services/cost-center.service';
import { OrganizationMessageComponent as MsgBox } from '../../shared/organization-message/organization-message.component';
import { CurrentCostCenterService } from '../services/current-cost-center.service';

@Component({
  selector: 'cx-cost-center-details',
  templateUrl: './cost-center-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterDetailsComponent {
  @ViewChild(MsgBox, { read: MsgBox }) messageBox: MsgBox;

  model$: Observable<CostCenter> = this.currentCostCenterService.key$.pipe(
    tap((code) => this.costCenterService.load(code)),
    switchMap((code) => this.costCenterService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    protected currentCostCenterService: CurrentCostCenterService,
    protected costCenterService: CostCenterService
  ) {}

  toggleActive(model: CostCenter) {
    if (model.active) {
      this.messageBox.prompt('costCenter.messages.deactivate');
    } else {
      this.update(model);
    }
  }

  protected update(model: CostCenter): void {
    const costCenter = { ...model, activeFlag: !model.active };
    this.costCenterService.update(costCenter.code, costCenter);
    this.confirmMessage(costCenter);
  }

  protected confirmMessage(model: CostCenter): void {
    this.messageBox.close();
    this.model$
      .pipe(first((update) => update.active === model.activeFlag))
      .subscribe((update) => {
        this.messageBox.notify(
          update.active
            ? 'costCenter.messages.confirmEnabled'
            : 'costCenter.messages.confirmDisabled'
        );
      });
  }
}
