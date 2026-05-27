/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[cxTruncationTooltip]',
  standalone: true,
})
// Truncates the host input text with an ellipsis and shows a tooltip with the
// full value on hover or focus, but only when the text is actually truncated.
export class TruncationTooltipDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLInputElement>);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private tooltipEl: HTMLElement;

  @HostBinding('class.cx-truncate-with-elipsis') readonly truncate = true;

  ngOnInit(): void {
    this.tooltipEl = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipEl, 'cx-truncation-tooltip');
    this.renderer.setAttribute(this.tooltipEl, 'aria-hidden', 'true');
    this.renderer.appendChild(this.document.body, this.tooltipEl);
  }

  @HostListener('mouseenter')
  @HostListener('focus')
  show(): void {
    const input = this.el.nativeElement;
    // Only show tooltip when text is truncated (content wider than visible area)
    if (input.scrollWidth <= input.clientWidth) return;

    const rect = input.getBoundingClientRect();
    this.renderer.setProperty(this.tooltipEl, 'textContent', input.value);
    this.renderer.setStyle(this.tooltipEl, 'top', `${rect.top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${rect.left}px`);
    this.renderer.addClass(this.tooltipEl, 'cx-truncation-tooltip--visible');
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hide(): void {
    this.renderer.removeClass(this.tooltipEl, 'cx-truncation-tooltip--visible');
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(this.document.body, this.tooltipEl);
  }
}
