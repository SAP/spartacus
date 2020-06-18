import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-organization',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationOutletComponent {}
