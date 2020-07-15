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
    // Doesn't need to be here. Was here when timezone was selectable
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
      // Patching dates with offsets:
      // When dates come from the backend, they are incorrectly formatted to display in a datetime-local input
      // They also do not display the correct datetime according do our locale, thus we are patching it with the local offset to correct it.
      // Can probably also move this logic to some converter or service so it arrives here simply as usable.
      const localOffset = this.getLocalTimezoneOffset(true);
      const startDate = this.formatDateStringWithTimezone(
        this.budgetData.startDate,
        localOffset
      );
      const endDate = this.formatDateStringWithTimezone(
        this.budgetData.endDate,
        localOffset
      );

      this.form.patchValue({
        ...this.budgetData,
        startDate: startDate,
        endDate: endDate,
      });
    }
  }

  // Invert boolean is used here to subtract/add an offset when we want to reverse an effect
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

  update(form: AbstractFormComponent) {
    // Can remove these patches if conversion done elsewhere
    this.patchDateControlWithOffset(
      this.form.controls.startDate,
      this.form.controls.timezoneOffset.value
    );
    this.patchDateControlWithOffset(
      this.form.controls.endDate,
      this.form.controls.timezoneOffset.value
    );
    /////

    // Move to template (submit)
    form.verifyAndSubmit();
  }

  // Move this to a converter (outgoing)
  protected patchDateControlWithOffset(
    control: AbstractControl,
    offset: string
  ): void {
    control.patchValue(`${control.value}:00${offset}`);
  }

  // Format this to a converter (incoming)
  protected formatDateStringWithTimezone(dateString: string, offset: string) {
    return new Date(
      new Date(dateString.replace('+0000', offset))
        .toISOString()
        .replace('.', '+')
        .replace('Z', '0')
    )
      .toISOString()
      .substring(0, 16);
  }

  // Helper function - add to prototypes?
  protected padWithZeroes(str: string, max: number) {
    str = str.toString();
    return str.length < max ? this.padWithZeroes('0' + str, max) : str;
  }
}
