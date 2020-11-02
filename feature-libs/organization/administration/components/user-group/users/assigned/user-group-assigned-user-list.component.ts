import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { UserGroupAssignedUserListService } from './user-group-assigned-user-list.service';

@Component({
  selector: 'cx-user-group-assigned-user-list',
  templateUrl: './user-group-assigned-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserGroupAssignedUserListService,
    },
  ],
})
export class UserGroupAssignedUserListComponent {}
