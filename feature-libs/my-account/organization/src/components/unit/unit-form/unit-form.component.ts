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
  OrgUnitService,
  B2BApprovalProcess,
  RoutingService,
} from '@spartacus/core';
import { AbstractFormComponent } from '@spartacus/storefront';
import { filter, map } from 'rxjs/operators';

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
  parentUnitQueryParam$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.queryParams?.['parentUnit']),
    filter(Boolean)
  );

  constructor(
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService,
    protected routingService: RoutingService
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
      this.parentUnitQueryParam$.subscribe(() => {
        this.form.get('parentOrgUnit').disable();
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
