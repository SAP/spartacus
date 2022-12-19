/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Optional,
} from '@angular/core';
import { Router } from '@angular/router';
import { CmsParagraphComponent, FeatureConfigService } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-paragraph',
  templateUrl: './paragraph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphComponent {
  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    if (event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      const href = element?.getAttribute('href');

      /**
       * TODO: (#CXSPA-778) Remove feature config check and deprecated navigation method in 6.0.
       */
      if (this.featureConfigService?.isLevel('5.1')) {
        const documentHost =
          element.ownerDocument.URL.split('://')[1].split('/')[0];

        // Use router for internal link navigation
        if (href && documentHost === element.host) {
          event.preventDefault();
          this.router.navigateByUrl(href);
        }
      } else {
        if (href?.indexOf('/') === 0) {
          event.preventDefault();
          this.router.navigate([`/${href}`]);
        }
      }
    }
  }

  /**
   * TODO: (#CXSPA-778) Remove featureConfigService from constructor in 6.0.
   */
  constructor(
    public component: CmsComponentData<CmsParagraphComponent>,
    protected router: Router,
    @Optional() protected featureConfigService?: FeatureConfigService
  ) {}
}
