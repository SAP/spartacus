import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import {
  B2BUnitNode,
  CurrencyService,
  OrgUnitService,
  B2BApprovalProcess,
} from '@spartacus/core';
import { AbstractFormComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-unit-form',
  templateUrl: './unit-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitFormComponent extends AbstractFormComponent implements OnInit {
  @Input() form: FormGroup;

  businessUnits$: Observable<B2BUnitNode[]>;
  approvalProcesses$: Observable<B2BApprovalProcess[]>;

  constructor(
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {
    super();
  }

  ngOnInit() {
    this.approvalProcesses$ = this.orgUnitService.getApprovalProcesses();
    this.orgUnitService.loadOrgUnitNodes();
    this.businessUnits$ = this.orgUnitService.getActiveUnitList();
  }
}
