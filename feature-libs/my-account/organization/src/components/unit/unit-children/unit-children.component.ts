import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UnitChildrenService } from './unit-children.service';

@Component({
  selector: 'cx-unit-children',
  templateUrl: './unit-children.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitChildrenComponent {
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
