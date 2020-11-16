import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { B2BUser, B2BUserRole, Title, UserService } from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUserService,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { UserItemService } from '../services/user-item.service';

@Component({
  selector: 'cx-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UserItemService,
    },
  ],
})
export class UserFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  /**
   * Initialize the business unit for the user.
   *
   * If there's a unit provided, we disable the unit form control.
   */
  @Input() set unitKey(value: string) {
    if (value) {
      this.form?.get('orgUnit.uid').setValue(value);
      this.form?.get('orgUnit')?.disable();
    }
  }

  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList();
  titles$: Observable<Title[]> = this.userService.getTitles();

  availableRoles: B2BUserRole[] = this.b2bUserService.getAllRoles();

  constructor(
    protected itemService: OrganizationItemService<B2BUser>,
    protected unitService: OrgUnitService,
    protected userService: UserService,
    protected b2bUserService: B2BUserService
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

  get isAssignedToApprovers(): FormControl {
    return this.form.get('isAssignedToApprovers') as FormControl;
  }
}
