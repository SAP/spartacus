/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Optional,
  inject,
} from '@angular/core';
import {
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RoutingService, useFeatureStyles } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { FormRequiredLegendComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-legend/form-required-legend.component';
import { FormRequiredAsterisksComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { PasswordVisibilityToggleDirective } from '../../../../../projects/storefrontlib/shared/components/form/password-visibility-toggle/password-visibility-toggle.directive';
import { FormErrorsComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { TranslatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form', ngSkipHydration: 'true' },
  imports: [
    NgIf,
    SpinnerComponent,
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredAsterisksComponent,
    PasswordVisibilityToggleDirective,
    FormErrorsComponent,
    AsyncPipe,
    TranslatePipe,
    MockTranslatePipe,
  ],
})
export class UpdatePasswordComponent {
  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });

  constructor(protected service: UpdatePasswordComponentService) {
    useFeatureStyles('a11yPasswordVisibliltyBtnValueOverflow');
  }

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  onSubmit(): void {
    this.service.updatePassword();
  }

  navigateTo(cxRoute: string): void {
    this.routingService?.go({ cxRoute });
  }
}
