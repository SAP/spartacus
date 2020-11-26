import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../shared/list/list.service';
import { UserUserGroupListService } from './user-user-group-list.service';

@Component({
  selector: 'cx-org-user-user-group-list',
  templateUrl: './user-user-group-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UserUserGroupListService,
    },
  ],
})
export class UserUserGroupListComponent {}
