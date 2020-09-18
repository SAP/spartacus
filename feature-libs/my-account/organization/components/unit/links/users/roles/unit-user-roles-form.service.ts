import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { B2BUser } from '@spartacus/core';
import { UserRole } from '@spartacus/my-account/organization/core';
import { OrganizationFormService } from '../../../../shared/organization-form/organization-form.service';

@Injectable({
  providedIn: 'root',
})
export class UnitUserRolesFormService extends OrganizationFormService<B2BUser> {
  availableRoles = [
    UserRole.CUSTOMER,
    UserRole.MANAGER,
    UserRole.APPROVER,
    UserRole.ADMIN,
  ];

  protected build() {
    const form = new FormGroup({});
    this.availableRoles.forEach((role) =>
      form.addControl(role, new FormControl())
    );
    this.form = form;
  }

  protected patchData(item: B2BUser) {
    super.patchData(item);
    if (item) {
      item.roles?.forEach((role) => {
        this.form.get(role).setValue(true);
      });
    }
  }
}
