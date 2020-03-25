import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {
  CostCenter,
  Currency,
  CurrencyService,
  B2BUnitNode,
  OrgUnitService,
} from '@spartacus/core';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';

@Component({
  selector: 'cx-cost-center-form',
  templateUrl: './cost-center-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterFormComponent extends AbstractFormComponent
  implements OnInit {
  businessUnits$: Observable<B2BUnitNode[]>;
  currencies$: Observable<Currency[]>;

  @Input()
  costCenterData: CostCenter;

  form: FormGroup = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    unit: this.fb.group({
      uid: [null, Validators.required],
    }),
    currency: this.fb.group({
      isocode: [null, Validators.required],
    }),
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
    this.businessUnits$ = this.orgUnitService.getList();
    if (this.costCenterData && Object.keys(this.costCenterData).length !== 0) {
      this.form.patchValue(this.costCenterData);
    }
  }
}
