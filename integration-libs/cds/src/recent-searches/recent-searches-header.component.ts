/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { FeatureDirective, TranslatePipe } from '@spartacus/core';
import { SearchBoxComponentService } from '@spartacus/storefront';
import { RecentSearchesService } from './recent-searches.service';

@Component({
  selector: 'cx-recent-searches-header',
  templateUrl: './recent-searches-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FeatureDirective],
})
export class RecentSearchesHeaderComponent {
  protected recentSearchesService = inject(RecentSearchesService);
  protected searchBoxComponentService = inject(SearchBoxComponentService);

  clearPhrases(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
      event.stopImmediatePropagation?.();
    }
    this.recentSearchesService.clearPhrases();
  }

  onArrowDown(event: UIEvent): void {
    this.searchBoxComponentService.shareEvent(event as KeyboardEvent);
  }
}
