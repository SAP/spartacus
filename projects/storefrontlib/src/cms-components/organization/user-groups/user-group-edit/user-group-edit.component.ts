import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  OrgUnitUserGroup,
  OrgUnitUserGroupService,
  RoutingService,
} from '@spartacus/core';

@Component({
  selector: 'cx-user-group-edit',
  templateUrl: './user-group-edit.component.html',
})
export class UserGroupEditComponent implements OnInit {
  userGroup$: Observable<OrgUnitUserGroup>;
  userGroupCode$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected userGroupsService: OrgUnitUserGroupService
  ) {}

  ngOnInit(): void {
    this.userGroup$ = this.userGroupCode$.pipe(
      tap(code => this.userGroupsService.loadOrgUnitUserGroup(code)),
      switchMap(code => this.userGroupsService.get(code))
    );
  }

  updateUserGroup(userGroup: OrgUnitUserGroup) {
    this.userGroupCode$
      .pipe(take(1))
      .subscribe(userGroupCode =>
        this.userGroupsService.update(userGroupCode, userGroup)
      );
    this.routingService.go({
      cxRoute: 'userGroupDetails',
      params: { code: userGroup.uid },
    });
  }
}
