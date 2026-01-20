/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OpfCtaScriptsService } from '../opf-cta-scripts/opf-cta-scripts.service';

@Component({
  selector: 'cx-opf-cta-quick-buy-buttons',
  templateUrl: './opf-cta-quick-buy-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OpfCtaQuickBuyButtonsComponent {
  protected opfCtaScriptService = inject(OpfCtaScriptsService);

  ctaHtmls$ = this.opfCtaScriptService.getQuickBuyCtaHtmlList().pipe(
    catchError(() => {
      return of([]);
    })
  );
}

