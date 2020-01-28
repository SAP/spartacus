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
  Permission,
  Currency,
  CurrencyService,
  UrlCommandRoute,
  B2BUnitNode,
  OrgUnitService,
  EntitiesModel,
} from '@spartacus/core';
import { FormUtils } from '../../../../shared/utils/forms/form-utils';

@Component({
  selector: 'cx-permission-form',
  templateUrl: './permission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionFormComponent implements OnInit {
  businessUnits$: Observable<B2BUnitNode[]>;
  currencies$: Observable<Currency[]>;

  @Input()
  permissionData: Permission;

  @Input()
  actionBtnLabel: string;

  @Input()
  cancelBtnLabel: string;

  @Input()
  showCancelBtn = true;

  @Input()
  routerBackLink: UrlCommandRoute = {
    cxRoute: 'permissions',
  };

  @Output()
  submitPermission = new EventEmitter<any>();

  @Output()
  clickBack = new EventEmitter<any>();

  submitClicked = false;

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
    permission: ['', Validators.required],
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
    if (this.permissionData && Object.keys(this.permissionData).length !== 0) {
      this.form.patchValue(this.permissionData);
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

  verifyPermission(): void {
    this.submitClicked = true;
    if (!this.form.invalid) {
      this.submitPermission.emit(this.form.value);
    }
  }

  isNotValid(formControlName: string): boolean {
    return FormUtils.isNotValidField(
      this.form,
      formControlName,
      this.submitClicked
    );
  }
}
