/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Optional,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import {
  FeatureDirective,
  PageMetaService,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import {
  FormErrorsComponent,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  getPageTitle,
  PasswordVisibilityToggleDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form', ngSkipHydration: 'true' },
  imports: [
    SpinnerComponent,
    FormRequiredLegendComponent,
    FormsModule,
    ReactiveFormsModule,
    FormRequiredAsterisksComponent,
    PasswordVisibilityToggleDirective,
    FormErrorsComponent,
    AsyncPipe,
    TranslatePipe,
    FeatureDirective,
  ],
})
export class UpdatePasswordComponent {
  protected service = inject(UpdatePasswordComponentService);

  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });
  protected pageMetaService = inject(PageMetaService);

  form: UntypedFormGroup = this.service.form;
  isUpdating$: Observable<boolean> = this.service.isUpdating$;
  pageTitle$: Observable<string> = getPageTitle(this.pageMetaService);

  onSubmit(): void {
    this.service.updatePassword();
  }

  navigateTo(cxRoute: string): void {
    this.routingService?.go({ cxRoute });
  }
}
