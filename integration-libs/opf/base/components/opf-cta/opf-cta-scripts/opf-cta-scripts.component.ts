/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OpfCtaScriptEventBrokerService } from './services/opf-cta-scripts-event-broker.service';
import { OpfCtaScriptsService } from './services/opf-cta-scripts.service';

@Component({
  selector: 'cx-opf-cta-scripts',
  templateUrl: './opf-cta-scripts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCtaScriptsComponent implements OnInit, OnDestroy {
  protected opfCtaScriptService = inject(OpfCtaScriptsService);
  protected opfCtaScriptEventBrokerService = inject(
    OpfCtaScriptEventBrokerService
  );

  ctaHtmls$ = this.opfCtaScriptService.getCtaHtmlsList().pipe(
    catchError(() => {
      return of([]);
    })
  );

  ngOnInit(): void {
    this.opfCtaScriptEventBrokerService.listenOnRelevantEvents();
    this.opfCtaScriptService.registerGlobalFns();
  }

  ngOnDestroy(): void {
    this.opfCtaScriptService.removeGlobalFns();
    this.opfCtaScriptEventBrokerService.removeListeners();
  }
}
