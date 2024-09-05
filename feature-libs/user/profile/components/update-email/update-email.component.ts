/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UpdateEmailComponentService } from './update-email-component.service';
import { RouterLink } from '@angular/router';
import { FeaturesConfigModule, UrlModule, I18nModule } from '@spartacus/core';
import { SpinnerModule, FormErrorsModule, PasswordVisibilityToggleModule } from '@spartacus/storefront';
import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-update-email',
    templateUrl: './update-email.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'user-form' },
    standalone: true,
    imports: [
        NgIf,
        SpinnerModule,
        FeaturesConfigModule,
        FormsModule,
        ReactiveFormsModule,
        NgTemplateOutlet,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
        RouterLink,
        AsyncPipe,
        UrlModule,
        I18nModule,
    ],
})
export class UpdateEmailComponent {
  constructor(protected service: UpdateEmailComponentService) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  onSubmit(): void {
    this.service.save();
  }
}
