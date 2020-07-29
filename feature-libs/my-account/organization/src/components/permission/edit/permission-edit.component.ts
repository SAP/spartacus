import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-permission-edit',
  templateUrl: './permission-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionEditComponent {
  constructor() {}
}
