import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { B2BUnitNode, OrgUnitService, UserService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sortTitles } from '@spartacus/storefront';
import { Title } from '@spartacus/core';

@Component({
  selector: 'cx-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  /**
   * The form is controlled from the container component.
   */
  @Input() form: FormGroup;

  availableRoles = [
    'b2bcustomergroup',
    'b2bmanagergroup',
    'b2bapprovergroup',
    'b2badmingroup',
  ];

  get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }

  units$: Observable<B2BUnitNode[]> = this.orgUnitService.getActiveUnitList();

  titles$ = this.userService.getTitles().pipe(
    map((titles: Title[]) => {
      titles.sort(sortTitles);
      const noneTitle = { code: '', name: 'Title' };
      return [noneTitle, ...titles];
    })
  );

  constructor(
    protected orgUnitService: OrgUnitService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.orgUnitService.loadList();
    this.userService.loadTitles();
  }

  onRoleChange(event) {
    const { value, checked } = event.target;
    const approver = value === 'b2bapprovergroup';
    const rolesArray: FormArray = this.roles;

    if (checked) {
      rolesArray.push(new FormControl(value));
      if (approver) {
        this.form.get('isAssignedToApprovers').setValue(true);
      }
      return;
    } else {
      rolesArray.controls.forEach((ctrl: FormControl, index) => {
        if (ctrl.value === event.target.value) {
          rolesArray.removeAt(index);
          if (approver) {
            this.form.get('isAssignedToApprovers').setValue(false);
          }
          return;
        }
      });
    }
  }
}
