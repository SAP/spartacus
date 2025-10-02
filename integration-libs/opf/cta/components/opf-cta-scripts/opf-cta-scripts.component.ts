/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { OpfCtaElementComponent } from '../opf-cta-element/opf-cta-element.component';

@Component({
    selector: 'cx-opf-cta-scripts',
    templateUrl: './opf-cta-scripts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        NgFor,
        OpfCtaElementComponent,
        AsyncPipe,
    ],
})
export class OpfCtaScriptsComponent {
  protected opfCtaScriptService = inject(OpfCtaScriptsService);

  ctaHtmls$ = this.opfCtaScriptService.getCtaHtmlList().pipe(
    catchError(() => {
      return of([]);
    })
  );
}
