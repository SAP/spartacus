/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit, output, input } from '@angular/core';
import { TranslatePipe, useFeatureStyles } from '@spartacus/core';
import { IconComponent } from '../../../cms-components/misc/icon/icon.component';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { FocusDirective } from '../../../layout/a11y/keyboard-focus/focus.directive';
import { AtMessageDirective } from '../assistive-technology-message/assistive-technology-message.directive';
import { GenericLinkComponent } from '../generic-link/generic-link.component';
import { TruncateTextPopoverComponent } from '../truncate-text-popover/truncate-text-popover.component';

export interface CardAction {
  event: string;
  name: string;
}

export interface CardLinkAction {
  link: string;
  name: string;
  ariaLabel?: string;
  target?: string;
}

export interface Card {
  header?: string;
  title?: string;
  textBold?: string;
  text?: Array<string>;
  paragraphs?: Array<{ title?: string; text?: Array<string> }>;
  img?: string;
  imgLabel?: string;
  actions?: Array<CardAction | CardLinkAction>;
  deleteMsg?: string;
  label?: string;
  role?: string;
  customClass?: string;
}

@Component({
  selector: 'cx-card',
  templateUrl: './card.component.html',
  imports: [
    NgTemplateOutlet,
    IconComponent,
    FocusDirective,
    AtMessageDirective,
    GenericLinkComponent,
    NgClass,
    TruncateTextPopoverComponent,
    TranslatePipe,
  ],
})
export class CardComponent implements OnInit {
  iconTypes = ICON_TYPE;

  readonly deleteCard = output<number>();
  readonly setDefaultCard = output<number>();
  readonly sendCard = output<number>();
  readonly editCard = output<number>();
  readonly cancelCard = output<number>();

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  border = false;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  editMode = false;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  isDefault = false;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  content: Card | null;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  fitToContainer = false;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  truncateText = false;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  truncateParagraphText = false;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  charactersLimit = 100;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  index: number;

  readonly role = input<string>();

  // ACTIONS

  setEditMode(): void {
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    this.cancelCard.emit(5);
  }

  delete(): void {
    this.deleteCard.emit(1);
  }

  setDefault(): void {
    this.isDefault = true;
    this.setDefaultCard.emit(2);
  }

  send(): void {
    this.sendCard.emit(3);
  }

  edit(): void {
    this.editCard.emit(4);
  }

  isCardAction(action: CardAction | CardLinkAction): action is CardAction {
    return (action as CardAction).event !== undefined;
  }

  isCardLinkAction(
    action: CardAction | CardLinkAction
  ): action is CardLinkAction {
    return (action as CardLinkAction).link !== undefined;
  }

  trackByIndex(index: number): number {
    return index;
  }

  constructor() {
    useFeatureStyles('a11yHighContrastFix');
  }

  /* eslint @angular-eslint/no-empty-lifecycle-method: 1 */
  ngOnInit() {
    // Intentional empty method
  }

  protected get isHeaderVisible(): boolean {
    return !!this.content?.header && !this.editMode;
  }

  /**
   * ariaDescribedBy: Computes the value for the 'aria-describedby' attribute.
   * If `content` has a `title`, it returns a string including the title and container IDs, with index if available.
   * If no title, it returns only the container ID with the index if available.
   *
   * @returns {string} The 'aria-describedby' value.
   */
  protected get ariaDescribedBy() {
    if (this.content && this.content.title) {
      return `${this.getLabel('content-title')} ${this.getLabel('cx-card-container')}`;
    }

    return `${this.getLabel('cx-card-container')}`;
  }

  /**
   * getLabel: Computes a label string by concatenating the provided prefix with the index.
   * If the index is greater than or equal to 0, it appends the index to the prefix; otherwise, it just returns the prefix.
   *
   * @param {string} prefix - The string to prefix to the label.
   * @returns {string} The computed label, including the index if it's available.
   */
  protected getLabel(prefix: string): string {
    return prefix + (this.index >= 0 ? '-' + this.index : '');
  }
}
