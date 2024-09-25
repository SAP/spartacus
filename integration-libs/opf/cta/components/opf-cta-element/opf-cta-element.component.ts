/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OpfDynamicScript } from '@spartacus/opf/base/root';
import { OpfCtaScriptsService } from '../opf-cta-scripts/opf-cta-scripts.service';

@Component({
  selector: 'cx-opf-cta-element',
  templateUrl: './opf-cta-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCtaElementComponent implements AfterViewInit, OnInit {
  protected sanitizer = inject(DomSanitizer);
  protected opfCtaScriptsService = inject(OpfCtaScriptsService);
  htmlString: string;

  @Input() ctaScriptHtml: OpfDynamicScript;

  ngOnInit(): void {
    this.htmlString = this.ctaScriptHtml.html ?? '';
  }

  ngAfterViewInit(): void {
    this.opfCtaScriptsService.loadAndRunScript(this.ctaScriptHtml);
  }
  renderHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
