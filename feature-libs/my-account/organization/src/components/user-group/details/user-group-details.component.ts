import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserGroup, UserGroupService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { CurrentUserGroupService } from '../current-user-group.service';

@Component({
  selector: 'cx-user-group-details',
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupDetailsComponent {
  userGroup$: Observable<UserGroup> = this.currentUserGroupService.code$.pipe(
    tap((code) => this.userGroupService.load(code)),
    switchMap(() => this.currentUserGroupService.model$),
    // we have side effects here, we want the to run only once
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    protected userGroupService: UserGroupService,
    protected currentUserGroupService: CurrentUserGroupService
  ) {}

  update(userGroup: UserGroup) {
    this.userGroupService.update(userGroup.uid, userGroup);
  }
}
