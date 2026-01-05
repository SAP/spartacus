/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Renderer2 } from '@angular/core';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export interface Listener {
  nativeElement: any;
  eventName: string;
  endListener: () => void;
}

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export class EventListenerUtils {
  initialize(renderer: Renderer2) {
    this.renderer = renderer;
  }

  private renderer: Renderer2;
  private listeners: Listener[] = [];

  attachEventListener(
    nativeElement: any,
    eventName: string,
    callback: (event: any) => void
  ): void {
    const listener: Listener = {
      nativeElement,
      eventName,
      endListener: this.renderer.listen(nativeElement, eventName, callback),
    };
    this.listeners.push(listener);
  }

  detachEventListeners(nativeElement: any, eventName: string): void {
    this._detachEventListeners(
      this.listeners.filter(
        (listener) =>
          listener.nativeElement === nativeElement &&
          listener.eventName === eventName
      )
    );
  }

  detachAllEventListeners(nativeElement: any): void {
    this._detachEventListeners(
      this.listeners.filter(
        (listener) => listener.nativeElement === nativeElement
      )
    );
  }

  _detachEventListeners(eventListeners: Listener[]): void {
    const listenersSet = new Set(eventListeners);
    eventListeners.forEach((listener) => {
      listener.endListener();
    });
    this.listeners = this.listeners.filter(
      (listener) => !listenersSet.has(listener)
    );
  }
}
