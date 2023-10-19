/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';

@Component({
  selector: 'cx-opf-cta-scripts',
  templateUrl: './opf-cta-scripts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCtaScriptsComponent {
  protected opfCtaScriptService = inject(OpfCtaScriptsService);

  isError$ = new BehaviorSubject<boolean>(false);

  ctaHtmlList$ = this.opfCtaScriptService.getCtaHtmlslList().pipe(
    catchError((error) => {
      this.isError$.next(true);
      return throwError(error);
    })
  );
}
