import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUserService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUserService } from '../current-user.service';
import { UserFormService } from '../form/user-form.service';

@Component({
  selector: 'cx-user-create',
  templateUrl: './user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {
  protected parentUnit$: Observable<string> = this.currentUserService
    .parentUnit$;

  form$: Observable<FormGroup> = this.parentUnit$.pipe(
    map((parentUnit: string) =>
      this.userFormService.getForm({ orgUnit: { uid: parentUnit } })
    )
  );

  constructor(
    protected userService: B2BUserService,
    protected userFormService: UserFormService,
    protected currentUserService: CurrentUserService
  ) {}

  save(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.userService.create(form.value);

      this.currentUserService.launch('userDetails', form.value);
    }
  }
}
