/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { NewUpdatePasswordComponentService } from './new-update-password-component.service';

@Component({
  selector: 'cx-new-update-password-form',
  templateUrl: './new-update-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class NewUpdatePasswordComponent {
  constructor(
    protected service: NewUpdatePasswordComponentService,
    protected routingService: RoutingService
    ) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  onSubmit(): void {
    this.service.updatePassword();
  }

  onCancel(): void {
    this.routingService.go({ cxRoute: 'home' });
  }
}
