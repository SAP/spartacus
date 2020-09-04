import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserGroup } from '../../../core/model/user-group.model';
import { OrganizationFormService } from '../../shared/organization-edit/organization-form.service';

@Injectable({
  providedIn: 'root',
})
export class UserGroupFormService extends OrganizationFormService<UserGroup> {
  protected build() {
    const form = new FormGroup({});
    form.setControl('uid', new FormControl('', Validators.required));
    form.setControl('name', new FormControl('', Validators.required));
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
    this.form = form;
  }
}
