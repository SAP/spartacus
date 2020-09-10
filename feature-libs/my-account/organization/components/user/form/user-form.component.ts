import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { B2BUnitNode, B2BUser, UserService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared';
import { UserItemService } from '../services/user-item.service';

const ROLES = [
  'b2bcustomergroup',
  'b2bmanagergroup',
  'b2bapprovergroup',
  'b2badmingroup',
];

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
  titles$ = this.userService.getTitles();

  availableRoles = ROLES;

  constructor(
    protected itemService: OrganizationItemService<B2BUser>,
    protected unitService: OrgUnitService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }

  get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  onRoleChange(event) {
    const { value, checked } = event.target;
    const approver = value === 'b2bapprovergroup';
    if (checked) {
      this.roles.push(new FormControl(value));
      if (approver) {
        this.isAssignedToApprovers.setValue(true);
      }
      return;
    } else {
      this.roles.controls.forEach((ctrl: FormControl, index) => {
        if (ctrl.value === event.target.value) {
          this.roles.removeAt(index);
          if (approver) {
            this.isAssignedToApprovers.setValue(false);
          }
          return;
        }
      });
    }
  }

  protected get isAssignedToApprovers(): FormControl {
    return this.form.get('isAssignedToApprovers') as FormControl;
  }
}
