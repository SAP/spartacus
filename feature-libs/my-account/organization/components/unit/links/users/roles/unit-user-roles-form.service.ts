import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { B2BUser, B2BUserGroup } from '@spartacus/core';
import { OrganizationFormService } from '../../../../shared/organization-form/organization-form.service';

@Injectable({
  providedIn: 'root',
})
export class UnitUserRolesFormService extends OrganizationFormService<B2BUser> {
  availableRoles = [
    B2BUserGroup.B2B_CUSTOMER_GROUP,
    B2BUserGroup.B2B_MANAGER_GROUP,
    B2BUserGroup.B2B_APPROVER_GROUP,
    B2BUserGroup.B2B_ADMIN_GROUP,
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
