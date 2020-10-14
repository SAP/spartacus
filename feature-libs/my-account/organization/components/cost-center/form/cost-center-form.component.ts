import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CostCenter, Currency, CurrencyService } from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
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
  ],
})
export class CostCenterFormComponent {
  /**
   * Initialize the business unit for the cost center.
   *
   * If there's a unit provided, we disable the form control.
   */
  @Input() set unitKey(value: string) {
    if (value) {
      this.itemService.getForm().get('unit.uid').setValue(value);
      this.form?.get('unit')?.disable();
    }
  }

  form: FormGroup = this.itemService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  constructor(
    protected itemService: OrganizationItemService<CostCenter>,
    protected unitService: OrgUnitService,
    protected currencyService: CurrencyService
  ) {}
}
