/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';

const PATH_SEPARATOR = ' / ';
const ELLIPSIS_PREFIX = '...' + PATH_SEPARATOR;

/**
 * Drops leading slash-separated path segments until `title` fits
 * `maxWidth`. When any segment is dropped, the result is prefixed
 * with `... / `.
 *
 * If even the last segment (with the prefix) is wider than `maxWidth`,
 * that last-segment form is still returned so CSS ellipsis can clip it.
 *
 * @param title - Full path, for example `A / B / C`
 * @param maxWidth - Available width in CSS pixels
 * @param measureWidth - Returns the rendered width of a candidate string
 * @returns Truncated path, for example `... / C`
 */
export function truncatePathTitle(
  title: string,
  maxWidth: number,
  measureWidth: (text: string) => number
): string {
  if (!title || maxWidth <= 0 || measureWidth(title) <= maxWidth) {
    return title;
  }

  const parts = title.split(PATH_SEPARATOR);
  if (parts.length < 2) {
    return title;
  }

  for (let start = 1; start < parts.length; start++) {
    const truncated = ELLIPSIS_PREFIX + parts.slice(start).join(PATH_SEPARATOR);
    if (measureWidth(truncated) <= maxWidth) {
      return truncated;
    }
  }
  return ELLIPSIS_PREFIX + parts[parts.length - 1];
}

/**
 * Truncates a slash-separated product title from the left so that the
 * current (last) path segment remains visible when the host is too narrow.
 */
@Directive({
  selector: '[cxConfiguratorTruncatePathTitle]',
  standalone: true,
})
export class ConfiguratorTruncatePathTitleDirective
  implements AfterViewInit, OnDestroy
{
  /**
   * Full slash-separated product title to display.
   */
  @Input('cxConfiguratorTruncatePathTitle')
  set fullTitle(value: string) {
    this._fullTitle = value ?? '';
    this.updateTitle();
  }

  protected el = inject(ElementRef<HTMLElement>);
  protected windowRef = inject(WindowRef);
  protected resizeObserver?: ResizeObserver;
  protected _fullTitle = '';

  ngAfterViewInit(): void {
    this.startObserving();
    this.updateTitle();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  protected startObserving(): void {
    if (!this.windowRef.isBrowser() || typeof ResizeObserver === 'undefined') {
      return;
    }
    this.resizeObserver = new ResizeObserver(() => this.updateTitle());
    this.resizeObserver.observe(this.el.nativeElement);
  }

  /**
   * Replaces the host text with a truncated path that fits the host width.
   */
  protected updateTitle(): void {
    const host = this.el.nativeElement;
    const title = this._fullTitle;
    if (!this.windowRef.isBrowser()) {
      host.textContent = title;
      return;
    }
    host.textContent = truncatePathTitle(title, host.clientWidth, (text) => {
      host.textContent = text;
      return host.scrollWidth;
    });
  }
}
