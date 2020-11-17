import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  selector: 'cx-org-unit-cell',
  templateUrl: '../organization-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCellComponent extends OrganizationCellComponent {
  get property() {
    return this.model.unit?.name ?? this.model.orgUnit?.name;
  }
}
