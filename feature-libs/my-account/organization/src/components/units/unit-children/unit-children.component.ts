import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { B2BUnitNode, OrgUnitService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-unit-children',
  templateUrl: './unit-children.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitChildrenComponent implements OnInit {
  data$: Observable<B2BUnitNode[]>;
  code$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.data$ = this.code$.pipe(
      tap(() => this.orgUnitsService.loadTree()),
      switchMap((code) => this.orgUnitsService.getChildUnits(code)),
      map((children: B2BUnitNode[]) =>
        children.map((child) => ({ ...child, uid: child.id }))
      )
    );
  }
}
