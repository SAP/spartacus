/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-configurator-show-more',
  templateUrl: './configurator-show-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, TranslatePipe],
})
export class ConfiguratorShowMoreComponent implements AfterViewInit {
  showMore = false;
  showHiddenText = false;
  textToShow: string;
  textNormalized: string;

  @Input() text: string;
  @Input() textSize = 60;
  @Input() productName: string;
  @Input() tabIndex = -1;
  /**
   * Label of the attribute the description belongs to. Used for the
   * accessible name of the show more/less button.
   */
  @Input() attributeLabel?: string;
  /**
   * Label of the attribute value the description belongs to. Used for the
   * accessible name of the show more/less button, together with `attributeLabel`.
   */
  @Input() valueLabel?: string;
  /**
   * Label of the item (product) the description belongs to. Used for the
   * accessible name of the show more/less button, together with `attributeLabel`.
   */
  @Input() itemLabel?: string;

  constructor(protected cdRef: ChangeDetectorRef) {}

  /**
   * Translation key for the accessible name of the show more/less button.
   *
   * @returns Translation key, or `undefined` if no attribute label is provided
   */
  get ariaLabelKey(): string | undefined {
    if (!this.attributeLabel) {
      return undefined;
    }
    const moreOrLess = this.showHiddenText ? 'showLess' : 'showMore';
    let descriptionType = 'AttributeDescription';
    if (this.valueLabel) {
      descriptionType = 'ValueDescription';
    } else if (this.itemLabel) {
      descriptionType = 'ItemDescription';
    }
    return `configurator.a11y.${moreOrLess}${descriptionType}`;
  }

  ngAfterViewInit(): void {
    this.textNormalized = this.normalize(this.text);

    if (this.textNormalized.length > this.textSize) {
      this.showMore = true;
      this.textToShow = this.textNormalized.substring(0, this.textSize);
    } else {
      this.textToShow = this.textNormalized;
    }
    this.cdRef.detectChanges();
  }

  toggleShowMore(): void {
    this.showHiddenText = !this.showHiddenText;

    this.showHiddenText
      ? (this.textToShow = this.textNormalized)
      : (this.textToShow = this.textNormalized.substring(0, this.textSize));

    this.cdRef.detectChanges();
  }

  protected normalize(text: string = ''): string {
    return text.replace(/<[^>]*>/g, '');
  }
}
