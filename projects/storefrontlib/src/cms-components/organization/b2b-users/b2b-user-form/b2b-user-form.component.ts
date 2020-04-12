import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { B2BUser, B2BUnitNode, OrgUnitService } from '@spartacus/core';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';

@Component({
  selector: 'cx-b2b-user-form',
  templateUrl: './b2b-user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BUserFormComponent extends AbstractFormComponent
  implements OnInit {
  businessUnits$: Observable<B2BUnitNode[]>;

  @Input()
  b2bUserData: B2BUser;

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
    if (this.b2bUserData && Object.keys(this.b2bUserData).length !== 0) {
      this.form.patchValue(this.b2bUserData);
    }
  }
}
