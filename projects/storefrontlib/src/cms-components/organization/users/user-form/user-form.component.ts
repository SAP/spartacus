import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  B2BUser,
  B2BUnitNode,
  OrgUnitService,
  Title,
  UserService,
  B2BUserService,
} from '@spartacus/core';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';
import { sortTitles } from '../../../../shared/utils/forms/title-utils';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'cx-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BUserFormComponent extends AbstractFormComponent
  implements OnInit {
  businessUnits$: Observable<B2BUnitNode[]>;

  @Input()
  b2bUserData: B2BUser;
  titles$: Observable<Title[]>;
  roles: any[];
  form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected orgUnitService: OrgUnitService,
    protected userService: UserService,
    protected b2bUserService: B2BUserService
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      orgUnit: this.fb.group({
        uid: [null, Validators.required],
      }),
      roles: this.fb.array([]),
      titleCode: [''],
      isAssignedToApprovers: false,
    });

    this.roles = this.initRoles(this.b2bUserData);

    this.titles$ = this.userService.getTitles().pipe(
      tap((titles: Title[]) => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      }),
      map((titles) => {
        titles.sort(sortTitles);
        const noneTitle = { code: '', name: 'Title' };
        return [noneTitle, ...titles];
      })
    );

    this.businessUnits$ = this.orgUnitService.getList();
    if (this.b2bUserData && Object.keys(this.b2bUserData).length !== 0) {
      this.form.patchValue(this.b2bUserData);
    }
  }

  initRoles(b2bUser?: B2BUser) {
    const roles = this.b2bUserService.getB2BUserRoles();
    const rolesArray: FormArray = this.form.get('roles') as FormArray;

    if (!b2bUser) {
      return roles;
    } else {
      const newRoles = roles.map((r) => {
        if (b2bUser.roles.includes(r.id)) {
          rolesArray.push(new FormControl(r.id));
          return { name: r.name, id: r.id, selected: true };
        } else {
          return r;
        }
      });

      return newRoles;
    }
  }

  onRoleChange(event) {
    const rolesArray: FormArray = this.form.get('roles') as FormArray;
    if (event.target.checked) {
      rolesArray.push(new FormControl(event.target.value));
      return;
    } else {
      let i = 0;
      rolesArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          rolesArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  isApprover() {
    const roles = this.form.get('roles').value;

    if (roles.includes('b2bapprovergroup')) {
      this.form.get('isAssignedToApprovers').setValue(true);
      return true;
    } else {
      return false;
    }
  }
}
