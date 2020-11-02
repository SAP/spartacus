import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { UserGroupAssignedPermissionsListService } from './user-group-assigned-permission-list.service';

@Component({
  selector: 'cx-user-group-assigned-permission-list',
  templateUrl: './user-group-assigned-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserGroupAssignedPermissionsListService,
    },
  ],
})
export class UserGroupAssignedPermissionListComponent {}
