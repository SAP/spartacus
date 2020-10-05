import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { UnitListService } from '../services/unit-list.service';
import { UnitTreeService } from '../services/unit-tree.service';

@Component({
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  root$ = this.unitListService
    .getData()
    .pipe(map((list) => list.values?.[0].id));

  constructor(
    protected unitListService: UnitListService,
    protected unitTreeService: UnitTreeService
  ) {}

  expandAll(unitId: string) {
    this.unitTreeService.expandAll(unitId);
  }

  collapseAll(unitId: string) {
    this.unitTreeService.collapseAll(unitId);
  }
}
