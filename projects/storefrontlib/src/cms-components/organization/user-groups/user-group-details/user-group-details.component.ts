import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { RoutingService, UserGroup, UserGroupService } from '@spartacus/core';

@Component({
  selector: 'cx-user-group-details',
  templateUrl: './user-group-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupDetailsComponent implements OnInit {
  userGroup$: Observable<UserGroup>;
  userGroupCode$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected userGroupsService: UserGroupService
  ) {}

  ngOnInit(): void {
    this.userGroup$ = this.userGroupCode$.pipe(
      tap((code) => this.userGroupsService.loadUserGroup(code)),
      switchMap((code) => this.userGroupsService.get(code)),
      filter(Boolean),
      map((userGroup: UserGroup) => ({
        ...userGroup,
        code: userGroup.uid,
      }))
    );
  }
}
