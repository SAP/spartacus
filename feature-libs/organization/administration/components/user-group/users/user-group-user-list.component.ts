import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { filter, first, switchMap, take } from 'rxjs/operators';
import {
  LoadStatus,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { ListService } from '../../shared/list/list.service';
import { CurrentUserGroupService } from '../services/current-user-group.service';
import { UserGroupUserListService } from './user-group-user-list.service';
import { MessageService } from '../../shared/message/services/message.service';
import { SubListComponent } from '../../shared/sub-list/sub-list.component';

@Component({
  selector: 'cx-org-user-group-user-list',
  templateUrl: './user-group-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: UserGroupUserListService,
    },
  ],
})
export class UserGroupUserListComponent {
  /**
   * @deprecated since version 3.2
   * Use constructor(protected currentUserGroupService: CurrentUserGroupService, protected userGroupUserListService: UserGroupUserListService) {} instead
   */
  // TODO(#11530): Remove deprecated constructors
  constructor(
    currentUserGroupService: CurrentUserGroupService,
    userGroupUserListService: UserGroupUserListService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    messageService: MessageService
  );

  constructor(
    currentUserGroupService: CurrentUserGroupService,
    userGroupUserListService: UserGroupUserListService
  );

  constructor(
    protected currentUserGroupService: CurrentUserGroupService,
    protected userGroupUserListService: UserGroupUserListService,
    protected messageService?: MessageService
  ) {}

  @ViewChild('subList')
  subList: SubListComponent;

  unassignAll() {
    this.currentUserGroupService.key$
      .pipe(
        first(),
        switchMap((key) =>
          this.userGroupUserListService.unassignAllMembers(key).pipe(
            take(1),
            filter((data) => data.status === LoadStatus.SUCCESS)
          )
        )
      )
      .subscribe((data) => {
        this.notify(data.item);
      });
  }

  protected notify(item: UserGroup) {
    // TODO(#11530): Remove deprecated condition
    if (this.subList) {
      this.subList.messageService.add({
        message: {
          key: `orgUserGroupUsers.unassignAllConfirmation`,
          params: {
            item,
          },
        },
      });
    } else {
      this.messageService?.add({
        message: {
          key: `orgUserGroupUsers.unassignAllConfirmation`,
          params: {
            item,
          },
        },
      });
    }
  }
}
