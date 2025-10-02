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
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { UpdateProfileComponentService } from './update-profile-component.service';
import { RoutingService } from '@spartacus/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { FormRequiredLegendComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-legend/form-required-legend.component';
import { NgSelectComponent, NgOptionComponent } from '@ng-select/ng-select';
import { NgSelectA11yDirective } from '../../../../../projects/storefrontlib/shared/components/ng-select-a11y/ng-select-a11y.directive';
import { FormRequiredAsterisksComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-required-asterisks/form-required-asterisks.component';
import { FormErrorsComponent } from '../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-update-profile',
    templateUrl: './update-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'user-form' },
    imports: [
        NgIf,
        SpinnerComponent,
        FormRequiredLegendComponent,
        FormsModule,
        ReactiveFormsModule,
        NgSelectComponent,
        NgSelectA11yDirective,
        NgFor,
        NgOptionComponent,
        FormRequiredAsterisksComponent,
        FormErrorsComponent,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class UpdateProfileComponent {
  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });

  constructor(protected service: UpdateProfileComponentService) {}

  form: UntypedFormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;
  titles$: Observable<Title[]> = this.service.titles$;

  onSubmit(): void {
    this.service.updateProfile();
  }

  navigateTo(cxRoute: string): void {
    this.routingService?.go({ cxRoute });
  }
}
