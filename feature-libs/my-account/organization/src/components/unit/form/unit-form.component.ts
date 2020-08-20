import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import {
  B2BUnitNode,
  CurrencyService,
  B2BApprovalProcess,
} from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { CurrentUnitService } from '../current-unit.service';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';

@Component({
  selector: 'cx-unit-form',
  templateUrl: './unit-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitFormComponent extends AbstractFormComponent
  implements OnInit, OnDestroy {
  @Input() form: FormGroup;

  businessUnits$: Observable<B2BUnitNode[]>;
  approvalProcesses$: Observable<B2BApprovalProcess[]>;

  subscription = new Subscription();
  parentUnit$ = this.currentUnitService.parentUnit$.pipe(filter(Boolean));

  constructor(
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService,
    protected currentUnitService: CurrentUnitService
  ) {
    super();
  }

  ngOnInit() {
    this.approvalProcesses$ = this.orgUnitService.getApprovalProcesses();
    this.orgUnitService.loadList();

    // filter out currently edited entity from list of possible parent units to assign
    this.businessUnits$ = this.orgUnitService
      .getActiveUnitList()
      .pipe(
        map((units) => units.filter((unit) => unit.id !== this.form?.value.uid))
      );

    this.subscription.add(
      this.parentUnit$.subscribe(() => {
        this.form.get('parentOrgUnit').disable();
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
