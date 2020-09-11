import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BApprovalProcess, B2BUnitNode } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';
import { CurrentUnitService } from '../current-unit.service';

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
  parentUnit$ = this.currentUnitService.b2bUnit$.pipe(filter(Boolean));

  constructor(
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
