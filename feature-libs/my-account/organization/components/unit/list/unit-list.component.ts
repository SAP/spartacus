import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitListService } from '../services/unit-list.service';

@Component({
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  constructor(protected unitListService: UnitListService) {}

  expandAll() {
    this.unitListService.expandAll();
  }

  collapseAll() {
    this.unitListService.collapseAll();
  }
}
