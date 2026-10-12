/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';

/**
 * Dismisses a CSS `:focus-within`-driven overlay when Escape is pressed,
 * while keeping focus on the host trigger element.
 *
 * The overlay is normally shown by `:hover`/`:focus-within` on the wrapper
 * element, satisfying WCAG 1.4.13 (content shown on hover/focus). Because
 * focus remains on the trigger after Escape, `:focus-within` would keep the
 * overlay open. To avoid that, `dismissedClass` is added to the host's parent
 * wrapper so the CSS rule stops matching while focus stays put. The class is
 * removed on blur, so moving focus away and back re-enables the overlay.
 *
 * Apply `cxRetainFocusOnEscape` to the trigger element and set
 * `dismissedClass` to the CSS class that your SCSS uses in the
 * `:not(.<class>):focus-within` guard on the wrapper.
 */
@Directive({
  selector: '[cxRetainFocusOnEscape]',
  standalone: true,
})
export class RetainFocusOnEscapeDirective {
  private el = inject(ElementRef<HTMLElement>);

  /** CSS class added to the parent wrapper to suppress the `:focus-within` rule. */
  @Input() cxRetainFocusOnEscape = 'cx-dismissed';

  protected get wrapper(): HTMLElement | null {
    return this.el.nativeElement.parentElement;
  }

  private get dismissedClass(): string {
    return this.cxRetainFocusOnEscape || 'cx-dismissed';
  }

  @HostListener('keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.wrapper?.classList.add(this.dismissedClass);
  }

  @HostListener('blur')
  onBlur(): void {
    this.wrapper?.classList.remove(this.dismissedClass);
  }
}
