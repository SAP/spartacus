import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { B2BUnitNode, UserService, Title } from '@spartacus/core';
import { sortTitles } from '@spartacus/storefront';
import { OrgUnitService } from '@spartacus/my-account/organization/core';

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

  get isAssignedToApprovers(): FormControl {
    return this.form.get('isAssignedToApprovers') as FormControl;
  }

  units$: Observable<B2BUnitNode[]> = this.orgUnitService.getActiveUnitList();

  titles$ = this.userService.getTitles().pipe(
    tap((titles: Title[]) => {
      if (Object.keys(titles).length === 0) {
        this.userService.loadTitles();
      }
    }),
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
}
