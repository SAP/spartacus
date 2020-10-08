import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { B2BUser, B2BUserGroup } from '@spartacus/core';
import { B2BUserService } from '@spartacus/my-account/organization/core';
import { OrganizationFormService } from '../../../../shared/organization-form/organization-form.service';

@Injectable({
  providedIn: 'root',
})
export class UnitUserRolesFormService extends OrganizationFormService<B2BUser> {
  availableRoles: B2BUserGroup[] = this.userService.getAllRoles();

  constructor(protected userService: B2BUserService) {
    super();
  }

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
