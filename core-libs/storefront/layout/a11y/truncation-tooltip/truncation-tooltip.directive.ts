/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[cxTruncationTooltip]',
  standalone: true,
  host: {
    class: 'cx-truncate-with-elipsis',
    '(mouseenter)': 'show()',
    '(focus)': 'show()',
    '(mouseleave)': 'hide()',
    '(blur)': 'hide()',
  },
})
// Truncates the host input text with an ellipsis and shows a tooltip with the
// full value on hover or focus, but only when the text is actually truncated.
export class TruncationTooltipDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLInputElement>);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private tooltipEl: HTMLElement;

  ngOnInit(): void {
    this.tooltipEl = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipEl, 'cx-truncation-tooltip');
    this.renderer.setAttribute(this.tooltipEl, 'aria-hidden', 'true');
    this.renderer.appendChild(this.document.body, this.tooltipEl);
  }

  show(): void {
    const input = this.el.nativeElement;
    // Only show tooltip when text is truncated (content wider than visible area)
    if (input.scrollWidth <= input.clientWidth) return;

    // Position the tooltip rectangle above the input field
    const rect = input.getBoundingClientRect();
    this.renderer.setProperty(this.tooltipEl, 'textContent', input.value);
    this.renderer.setStyle(this.tooltipEl, 'top', `${rect.top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${rect.left}px`);
    this.renderer.addClass(this.tooltipEl, 'cx-truncation-tooltip--visible');
  }

  hide(): void {
    this.renderer.removeClass(this.tooltipEl, 'cx-truncation-tooltip--visible');
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(this.document.body, this.tooltipEl);
  }
}
