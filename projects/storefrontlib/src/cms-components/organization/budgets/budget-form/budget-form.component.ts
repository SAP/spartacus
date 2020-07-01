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
    this.businessUnits$ = this.orgUnitService.getActiveUnitList();
    if (this.budgetData && Object.keys(this.budgetData).length !== 0) {
      const localOffset = this.getLocalTimezoneOffset(true);
      const startDate = new Date(
        this.formatDateStringWithTimezone(
          this.budgetData.startDate,
          localOffset
        )
      );
      const endDate = new Date(
        this.formatDateStringWithTimezone(this.budgetData.endDate, localOffset)
      );
      this.form.patchValue({
        ...this.budgetData,
        startDate: startDate.toISOString().substring(0, 16),
        endDate: endDate.toISOString().substring(0, 16),
      });
    }
  }

  getLocalTimezoneOffset(invert?: boolean): string {
    const offset = new Date().getTimezoneOffset() * -1;
    const hours = this.padWithZeroes(
      Math.abs(Math.floor(offset / 60)).toString(),
      2
    );
    const minutes = this.padWithZeroes((offset % 60).toString(), 2);
    return offset >= 0
      ? !invert
        ? `+${hours}:${minutes}`
        : `-${hours}:${minutes}`
      : !invert
      ? `-${hours}:${minutes}`
      : `+${hours}:${minutes}`;
  }

  patchDateControlWithOffset(control: AbstractControl, offset: string): void {
    const value = control.value;
    // const dateWithOffset =
    //   value.indexOf('+') > -1
    //     ? value.split('+')[0] + offset //.replace('+', '-')
    //     : value.split('-')[0] + offset; //.replace('-', '+');
    // new Date().toUTCString()
    console.log(value, `${control.value}:00${offset}`);
    control.patchValue(`${control.value}:00${offset}`);
  }

  protected formatDateStringWithTimezone(dateString: string, offset: string) {
    return new Date(dateString.replace('+0000', offset))
      .toISOString()
      .replace('.', '+')
      .replace('Z', '0');
  }

  protected padWithZeroes(str: string, max: number) {
    str = str.toString();
    return str.length < max ? this.padWithZeroes('0' + str, max) : str;
  }
}
