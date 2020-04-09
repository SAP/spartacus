import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {
  B2BUnitNode,
  CurrencyService,
  OrgUnitService,
  B2BApprovalProcess,
} from '@spartacus/core';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';

@Component({
  selector: 'cx-unit-form',
  templateUrl: './unit-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitFormComponent extends AbstractFormComponent implements OnInit {
  businessUnits$: Observable<B2BUnitNode[]>;
  approvalProcesses$: Observable<B2BApprovalProcess[]>;

  @Input()
  orgUnitData: B2BUnitNode;

  form: FormGroup = this.fb.group({
    uid: ['', Validators.required],
    name: ['', Validators.required],
    parentOrgUnit: this.fb.group({
      uid: [null, Validators.required],
    }),
    approvalProcess: this.fb.group({
      code: [null],
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
    this.approvalProcesses$ = this.orgUnitService.getApprovalProcesses();
    this.businessUnits$ = this.orgUnitService.getList();
    if (this.orgUnitData && Object.keys(this.orgUnitData).length !== 0) {
      this.form.patchValue(this.orgUnitData);
    }
  }
}
