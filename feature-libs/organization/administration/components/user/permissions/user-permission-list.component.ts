import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { UserPermissionListService } from './user-permission-list.service';

@Component({
  selector: 'cx-user-permission-list',
  templateUrl: './user-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserPermissionListService,
    },
  ],
})
export class UserPermissionListComponent {}
