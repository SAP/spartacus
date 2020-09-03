import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUnitNode, Currency, CurrencyService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { BudgetFormService } from './budget-form.service';

@Component({
  selector: 'cx-budget-form',
  templateUrl: './budget-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetFormComponent implements OnInit {
  form: FormGroup = this.budgetFormService.getForm();

  units$: Observable<B2BUnitNode[]> = this.orgUnitService.getActiveUnitList();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();

  constructor(
    protected budgetFormService: BudgetFormService,
    protected orgUnitService: OrgUnitService,
    protected currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.orgUnitService.loadList();
  }
}
