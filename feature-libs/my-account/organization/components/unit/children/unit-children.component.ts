import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentUnitService } from '../current-unit.service';
import { UnitChildrenService } from './unit-children.service';

@Component({
  selector: 'cx-unit-children',
  templateUrl: './unit-children.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitChildrenComponent {
  code$ = this.currentUnitService.key$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitChildrenService.getTable(code))
  );

  constructor(
    protected unitChildrenService: UnitChildrenService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
