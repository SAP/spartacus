import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { B2BUser, B2BUnitNode, OrgUnitService, Title, UserService } from '@spartacus/core';
import { AbstractFormComponent } from '../../abstract-component/abstract-form.component';
import { sortTitles } from '../../../../shared/utils/forms/title-utils';
import { tap, map } from 'rxjs/operators';

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
  titles$: Observable<Title[]>;

  form: FormGroup = this.fb.group({
    uid: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    orgUnit: this.fb.group({
      uid: [null, Validators.required],
    }),
    roles: [''],
    titleCode: [''],
  });

  constructor(
    protected fb: FormBuilder,
    protected orgUnitService: OrgUnitService,
    protected userService: UserService,
  ) {
    super();
  }

  ngOnInit() {
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

  testing() {
    console.log('FORM: ', this.form)
  }
}
