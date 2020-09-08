import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  B2BUnitNode,
  CostCenter,
  Currency,
  CurrencyService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrgUnitService } from '../../../core/services/org-unit.service';
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
export class CostCenterFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  constructor(
    protected itemService: OrganizationItemService<CostCenter>,
    protected unitService: OrgUnitService,
    protected currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }
}
