/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cx-configurator-show-more',
  templateUrl: './configurator-show-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ConfiguratorShowMoreComponent implements AfterViewInit {
  showMore = false;
  showHiddenText = false;
  textToShow: string;
  textNormalized: string;

  sanitizer = inject(DomSanitizer);

  @Input() text: string;
  @Input() textSize = 60;
  @Input() productName: string;
  @Input() tabIndex = -1;

  constructor(protected cdRef: ChangeDetectorRef) {}

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

  normalize(text: string = ''): string {
    return this.removeScriptTags(text.replace(/<[^>]*>/g, ''));
  }

  removeScriptTags(html: string): string {
    if (!html) {
      return '';
    }

    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Remove all <script> tags
    doc.querySelectorAll('script').forEach((script) => script.remove());

    // Remove other dangerous tags (optional)
    const blockedTags = ['iframe', 'object', 'embed', 'link', 'style'];
    blockedTags.forEach((tag) => {
      doc.querySelectorAll(tag).forEach((el) => el.remove());
    });

    // Remove inline event handlers
    doc.querySelectorAll('*').forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        if (attr.name.startsWith('on')) {
          el.removeAttribute(attr.name);
        }
      });
    });

    // Decode HTML entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = doc.body.innerHTML;
    return textarea.value;
  }
}
