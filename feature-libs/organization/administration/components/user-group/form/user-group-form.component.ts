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

@Component({
  selector: 'cx-org-user-group-form',
  templateUrl: './user-group-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UserGroupItemService,
    },
  ],
})
export class UserGroupFormComponent implements OnInit {
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
