import { Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { supportsPassiveEvents } from 'detect-passive-events';
import { EventListener } from './event-listener';

/**
 * Helper class to attach passive event listeners (when supported by browser)
 * without setting passive event handlers globally for entire application
 */
export class EventListenerHelper {
  constructor(private renderer: Renderer2) {}

  public attachPassiveEventListener(
    nativeElement: any,
    eventName: string,
    callback: (event: any) => void
  ): EventListener {
    if (supportsPassiveEvents !== true) {
      return this.attachEventListener(nativeElement, eventName, callback);
    }

    const listener: EventListener = new EventListener();
    listener.eventName = eventName;
    listener.events = new Subject<Event>();

    const observerCallback: (event: Event) => void = (event: Event): void => {
      listener.events?.next(event);
    };
    nativeElement.addEventListener(eventName, observerCallback, {
      passive: true,
      capture: false,
    });

    listener.teardownCallback = (): void => {
      nativeElement.removeEventListener(eventName, observerCallback, {
        passive: true,
        capture: false,
      });
    };

    listener.eventsSubscription = listener.events.subscribe((event: Event) => {
      callback(event);
    });

    return listener;
  }

  public detachEventListener(eventListener: EventListener): void {
    if (eventListener.eventsSubscription !== undefined) {
      eventListener.eventsSubscription.unsubscribe();
      eventListener.eventsSubscription = undefined;
    }

    if (eventListener.events !== undefined) {
      eventListener.events.complete();
      eventListener.events = undefined;
    }

    if (eventListener.teardownCallback !== undefined) {
      eventListener.teardownCallback();
      eventListener.teardownCallback = undefined;
    }
  }

  public attachEventListener(
    nativeElement: any,
    eventName: string,
    callback: (event: any) => void
  ): EventListener {
    const listener: EventListener = new EventListener();
    listener.eventName = eventName;
    listener.events = new Subject<Event>();

    const observerCallback: (event: Event) => void = (event: Event): void => {
      listener.events?.next(event);
    };

    listener.teardownCallback = this.renderer.listen(
      nativeElement,
      eventName,
      observerCallback
    );

    listener.eventsSubscription = listener.events.subscribe((event: Event) => {
      callback(event);
    });

    return listener;
  }
}
