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
import { Budget, Currency, CurrencyService, OrgUnit, UrlCommandRoute } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-budget-form',
  templateUrl: './budget-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetFormComponent implements OnInit, OnDestroy {
  businessUnits$: Observable<OrgUnit[]>;
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

  budgetVerifySub: Subscription;

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

  constructor(private fb: FormBuilder, protected currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencies$ = this.currencyService.getAll();
    // this.orgUnits = this.currencyService.getAll();
  }

  currencySelected(currency: Currency): void {
    this.budget['controls'].titleCode.setValue(currency.isocode);
  }

  businessUnitSelected(orgUnit: OrgUnit): void {
    this.budget['controls'].businessUnits['controls'].isocode.setValue(
      orgUnit.uid
    );
    // this.businessUnits$.next(orgUnit.uid);
  }

  back(): void {
    this.clickBack.emit();
  }

  verifyBudget(): void {
    //budgetVerifySub
    // if (this.address.controls['region'].value.isocode) {
    //   this.regionsSub = this.regions$.pipe(take(1)).subscribe(regions => {
    //     const obj = regions.find(
    //       region =>
    //         region.isocode === this.address.controls['region'].value.isocode
    //     );
    //     Object.assign(this.address.value.region, {
    //       isocodeShort: obj.isocodeShort,
    //     });
    //   });
    // }
    //
    // if (this.address.dirty) {
    //   this.checkoutDeliveryService.verifyAddress(this.address.value);
    // } else {
    //   // address form value not changed
    //   // ignore duplicate address
    //   this.submitBudget.emit(undefined);
    // }
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
