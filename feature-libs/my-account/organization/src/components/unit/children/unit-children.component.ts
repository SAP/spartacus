import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UnitChildrenService } from './unit-children.service';
import { CurrentUnitService } from '../current-unit.service';

@Component({
  selector: 'cx-unit-children',
  templateUrl: './unit-children.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitChildrenComponent {
  code$ = this.currentUnitService.code$;

  dataTable$: Observable<Table> = this.code$.pipe(
    switchMap((code) => this.unitChildrenService.getTable(code))
  );

  constructor(
    protected unitChildrenService: UnitChildrenService,
    protected currentUnitService: CurrentUnitService
  ) {}
}
