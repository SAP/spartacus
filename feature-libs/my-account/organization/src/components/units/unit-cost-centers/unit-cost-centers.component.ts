import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Table } from '@spartacus/storefront';
import { OrgUnitService } from '@spartacus/core';
import { UnitCostCentersService } from './unit-cost-centers.service';

@Component({
  selector: 'cx-unit-cost-centers',
  templateUrl: './unit-cost-centers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCostCentersComponent {
  code$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitCostCentersService.getTable(code))
  );

  constructor(
    protected route: ActivatedRoute,
    protected orgUnitsService: OrgUnitService,
    protected unitCostCentersService: UnitCostCentersService
  ) {}
}
