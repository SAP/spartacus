import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Currency, CurrencyService } from '@spartacus/core';
import {
  B2BUnitNode,
  Budget,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ActiveBudgetGuard } from '../guards/active-budget.guard';
import { BudgetItemService } from '../services/budget-item.service';
import { CurrentBudgetService } from '../services/current-budget.service';

@Component({
  templateUrl: './budget-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: BudgetItemService,
    },
    {
      provide: CurrentOrganizationItemService,
      useExisting: CurrentBudgetService,
    },
  ],
})
export class BudgetFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  constructor(
    protected itemService: OrganizationItemService<Budget>,
    protected unitService: OrgUnitService,
    protected currencyService: CurrencyService,
    protected activeBudgetGuard: ActiveBudgetGuard
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }
}
