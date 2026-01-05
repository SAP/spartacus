/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
import { I18nModule, Translatable } from '@spartacus/core';

/**
 * Wraps the provided input text in a Read More / Read Less component, truncating input to maxLength
 * and adding "Read More" link. Clicking "Read More" reveals full text with a "Read Less"
 * option to collapse it back.
 */
@Component({
  selector: 'cx-read-more',
  templateUrl: './read-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, I18nModule],
})
export class ReadMoreComponent implements OnChanges {
  // Read More label translation key
  @Input() readMoreI18nKey?: string | Translatable = 'common.readMore';
  // Read Less label translation key
  @Input() readLessI18nKey?: string | Translatable = 'common.readLess';
  // Text length that, when exceeded, triggers truncation and adds a Read More link.
  @Input() maxLength = 300;
  // Text to be rendered (decorated with Read More/Read Less links)
  @Input() text: string = '';

  showReadMore: boolean = false;
  isCollapsed: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'].currentValue.length > this.maxLength) {
      this.showReadMore = true;
    }
  }
}
