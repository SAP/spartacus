/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
   * @param querySelector - querySelector
   * @returns selected HTML element
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
   * @param querySelector - querySelector
   * @param property - CSS property
   * @param value - CSS value
   */
  changeStyling(querySelector: string, property: string, value: string): void {
    const element = this.getElement(querySelector);
    if (element) {
      console.log('add property: ' + property + '; value: ' + value);
      element.style.setProperty(property, value);
    }
  }

  /**
   * Removes styling for element.
   *
   * @param querySelector - querySelector
   * @param property - CSS property
   */
  removeStyling(querySelector: string, property: string): void {
    const element = this.getElement(querySelector);
    if (element) {
      console.log('remove property: ' + property);
      element.style.removeProperty(property);
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
   * @param querySelector - querySelector
   * @returns - the height of the HTML element
   */
  public getHeight(querySelector: string): number {
    const element = this.getElement(querySelector);
    const isElementInViewport = this.isInViewport(element);
    if (isElementInViewport && element?.offsetHeight) {
      return element?.offsetHeight;
    }
    return 0;
  }

  public getWindowHeight() {
    if (this.windowRef.isBrowser()) {
      return this.windowRef.nativeWindow
        ? this.windowRef.nativeWindow.innerHeight
        : 0;
    }
    return 0;
  }
}
