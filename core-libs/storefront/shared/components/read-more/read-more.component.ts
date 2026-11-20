/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  input,
} from '@angular/core';
import { I18nModule, Translatable, useFeatureStyles } from '@spartacus/core';

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
  imports: [I18nModule],
})
export class ReadMoreComponent implements OnChanges {
  constructor() {
    useFeatureStyles('a11yHighContrastFix');
  }

  // Read More label translation key
  readonly readMoreI18nKey = input<(string | Translatable) | undefined>(
    'common.readMore'
  );
  // Read Less label translation key
  readonly readLessI18nKey = input<(string | Translatable) | undefined>(
    'common.readLess'
  );
  // Text length that, when exceeded, triggers truncation and adds a Read More link.
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() maxLength = 300;
  // Text to be rendered (decorated with Read More/Read Less links)
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() text: string | undefined = '';

  showReadMore: boolean = false;
  isCollapsed: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']?.currentValue?.length > this.maxLength) {
      this.showReadMore = true;
    }
  }
}
