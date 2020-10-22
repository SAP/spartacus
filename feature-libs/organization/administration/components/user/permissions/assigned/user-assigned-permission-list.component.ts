import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { UserAssignedPermissionListService } from './user-assigned-permission-list.service';

@Component({
  templateUrl: './user-assigned-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserAssignedPermissionListService,
    },
  ],
})
export class UserAssignedPermissionListComponent {}
