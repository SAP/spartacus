import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../shared/list/list.service';
import { UserAssignedPermissionListService } from './user-assigned-permission-list.service';

@Component({
  selector: 'cx-org-user-assigned-permission-list',
  templateUrl: './user-assigned-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UserAssignedPermissionListService,
    },
  ],
})
export class UserAssignedPermissionListComponent {}
