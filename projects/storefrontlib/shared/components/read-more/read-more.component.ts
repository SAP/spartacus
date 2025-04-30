/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { I18nModule } from '@spartacus/core';

/**
 * Renders cx-read-more.
 */
@Component({
  selector: 'cx-read-more',
  templateUrl: './read-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, I18nModule],
})
export class ReadMoreComponent implements OnChanges {
  @Input() readMoreTranslation?: string = 'common.readMore';
  @Input() readLessTranslation?: string = 'common.readLess';
  @Input() maxLength = 360;

  @Input() text: string = '';
  showReadMore: boolean = false;
  isCollapsed: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'].currentValue.length > this.maxLength) {
      this.showReadMore = true;
    }
  }
}
