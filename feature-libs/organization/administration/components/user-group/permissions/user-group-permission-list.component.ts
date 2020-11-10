import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { UserGroupPermissionListService } from './user-group-permission-list.service';

@Component({
  selector: 'cx-user-group-permission-list',
  templateUrl: './user-group-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserGroupPermissionListService,
    },
  ],
})
export class UserGroupPermissionListComponent {}
