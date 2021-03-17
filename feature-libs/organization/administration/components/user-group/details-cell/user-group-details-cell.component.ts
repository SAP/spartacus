import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-user-group-details-cell',
  templateUrl: './user-group-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupDetailsCellComponent extends CellComponent {}
