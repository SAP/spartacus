import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserGroup, UserGroupService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-user-group-details',
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupDetailsComponent {
  protected code$: Observable<string> = this.route.params.pipe(
    map((params) => params['code']),
    filter((code) => Boolean(code))
  );

  userGroup$: Observable<UserGroup> = this.code$.pipe(
    // TODO: we should do this in the facade
    tap((code) => this.userGroupsService.load(code)),
    switchMap((code) => this.userGroupsService.get(code)),
    filter((userGroups) => Boolean(userGroups))
  );

  constructor(
    protected route: ActivatedRoute,
    protected userGroupsService: UserGroupService
  ) {}

  update(userGroup: UserGroup) {
    this.userGroupsService.update(userGroup.uid, userGroup);
  }
}
