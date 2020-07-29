import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserGroup, UserGroupService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CurrentUserGroupService } from '../current-user-group.service';

@Component({
  selector: 'cx-user-group-details',
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupDetailsComponent {
  /**
   * The code of the current user group
   */
  code$: Observable<string> = this.currentUserGroupService.code$.pipe(
    filter((code) => Boolean(code))
  );

  userGroup$: Observable<UserGroup> = this.code$.pipe(
    // TODO: we should do this in the facade
    tap((code) => this.userGroupService.load(code)),
    switchMap((code) => this.userGroupService.get(code)),
    filter((userGroups) => Boolean(userGroups))
  );

  constructor(
    protected route: ActivatedRoute,
    protected userGroupService: UserGroupService,
    protected currentUserGroupService: CurrentUserGroupService
  ) {}

  update(userGroup: UserGroup) {
    this.userGroupService.update(userGroup.uid, userGroup);
  }
}
