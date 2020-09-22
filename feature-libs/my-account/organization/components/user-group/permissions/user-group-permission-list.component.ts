import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { UserGroupPermissionListService } from './user-group-permission-list.service';

@Component({
  templateUrl: './user-group-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserGroupPermissionListService,
    },
  ],
})
export class UserGroupPermissionListComponent {}
