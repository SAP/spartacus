import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitTreeService } from '../services/unit-tree.service';

@Component({
  selector: 'cx-org-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  constructor(protected unitTreeService: UnitTreeService) {}

  expandAll() {
    this.unitTreeService.expandAll();
  }

  collapseAll() {
    this.unitTreeService.collapseAll();
  }
}
