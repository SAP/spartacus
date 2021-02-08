import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../shared/list/list.service';
import { UserGroupAssignedPermissionsListService } from './user-group-assigned-permission-list.service';

@Component({
  selector: 'cx-org-user-group-assigned-permission-list',
  templateUrl: './user-group-assigned-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UserGroupAssignedPermissionsListService,
    },
  ],
})
export class UserGroupAssignedPermissionListComponent {}
