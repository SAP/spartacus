import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitListService } from '../services/unit-list.service';

@Component({
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  constructor(protected uls: UnitListService) {}

  expandAll() {
    this.uls.expandAll();
  }

  collapseAll() {
    this.uls.collapseAll();
  }
}
