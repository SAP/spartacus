/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CmsParagraphComponent } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-paragraph',
  templateUrl: './paragraph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphComponent {
  protected sanitizer = inject(DomSanitizer);

  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    if (event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      const href = element?.getAttribute('href');
      const documentUrlObject = new URL(element.ownerDocument.URL);

      // Use router for internal link navigation
      if (href && documentUrlObject.host === element.host) {
        event.preventDefault();
        this.router.navigateByUrl(href.replace(documentUrlObject.origin, ''));
      }
    }
  }

  constructor(
    public component: CmsComponentData<CmsParagraphComponent>,
    protected router: Router
  ) {}

  public bypassSecurityTrustHtml(html: string = ''): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
