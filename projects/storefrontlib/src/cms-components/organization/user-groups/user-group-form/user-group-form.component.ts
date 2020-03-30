import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrgUnitUserGroup, B2BUnitNode, OrgUnitService } from '@spartacus/core';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';

@Component({
  selector: 'cx-user-group-form',
  templateUrl: './user-group-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupFormComponent extends AbstractFormComponent
  implements OnInit {
  businessUnits$: Observable<B2BUnitNode[]>;

  @Input()
  userGroupData: OrgUnitUserGroup;

  form: FormGroup = this.fb.group({
    uid: ['', Validators.required],
    name: ['', Validators.required],
    orgUnit: this.fb.group({
      uid: [null, Validators.required],
    }),
  });

  constructor(
    protected fb: FormBuilder,
    protected orgUnitService: OrgUnitService
  ) {
    super();
  }

  ngOnInit() {
    this.businessUnits$ = this.orgUnitService.getList();
    if (this.userGroupData && Object.keys(this.userGroupData).length !== 0) {
      this.form.patchValue(this.userGroupData);
    }
  }
}
