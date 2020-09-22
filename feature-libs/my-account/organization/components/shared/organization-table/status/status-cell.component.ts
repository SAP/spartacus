import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  templateUrl: './status-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusCellComponent extends OrganizationCellComponent {
  get label() {
    return this.isActive ? 'organization.enabled' : 'organization.disabled';
  }

  get isActive(): boolean {
    return this.model.active;
  }
}
