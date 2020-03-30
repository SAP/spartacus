import { Component } from '@angular/core';
import { RoutingService, OrgUnitUserGroupService } from '@spartacus/core';

@Component({
  selector: 'cx-user-group-create',
  templateUrl: './user-group-create.component.html',
})
export class UserGroupCreateComponent {
  constructor(
    protected userGroupService: OrgUnitUserGroupService,
    protected routingService: RoutingService
  ) {}

  createUserGroup(userGroup) {
    this.userGroupService.create(userGroup);
    this.routingService.go({
      cxRoute: 'userGroupDetails',
      params: userGroup,
    });
  }
}
