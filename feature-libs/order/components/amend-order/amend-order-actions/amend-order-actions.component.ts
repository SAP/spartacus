/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  inject,
  input,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RoutingService, TranslatePipe, UrlPipe } from '@spartacus/core';
import { BtnLikeLinkDirective } from '@spartacus/storefront';

@Component({
  selector: 'cx-amend-order-actions',
  templateUrl: './amend-order-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BtnLikeLinkDirective, RouterLink, UrlPipe, TranslatePipe],
})
export class AmendOrderActionsComponent {
  protected routingService = inject(RoutingService);

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() orderCode: string;
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() amendOrderForm: UntypedFormGroup;
  readonly backRoute = input<string>();
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() forwardRoute: string;

  @HostBinding('class') styles = 'row';

  continue(event: Event): void {
    if (this.amendOrderForm.valid) {
      this.routingService.go({
        cxRoute: this.forwardRoute,
        params: { code: this.orderCode },
      });
    } else {
      this.amendOrderForm.markAllAsTouched();
      event.stopPropagation();
    }
  }
}
