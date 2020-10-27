import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CostCenter, Currency, CurrencyService } from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ActiveCostCenterGuard } from '../guards/active-cost-center.guard';
import { CostCenterItemService } from '../services/cost-center-item.service';

@Component({
  selector: 'cx-cost-center-form',
  templateUrl: './cost-center-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: CostCenterItemService,
    },
    ActiveCostCenterGuard,
  ],
})
export class CostCenterFormComponent implements AfterViewInit {
  form: FormGroup = this.itemService.getForm();
  /**
   * Initialize the business unit for the cost center.
   *
   * If there's a unit provided, we disable the form control.
   */
  @Input() set unitKey(value: string) {
    if (value) {
      this.form?.get('unit.uid').setValue(value);
      this.form?.get('unit')?.disable();
    }
  }

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  constructor(
    protected itemService: OrganizationItemService<CostCenter>,
    protected unitService: OrgUnitService,
    protected currencyService: CurrencyService,
    protected activeCostCenterGuard: ActiveCostCenterGuard
  ) {}

  ngAfterViewInit(): void {
    this.activeCostCenterGuard.canActivate().subscribe();
  }
}
