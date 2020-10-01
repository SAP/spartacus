import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { B2BUser, Title, UserService } from '@spartacus/core';
import {
  B2BUnitNode,
  OrgUnitService,
  UserRole,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UserItemService } from '../services/user-item.service';

@Component({
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UserItemService,
    },
  ],
})
export class UserFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList();
  titles$: Observable<Title[]> = this.userService.getTitles();

  availableRoles = [
    UserRole.CUSTOMER,
    UserRole.MANAGER,
    UserRole.APPROVER,
    UserRole.ADMIN,
  ];

  constructor(
    protected itemService: OrganizationItemService<B2BUser>,
    protected unitService: OrgUnitService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }

  updateRoles(event: MouseEvent) {
    const { checked, value } = event.target as HTMLInputElement;
    if (checked) {
      this.roles.push(new FormControl(value));
    } else {
      this.roles.removeAt(this.roles.value.indexOf(value));
    }
  }

  get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  protected get isAssignedToApprovers(): FormControl {
    return this.form.get('isAssignedToApprovers') as FormControl;
  }
}
