import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Table } from '@spartacus/storefront';
import { UnitCostCentersService } from './unit-cost-centers.service';
import { CurrentUnitService } from '../current-unit.service';
import { OrgUnitService } from '../../../core/services/org-unit.service';

@Component({
  selector: 'cx-unit-cost-centers',
  templateUrl: './unit-cost-centers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCostCentersComponent {
  code$ = this.currentUnitService.code$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitCostCentersService.getTable(code))
  );

  constructor(
    protected orgUnitsService: OrgUnitService,
    protected unitCostCentersService: UnitCostCentersService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
