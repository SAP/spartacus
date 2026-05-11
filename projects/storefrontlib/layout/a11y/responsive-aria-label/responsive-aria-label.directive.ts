/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointService } from '../../breakpoint';
import { BREAKPOINT } from '../../config/layout-config';

@Directive({
  selector: '[cxResponsiveAriaLabel]',
  standalone: true,
  host: {
    '[attr.aria-label]':
      'isLargeScreen() ? ariaLabelLarge() : ariaLabelSmall()',
  },
})
export class ResponsiveAriaLabelDirective {
  readonly ariaLabelLarge = input.required<string>();
  readonly ariaLabelSmall = input.required<string>();

  protected readonly isLargeScreen = toSignal(
    inject(BreakpointService).isUp(BREAKPOINT.lg),
    { initialValue: false }
  );
}
