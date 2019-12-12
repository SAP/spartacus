import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
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
  B2BUnitNodeList,
  OrgUnitService,
} from '@spartacus/core';

@Component({
  selector: 'cx-budget-form',
  templateUrl: './budget-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetFormComponent implements OnInit, OnDestroy {
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

  budget: FormGroup = this.fb.group({
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
      map((list: B2BUnitNodeList) => list.unitNodes)
    );
    console.log(this.budgetData);
    if (this.budgetData && Object.keys(this.budgetData).length !== 0) {
      this.budget.patchValue(this.budgetData);
      //
      // this.countrySelected(this.addressData.country);
      // if (this.addressData.region) {
      //   this.regionSelected(this.addressData.region);
      // }
    }
  }

  currencySelected(currency: Currency): void {
    console.log(currency);
    this.budget['controls'].currency['controls'].isocode.setValue(
      currency.isocode
    );
  }

  businessUnitSelected(orgUnit: B2BUnitNode): void {
    this.budget['controls'].orgUnit['controls'].uid.setValue(orgUnit.id);
  }

  startDateChange(event) {
    console.log(event.target.value);
  }

  endDateChange(event) {
    console.log(event.target.value);
  }

  back(): void {
    this.clickBack.emit();
  }

  verifyBudget(): void {
    console.log(this.budget)
    if (!this.budget.dirty) {
      this.submitBudget.emit(this.budget);
    }
  }

  ngOnDestroy() {
    // this.checkoutDeliveryService.clearAddressVerificationResults();
    //
    // if (this.addressVerifySub) {
    //   this.addressVerifySub.unsubscribe();
    // }
    //
    // if (this.regionsSub) {
    //   this.regionsSub.unsubscribe();
    // }
  }
}
