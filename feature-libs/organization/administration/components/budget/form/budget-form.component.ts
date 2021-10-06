import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Currency, CurrencyService } from '@spartacus/core';
import {
  B2BUnitNode,
  Budget,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CurrentItemService } from '../../shared/current-item.service';
import { ItemService } from '../../shared/item.service';
import { BudgetItemService } from '../services/budget-item.service';
import { CurrentBudgetService } from '../services/current-budget.service';
import { createCodeForEntityName } from '../../shared/utility/entity-code';

@Component({
  selector: 'cx-org-budget-form',
  templateUrl: './budget-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: BudgetItemService,
    },
    {
      provide: CurrentItemService,
      useExisting: CurrentBudgetService,
    },
  ],
})
export class BudgetFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList().pipe(
    tap((units) => {
      if (units.length === 1) {
        this.form?.get('orgUnit.uid')?.setValue(units[0]?.id);
      }
    })
  );

  currencies$: Observable<Currency[]> = this.currencyService.getAll().pipe(
    tap((currency) => {
      if (currency.length === 1) {
        this.form?.get('currency.isocode')?.setValue(currency[0]?.isocode);
      }
    })
  );

  constructor(
    protected itemService: ItemService<Budget>,
    protected unitService: OrgUnitService,
    protected currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }

  createCodeWithName(name: AbstractControl, code: AbstractControl): void {
    createCodeForEntityName(name, code);
  }
}
