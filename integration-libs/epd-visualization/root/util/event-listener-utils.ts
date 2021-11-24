import { Renderer2 } from '@angular/core';

export interface Listener {
  nativeElement: any;
  eventName: string;
  endListener: () => void;
}

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
      nativeElement: nativeElement,
      eventName: eventName,
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
