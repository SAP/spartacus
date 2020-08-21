import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { CurrentUnitService } from '../current-unit.service';
import { UnitCostCentersService } from './unit-cost-centers.service';

@Component({
  selector: 'cx-unit-cost-centers',
  templateUrl: './unit-cost-centers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCostCentersComponent {
  code$ = this.currentUnitService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitCostCentersService.getTable(code))
  );

  constructor(
    protected orgUnitsService: OrgUnitService,
    protected unitCostCentersService: UnitCostCentersService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
