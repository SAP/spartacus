import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, first, take } from 'rxjs/operators';
import {
  LoadStatus,
  OrganizationItemStatus,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { CurrentUserGroupService } from '../services/current-user-group.service';
import { UserGroupUserListService } from './user-group-user-list.service';
import { MessageService } from '../../shared/organization-message/services/message.service';

@Component({
  templateUrl: './user-group-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: UserGroupUserListService,
    },
  ],
})
export class UserGroupUserListComponent {
  constructor(
    protected currentUserGroupService: CurrentUserGroupService,
    protected userGroupUserListService: UserGroupUserListService,
    protected messageService: MessageService
  ) {}

  unassignAll() {
    this.currentUserGroupService.key$.pipe(first()).subscribe((key) =>
      this.userGroupUserListService
        .unassignAllMembers(key)
        .pipe(
          take(1),
          filter(
            (data: OrganizationItemStatus<UserGroup>) =>
              data.status === LoadStatus.SUCCESS
          )
        )
        .subscribe((data) => {
          this.notify(data.item);
        })
    );
  }

  protected notify(item: UserGroup) {
    if (item) {
      this.messageService.add({
        message: {
          key: `userGroupUsers.unassignAllConfirmation`,
          params: {
            item,
          },
        },
      });
    }
  }
}
