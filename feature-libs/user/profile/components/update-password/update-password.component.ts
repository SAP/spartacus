/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Optional,
  inject,
} from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';
import { RoutingService, FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { RouterLink } from '@angular/router';
import { SpinnerModule, PasswordVisibilityToggleModule, FormErrorsModule } from '@spartacus/storefront';
import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-update-password',
    templateUrl: './update-password.component.html',
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
        PasswordVisibilityToggleModule,
        FormErrorsModule,
        RouterLink,
        AsyncPipe,
        I18nModule,
        UrlModule,
    ],
})
export class UpdatePasswordComponent {
  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });

  constructor(protected service: UpdatePasswordComponentService) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;

  onSubmit(): void {
    this.service.updatePassword();
  }

  navigateTo(cxRoute: string): void {
    this.routingService?.go({ cxRoute });
  }
}
