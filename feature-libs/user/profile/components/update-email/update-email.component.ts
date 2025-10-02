/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { useFeatureStyles } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UpdateEmailComponentService } from './update-email-component.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { FormRequiredLegendComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-legend/form-required-legend.component';
import { FormRequiredAsterisksComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { FormErrorsComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { PasswordVisibilityToggleDirective } from '../../../../../projects/storefrontlib/shared/components/form/password-visibility-toggle/password-visibility-toggle.directive';
import { BtnLikeLinkDirective } from '../../../../../projects/storefrontlib/layout/a11y/btn-like-link/btn-like-link.directive';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '../../../../../projects/core/src/routing/configurable-routes/url-translation/url.pipe';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-update-email',
    templateUrl: './update-email.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'user-form', ngSkipHydration: 'true' },
    imports: [
        NgIf,
        SpinnerComponent,
        FormRequiredLegendComponent,
        FormsModule,
        ReactiveFormsModule,
        FormRequiredAsterisksComponent,
        FormErrorsComponent,
        PasswordVisibilityToggleDirective,
        BtnLikeLinkDirective,
        RouterLink,
        AsyncPipe,
        UrlPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class UpdateEmailComponent {
  constructor(protected service: UpdateEmailComponentService) {
    useFeatureStyles('a11yPasswordVisibliltyBtnValueOverflow');
  }

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  onSubmit(): void {
    this.service.save();
  }
}
