/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureToggles, UrlPipe } from '@spartacus/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-active-link-cell',
  templateUrl: '../cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, NgTemplateOutlet, UrlPipe],
})
export class ActiveLinkCellComponent extends CellComponent {
  private activeLinkFeatureToggles = inject(FeatureToggles);

  override get tabIndex() {
    return this.activeLinkFeatureToggles.a11yTableKeyboardNavigation ? -1 : 0;
  }
}
