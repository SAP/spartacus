/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CheckoutDeliveryModeComponent } from '@spartacus/checkout/base/components';
import {
  CheckoutServiceDetailsFacade,
  S4ServiceDeliveryModeConfig,
} from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';
import { NgTemplateOutlet, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutletDirective } from '../../../../../projects/storefrontlib/cms-structure/outlet/outlet.directive';
import { SpinnerComponent } from '../../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { InnerComponentsHostDirective } from '../../../../../projects/storefrontlib/cms-structure/page/component/inner-components-host.directive';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-delivery-mode',
    templateUrl: './service-checkout-delivery-mode.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgTemplateOutlet,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        OutletDirective,
        SpinnerComponent,
        InnerComponentsHostDirective,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class ServiceCheckoutDeliveryModeComponent extends CheckoutDeliveryModeComponent {
  protected checkoutServiceDetailsFacade = inject(CheckoutServiceDetailsFacade);
  protected config = inject(S4ServiceDeliveryModeConfig);

  hasServiceProducts$: Observable<boolean> =
    this.checkoutServiceDetailsFacade.hasServiceItems();

  serviceDeliveryConfig = this.config.s4ServiceDeliveryMode;
}
