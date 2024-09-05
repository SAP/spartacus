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
import { Title } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { UpdateProfileComponentService } from './update-profile-component.service';
import { RoutingService, FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule, NgSelectA11yModule, FormErrorsModule } from '@spartacus/storefront';
import { NgIf, NgFor, NgTemplateOutlet, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-update-profile',
    templateUrl: './update-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'user-form' },
    standalone: true,
    imports: [
        NgIf,
        SpinnerModule,
        FeaturesConfigModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgSelectA11yModule,
        NgFor,
        NgTemplateOutlet,
        FormErrorsModule,
        RouterLink,
        AsyncPipe,
        I18nModule,
        UrlModule,
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
