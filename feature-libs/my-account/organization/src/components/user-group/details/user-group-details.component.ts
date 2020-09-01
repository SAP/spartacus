import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { UserGroup } from '../../../core/model/user-group.model';
import { UserGroupService } from '../../../core/services/user-group.service';
import { CurrentUserGroupService } from '../current-user-group.service';

@Component({
  selector: 'cx-user-group-details',
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentUserGroupService],
})
export class UserGroupDetailsComponent {
  userGroup$: Observable<UserGroup> = this.currentUserGroupService.key$.pipe(
    // TODO: we should do this in the facade
    tap((code) => this.userGroupService.load(code)),
    switchMap((code) => this.userGroupService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
  );

  constructor(
    protected userGroupService: UserGroupService,
    protected currentUserGroupService: CurrentUserGroupService
  ) {}

  update(userGroup: UserGroup) {
    this.userGroupService.update(userGroup.uid, userGroup);
  }
}
