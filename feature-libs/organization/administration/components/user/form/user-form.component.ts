import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { B2BUser, B2BUserGroup, Title, UserService } from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUserService,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { ActiveUserGuard } from '../guards/active-user.guard';
import { UserItemService } from '../services/user-item.service';

@Component({
  selector: 'cx-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationItemService,
      useExisting: UserItemService,
    },
    ActiveUserGuard,
  ],
})
export class UserFormComponent implements OnInit, AfterViewInit {
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

  availableRoles: B2BUserGroup[] = this.b2bUserService.getAllRoles();

  constructor(
    protected itemService: OrganizationItemService<B2BUser>,
    protected unitService: OrgUnitService,
    protected userService: UserService,
    protected b2bUserService: B2BUserService,
    protected activeUserGuard: ActiveUserGuard
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }

  ngAfterViewInit(): void {
    this.activeUserGuard.canActivate().subscribe();
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
