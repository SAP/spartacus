import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
  Budget,
  Currency,
  CurrencyService,
  UrlCommandRoute,
  B2BUnitNode,
  OrgUnitService,
  EntitiesModel,
} from '@spartacus/core';

@Component({
  selector: 'cx-budget-form',
  templateUrl: './budget-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetFormComponent implements OnInit {
  businessUnits$: Observable<B2BUnitNode[]>;
  currencies$: Observable<Currency[]>;

  @Input()
  budgetData: Budget;

  @Input()
  actionBtnLabel: string;

  @Input()
  cancelBtnLabel: string;

  @Input()
  showCancelBtn = true;

  @Input()
  routerBackLink: UrlCommandRoute = {
    cxRoute: 'budgets',
  };

  @Output()
  submitBudget = new EventEmitter<any>();

  @Output()
  clickBack = new EventEmitter<any>();

  form: FormGroup = this.fb.group({
    code: [''],
    name: [''],
    orgUnit: this.fb.group({
      uid: [null, Validators.required],
    }),
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    currency: this.fb.group({
      isocode: [null, Validators.required],
    }),
    budget: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {}

  ngOnInit() {
    this.currencies$ = this.currencyService.getAll();
    this.businessUnits$ = this.orgUnitService.getList().pipe(
      filter(Boolean),
      map((list: EntitiesModel<B2BUnitNode>) => list.values)
    );
    if (this.budgetData && Object.keys(this.budgetData).length !== 0) {
      this.form.patchValue(this.budgetData);
    }
  }

  currencySelected(currency: Currency): void {
    this.form.controls.currency['controls'].isocode.setValue(currency.isocode);
  }

  businessUnitSelected(orgUnit: B2BUnitNode): void {
    this.form.controls.orgUnit['controls'].uid.setValue(orgUnit.id);
  }

  back(): void {
    this.clickBack.emit();
  }

  verifyBudget(): void {
    if (!this.form.invalid) {
      this.submitBudget.emit(this.form.value);
    }
  }
}
