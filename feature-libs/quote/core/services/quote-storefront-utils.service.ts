/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class QuoteStorefrontUtilsService {
  protected windowRef = inject(WindowRef);

  /**
   * Retrieves HTML element based on querySelector when running in browser.
   *
   * @param querySelector - query selector
   * @returns - if the HTML element has been found in the HTML tree then it will be returned, otherwise undefined.
   */
  getElement(querySelector: string): HTMLElement | undefined {
    if (this.windowRef.isBrowser()) {
      return this.windowRef.document.querySelector(
        querySelector
      ) as HTMLElement;
    }
  }

  /**
   * Change styling of a HTML element.
   *
   * @param querySelector - query selector
   * @param property - CSS property
   * @param value - CSS value
   */
  changeStyling(querySelector: string, property: string, value: string): void {
    const element = this.getElement(querySelector);
    if (element) {
      element.style.setProperty(property, value);
    }
  }

  protected isInViewport(element: HTMLElement | undefined): boolean {
    if (element) {
      const bounding = element.getBoundingClientRect();
      const height = element.offsetHeight;
      const width = element.offsetWidth;

      return (
        bounding.top >= -height &&
        bounding.left >= -width &&
        bounding.right <=
          (this.windowRef.nativeWindow?.innerWidth || element.clientWidth) +
            width &&
        bounding.bottom <=
          (this.windowRef.nativeWindow?.innerHeight || element.clientHeight) +
            height
      );
    }
    return false;
  }

  /**
   * Retrieves the height of the HTML element.
   *
   * @param querySelector - query selector
   * @returns - if the HTML element is in viewport then its height will be returned, otherwise zero
   */
  getHeight(querySelector: string): number {
    const element = this.getElement(querySelector);
    const isElementInViewport = this.isInViewport(element);
    if (isElementInViewport && element?.offsetHeight) {
      return element?.offsetHeight;
    }
    return 0;
  }

  /**
   * Retrieves the value of DOMRect object by its property name.
   *
   * @param querySelector - query selector
   * @param property - name of the searched property
   * @returns - if the object has a searched property then the value of the property will be returned, otherwise undefined.
   */
  getDomRectValue(querySelector: string, property: string): number | undefined {
    const element = this.getElement(querySelector);
    if (element) {
      const domRectObj = element.getBoundingClientRect().toJSON();
      const properties = Object.getOwnPropertyNames(domRectObj);
      if (properties.length >= 1 && properties.indexOf(property) >= 0) {
        const value = domRectObj[property];
        if (typeof value === 'number') {
          return Math.round(value);
        }
      }
    }
    return undefined;
  }

  /**
   * Retrieves the height of the window.
   *
   * @returns - if the height of the window is known, then it will be returned, otherwise zero.
   */
  getWindowHeight(): number {
    if (this.windowRef.isBrowser()) {
      return this.windowRef.nativeWindow
        ? this.windowRef.nativeWindow.innerHeight
        : 0;
    }
    return 0;
  }
}
