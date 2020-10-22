import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  B2BUnitNode,
  OrgUnitService,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UserGroupItemService } from '../services/user-group-item.service';
import { ROUTE_PARAMS } from '../../constants';

@Component({
  templateUrl: './user-group-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UserGroupItemService,
    },
  ],
})
export class UserGroupFormComponent implements OnInit {
  userGroupRouteParam = ROUTE_PARAMS.userGroupCode;
  form: FormGroup = this.itemService.getForm();

  // getList ???
  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList();

  constructor(
    protected itemService: OrganizationItemService<UserGroup>,
    protected unitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }
}
