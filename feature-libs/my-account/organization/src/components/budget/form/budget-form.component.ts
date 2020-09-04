import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUnitNode, Currency, CurrencyService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget } from '../../../core';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { OrganizationFormService } from '../../shared/organization-edit/organization-form.service';
import { BudgetFormService } from './budget-form.service';

@Component({
  selector: 'cx-budget-form',
  templateUrl: './budget-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationFormService,
      useExisting: BudgetFormService,
    },
  ],
})
export class BudgetFormComponent implements OnInit {
  form: FormGroup = this.budgetFormService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  constructor(
    protected budgetFormService: OrganizationFormService<Budget>,
    protected unitService: OrgUnitService,
    protected currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }
}
