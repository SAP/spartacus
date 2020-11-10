import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  selector: 'cx-roles-cell',
  templateUrl: './roles-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesCellComponent extends OrganizationCellComponent {}
