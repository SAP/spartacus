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
import {
  OpfDynamicScript,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { OpfCtaScriptsService } from '../opf-cta-scripts/opf-cta-scripts.service';

@Component({
  selector: 'cx-opf-cta-element',
  templateUrl: './opf-cta-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCtaElementComponent implements AfterViewInit {
  protected sanitizer = inject(DomSanitizer);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected opfCtaScriptsService = inject(OpfCtaScriptsService);
  htmlString: string;
  _ctaScriptHtml: OpfDynamicScript;

  get ctaScriptHtml(): OpfDynamicScript {
    return this._ctaScriptHtml;
  }

  @Input() set ctaScriptHtml(value: OpfDynamicScript) {
    this._ctaScriptHtml = value;

    this.htmlString = value.html
      ? this.opfCtaScriptsService.removeScriptTags(value.html)
      : '';
  }

  ngAfterViewInit(): void {
    this.opfCtaScriptsService.loadAndRunScript(this.ctaScriptHtml);
  }
  renderHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // protected removeScriptTags(html: string) {
  //   const element = new DOMParser().parseFromString(html, 'text/html');
  //   Array.from(element.getElementsByTagName('script')).forEach((script) => {
  //     html = html.replace(script.outerHTML, '');
  //   });
  //   return html;
  // }
}
