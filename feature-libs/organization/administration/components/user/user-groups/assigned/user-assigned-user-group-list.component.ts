import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { UserAssignedUserGroupListService } from './user-assigned-user-group-list.service';

@Component({
  selector: 'cx-user-assigned-user-group-list',
  templateUrl: './user-assigned-user-group-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserAssignedUserGroupListService,
    },
  ],
})
export class UserAssignedUserGroupListComponent {}
