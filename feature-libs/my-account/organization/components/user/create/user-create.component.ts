import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { UserFormService } from '../form/user-form.service';
import { B2BUserService } from '@spartacus/my-account/organization/core';

@Component({
  selector: 'cx-user-create',
  templateUrl: './user-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {
  // It would be nice to replace this query param approach with a session service that
  // provides a generic approach for session-interests, so that we can autofill forms, without
  // changing the URL. This can keep the current language, currency, parent unit, cost center, user, etc.
  protected parentUnit$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.queryParams?.['parentUnit']));

  form$: Observable<FormGroup> = this.parentUnit$.pipe(
    map((parentUnit: string) =>
      this.userFormService.getForm({ orgUnit: { uid: parentUnit } })
    )
  );

  constructor(
    protected userService: B2BUserService,
    protected userFormService: UserFormService,
    protected routingService: RoutingService
  ) {}

  save(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.userService.create(form.value);

      this.routingService.go({
        cxRoute: 'userDetails',
        params: form.value,
      });
    }
  }
}
