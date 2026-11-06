/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RoutingService, TranslatePipe, UrlPipe } from '@spartacus/core';
import { BtnLikeLinkDirective } from '@spartacus/storefront';

@Component({
  selector: 'cx-amend-order-actions',
  templateUrl: './amend-order-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BtnLikeLinkDirective, RouterLink, NgIf, UrlPipe, TranslatePipe],
})
export class AmendOrderActionsComponent {
  @Input() orderCode: string;
  @Input() amendOrderForm: UntypedFormGroup;
  @Input() backRoute: string;
  @Input() forwardRoute: string;

  @HostBinding('class') styles = 'row';

  constructor(protected routingService: RoutingService) {}

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
