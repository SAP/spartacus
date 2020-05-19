import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  Budget,
  Currency,
  CurrencyService,
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/core';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';

@Component({
  selector: 'cx-budget-form',
  templateUrl: './budget-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetFormComponent extends AbstractFormComponent
  implements OnInit {
  businessUnits$: Observable<B2BUnitNode[]>;
  currencies$: Observable<Currency[]>;

  @Input()
  budgetData: Budget;

  form: FormGroup = this.fb.group({
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
    timezoneOffset: [this.getLocalTimezoneOffset(), Validators.required],
  });

  constructor(
    protected fb: FormBuilder,
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {
    super();
  }

  ngOnInit() {
    this.currencies$ = this.currencyService.getAll();
    this.orgUnitService.loadOrgUnitNodes();
    this.businessUnits$ = this.orgUnitService.getList();
    if (this.budgetData && Object.keys(this.budgetData).length !== 0) {
      const localOffset = this.getLocalTimezoneOffset(true);

      this.form.patchValue({
        ...this.budgetData,
        startDate: new Date(
          this.budgetData.startDate.replace('+0000', localOffset)
        )
          .toISOString()
          .replace('.', '+')
          .replace('Z', '0'),
        endDate: new Date(this.budgetData.endDate.replace('+0000', localOffset))
          .toISOString()
          .replace('.', '+')
          .replace('Z', '0'),
      });
    }
  }

  getLocalTimezoneOffset(invert?: boolean): string {
    const offset = new Date().getTimezoneOffset() * -1;
    const hours = this.padWithZeroes(Math.floor(offset / 60).toString(), 2);
    const minutes = this.padWithZeroes((offset % 60).toString(), 2);
    return offset >= 0
      ? !invert
        ? `+${hours}:${minutes}`
        : `-${hours}:${minutes}`
      : !invert
      ? `-${hours}:${minutes}`
      : `+${hours}:${minutes}`;
  }

  patchDateWithOffset(control: AbstractControl, offset: number) {
    const dateWithOffset = control.value.replace('+0000', offset);
    control.patchValue(dateWithOffset);
  }

  padWithZeroes(str: string, max: number) {
    str = str.toString();
    return str.length < max ? this.padWithZeroes('0' + str, max) : str;
  }
}
