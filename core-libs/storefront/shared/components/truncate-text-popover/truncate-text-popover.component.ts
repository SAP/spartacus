/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { PopoverDirective } from '../popover/popover.directive';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'cx-truncate-text-popover',
  templateUrl: './truncate-text-popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, PopoverDirective, TranslatePipe, TruncatePipe],
})
export class TruncateTextPopoverComponent {
  /**
   * String to be rendered inside popover wrapper component.
   */
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() content: string;

  /**
   * The maximum length of the characters after which the text will be truncated
   */
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() charactersLimit: number = 100;

  readonly customClass = input<string>();

  get isTruncated(): boolean {
    return this.content.length > +this.charactersLimit;
  }
}
