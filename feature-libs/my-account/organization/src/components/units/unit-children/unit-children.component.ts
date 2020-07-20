import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Table } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { UnitChildrenService } from './unit-children.service';

@Component({
  selector: 'cx-unit-children',
  templateUrl: './unit-children.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitChildrenComponent {
  // data$: Observable<B2BUnitNode[]>;
  // code$: Observable<string> = this.routingService
  //   .getRouterState()
  //   .pipe(map((routingData) => routingData.state.params['code']));
  //
  // constructor(
  //   protected routingService: RoutingService,
  //   protected orgUnitsService: OrgUnitService
  // ) {}
  //
  // ngOnInit(): void {
  //   this.data$ = this.code$.pipe(
  //     tap(() => this.orgUnitsService.loadTree()),
  //     switchMap((code) => this.orgUnitsService.getChildUnits(code)),
  //     map((children: B2BUnitNode[]) =>
  //       children.map((child) => ({ ...child, uid: child.id }))
  //     )
  //   );
  // }

  cxRoute = 'orgUnitUsers';

  code$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitChildrenService.getTable(code))
  );

  constructor(
    protected route: ActivatedRoute,
    protected unitChildrenService: UnitChildrenService
  ) {}
}
