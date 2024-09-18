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
import { OpfResourceLoaderService } from '@spartacus/opf/base/root';

@Component({
  selector: 'cx-opf-cta-element',
  templateUrl: './opf-cta-element.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCtaElementComponent implements AfterViewInit, OnInit {
  protected sanitizer = inject(DomSanitizer);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  htmlOnly: string;
  _ctaScriptHtml: string;

  get ctaScriptHtml(): string {
    return this._ctaScriptHtml;
  }

  @Input() set ctaScriptHtml(value: string) {
    this._ctaScriptHtml = value;
    this.htmlOnly = this.removeScriptTags(value);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit');
    this.opfResourceLoaderService.executeScriptFromHtml(this.ctaScriptHtml);
  }
  renderHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  removeScriptTags(html: string) {
    const element = new DOMParser().parseFromString(html, 'text/html');
    Array.from(element.getElementsByTagName('script')).forEach((script) => {
      html = html.replace(script.outerHTML, '');
    });
    return html;
  }
}
