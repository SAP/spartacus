import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-permission-create',
  templateUrl: './permission-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionCreateComponent {
  constructor() {}
}
