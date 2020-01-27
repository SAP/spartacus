import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  B2BUnitNode,
  B2BUnitNodeList,
  Budget,
  Currency,
  CurrencyService,
  OrgUnitService,
  UrlCommandRoute,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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

  form: FormGroup = this.fb.group(
    {
      code: ['', Validators.required],
      name: ['', Validators.required],
      orgUnit: this.fb.group({
        uid: [null, Validators.required],
      }),
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      currency: this.fb.group({
        isocode: [null, Validators.required],
      }),
      budget: ['', Validators.required],
    },
    { validator: this.checkDate }
  );

  constructor(
    private fb: FormBuilder,
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {}

  ngOnInit() {
    this.currencies$ = this.currencyService.getAll();
    this.businessUnits$ = this.orgUnitService.getList().pipe(
      filter(Boolean),
      map((list: B2BUnitNodeList) => list.unitNodes)
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

  // isDateValid(formControlName1: string, formControlName2: string): boolean {
  //   return (
  //     this.form.get(formControlName1).touched &&
  //     this.form.get(formControlName1).dirty &&
  //     this.form.get(formControlName2).touched &&
  //     this.form.get(formControlName2).dirty &&
  //     this.form.hasError('NotValidDate')
  //   );
  // }

  // private checkDate(ac: AbstractControl): ValidationErrors {
  //   if (ac.get('startDate').value > ac.get('endDate').value) {
  //     return { NotValidDate: true };
  //   }
  // }
}
