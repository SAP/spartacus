import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from '../../shared';

@Component({
  selector: 'cx-org-permission-details-cell',
  templateUrl: './permission-details-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionDetailsCellComponent extends CellComponent {}
