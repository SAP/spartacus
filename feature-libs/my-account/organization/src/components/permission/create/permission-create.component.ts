import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { PermissionFormService } from '../form/permission-form.service';
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'cx-permission-create',
  templateUrl: './permission-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionCreateComponent {
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
      this.permissionFormService.getForm({ orgUnit: { uid: parentUnit } })
    )
  );

  constructor(
    protected permissionService: PermissionService,
    protected permissionFormService: PermissionFormService,
    protected routingService: RoutingService
  ) {}

  save(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.permissionService.create(form.value);

      this.routingService.go({
        cxRoute: 'permission',
        params: form.value,
      });
    }
  }
}
