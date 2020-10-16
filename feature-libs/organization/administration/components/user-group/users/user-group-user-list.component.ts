import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserGroupService } from '@spartacus/organization/administration/core';
import { first } from 'rxjs/operators';
import { OrganizationListService } from '../../shared/organization-list/organization-list.service';
import { CurrentUserGroupService } from '../services/current-user-group.service';
import { UserGroupUserListService } from './user-group-user-list.service';

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
    protected userGroupService: UserGroupService
  ) {}

  unassignAll() {
    this.currentUserGroupService.key$
      .pipe(first())
      .subscribe((code) => this.userGroupService.unassignAllMembers(code));
  }
}
