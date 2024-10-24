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
  inject,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import { OpfDynamicScript } from '@spartacus/opf/base/root';
import { OpfCtaScriptsService } from '../opf-cta-scripts/opf-cta-scripts.service';

@Component({
  selector: 'cx-opf-cta-element',
  templateUrl: './opf-cta-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCtaElementComponent implements AfterViewInit {
  protected sanitizer = inject(DomSanitizer);
  protected opfCtaScriptsService = inject(OpfCtaScriptsService);
  loader = true;
  protected windowRef = inject(WindowRef);

  @Input() ctaScriptHtml: OpfDynamicScript;

  ngAfterViewInit(): void {
    const isSSR = !this.windowRef.isBrowser();
    console.log('ngAfterViewInit isSSR', isSSR);

    this.windowRef.isBrowser() &&
      this.opfCtaScriptsService.loadAndRunScript(this.ctaScriptHtml);
  }
  renderHtml(html: string): SafeHtml {
    const isSSR = !this.windowRef.isBrowser();
    console.log('renderHtml isSSR', isSSR);

    return this.windowRef.isBrowser()
      ? this.sanitizer.bypassSecurityTrustHtml(this.removeScriptTags(html))
      : '';
  }

  protected removeScriptTags(html: string) {
    const element = new DOMParser().parseFromString(html, 'text/html');
    Array.from(element.getElementsByTagName('script')).forEach((script) => {
      html = html.replace(script.outerHTML, '');
    });
    return html;
  }
}
