/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UntypedFormGroup } from '@angular/forms';
import { UpdateProfileComponent, UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { Observable } from 'rxjs';
import { Title } from '@spartacus/user/profile/root';
import { CdpUpdateProfileService } from './cdp-update-profile.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'cx-cdp-update-profile',
  templateUrl: './cdp-update-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class CdpUpdateProfileComponent extends UpdateProfileComponent {

  constructor(
    protected cdpUpdateProfileService: CdpUpdateProfileService,
    protected profileUpdateComponentService: UpdateProfileComponentService
    ) {
    super(profileUpdateComponentService);
    this.setOldEmail();
  }

  form: UntypedFormGroup = this.cdpUpdateProfileService.form;

  isUpdating$ = this.cdpUpdateProfileService.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$;

  onSubmit(): void {
    this.cdpUpdateProfileService.updateProfile();
  }

  setOldEmail(): void{
    const y = this.form.get('email');
    console.log(y);
    const x = y?.value;
    console.log("x"+ x);
    this.cdpUpdateProfileService.oldEmail = this.form.get('email')?.value;
  }

}
