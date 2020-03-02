import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
  B2BUnitNode,
  Currency,
  CurrencyService,
  EntitiesModel,
  OrderApprovalPermissionType,
  OrgUnitService,
  Period,
  Permission,
  PermissionService,
} from '@spartacus/core';

import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';

@Component({
  selector: 'cx-permission-form',
  templateUrl: './permission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionFormComponent extends AbstractFormComponent
  implements OnInit {
  periodRange = Object.keys(Period);
  businessUnits$: Observable<B2BUnitNode[]>;
  currencies$: Observable<Currency[]>;
  permissionTypes$: Observable<OrderApprovalPermissionType[]>;

  @Input()
  permissionData: Permission;

  form: FormGroup = this.fb.group({
    code: ['', Validators.required],
    orderApprovalPermissionType: this.fb.group({
      code: [null, Validators.required],
    }),
    periodRange: ['', Validators.required],
    orgUnit: this.fb.group({
      uid: [null, Validators.required],
    }),
    currency: this.fb.group({
      isocode: [null, Validators.required],
    }),
    threshold: ['', Validators.required],
  });

  typeControl = this.form.get('orderApprovalPermissionType');
  periodControl = this.form.get('periodRange');
  currencyControl = this.form.get('currency');
  thresholdControl = this.form.get('threshold');

  constructor(
    protected fb: FormBuilder,
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService,
    protected permissionService: PermissionService
  ) {
    super();
  }

  ngOnInit() {
    this.permissionTypes$ = this.permissionService.getTypes();
    this.currencies$ = this.currencyService.getAll();
    this.businessUnits$ = this.orgUnitService.getList().pipe(
      filter(Boolean),
      map((list: EntitiesModel<B2BUnitNode>) => list.values)
    );
    if (this.permissionData && Object.keys(this.permissionData).length !== 0) {
      this.form.patchValue(this.permissionData);
      this.typeSelected(this.permissionData.orderApprovalPermissionType);
      this.typeControl.disable();
    }
  }

  typeSelected(typeSelected: OrderApprovalPermissionType): void {
    switch (typeSelected.code) {
      case 'B2BBudgetExceededPermission': {
        this.periodControl.disable();
        this.currencyControl.disable();
        this.thresholdControl.disable();
        this.periodControl.reset();
        this.currencyControl.reset();
        this.thresholdControl.reset();
        break;
      }
      case 'B2BOrderThresholdTimespanPermission': {
        this.periodControl.enable();
        this.currencyControl.enable();
        this.thresholdControl.enable();
        break;
      }
      case 'B2BOrderThresholdPermission': {
        this.periodControl.disable();
        this.periodControl.reset();
        this.currencyControl.enable();
        this.thresholdControl.enable();
      }
    }
  }
}
