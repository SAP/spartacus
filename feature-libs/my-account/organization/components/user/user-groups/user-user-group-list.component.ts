import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../shared';
import { UserUserGroupListService } from './user-user-group-list.service';

@Component({
  templateUrl: './user-user-group-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserUserGroupListService,
    },
  ],
})
export class UserUserGroupListComponent {}
