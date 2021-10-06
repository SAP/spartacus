import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../shared/list/list.service';
import { UserGroupPermissionListService } from './user-group-permission-list.service';

@Component({
  selector: 'cx-org-user-group-permission-list',
  templateUrl: './user-group-permission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UserGroupPermissionListService,
    },
  ],
})
export class UserGroupPermissionListComponent {}
