/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

const TOOLTIP_CLASS = 'cx-cvv-tooltip';
const ARIA_HIDDEN = 'aria-hidden';

let nextId = 0;

@Directive({
  selector: '[cxCvvTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'show()',
    '(focus)': 'show()',
    '(mouseleave)': 'hide()',
    '(blur)': 'hide()',
    '(keydown.escape)': 'hide()',
  },
})
export class CvvTooltipDirective implements OnInit, OnDestroy {
  @Input() cxCvvTooltip: string;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private tooltipEl: HTMLElement;
  private tooltipId: string;

  constructor() {
    this.tooltipId = `cx-cvv-tooltip-${nextId}`;
    nextId++;
  }

  ngOnInit(): void {
    this.tooltipEl = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltipEl, TOOLTIP_CLASS);
    this.renderer.setAttribute(this.tooltipEl, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipEl, 'id', this.tooltipId);
    this.renderer.setAttribute(this.tooltipEl, ARIA_HIDDEN, 'true');
    this.renderer.appendChild(this.document.body, this.tooltipEl);
    this.renderer.setAttribute(
      this.el.nativeElement,
      'aria-describedby',
      this.tooltipId
    );
  }

  show(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setProperty(this.tooltipEl, 'textContent', this.cxCvvTooltip);
    this.renderer.setStyle(this.tooltipEl, 'top', `${rect.bottom + 4}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${rect.left}px`);
    this.renderer.setAttribute(this.tooltipEl, ARIA_HIDDEN, 'false');
    this.renderer.addClass(this.tooltipEl, `${TOOLTIP_CLASS}--visible`);
  }

  hide(): void {
    this.renderer.setAttribute(this.tooltipEl, ARIA_HIDDEN, 'true');
    this.renderer.removeClass(this.tooltipEl, `${TOOLTIP_CLASS}--visible`);
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(this.document.body, this.tooltipEl);
    this.renderer.removeAttribute(this.el.nativeElement, 'aria-describedby');
  }
}
