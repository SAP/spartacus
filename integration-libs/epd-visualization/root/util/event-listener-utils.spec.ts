import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EventListenerUtils } from './event-listener-utils';

class MockRenderer {
  endListenCallback: () => void;

  listen(
    _target: any,
    _eventName: string,
    _callback: (event: any) => boolean | void
  ): () => void {
    return this.endListenCallback;
  }
}
const FAKE_EVENT_1 = 'FAKE_EVENT_1';
const FAKE_EVENT_2 = 'FAKE_EVENT_2';

describe('EventListenerUtils', () => {
  let eventListenerUtils: EventListenerUtils;
  let mockRenderer = new MockRenderer();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Renderer2, useValue: mockRenderer },
        EventListenerUtils,
      ],
    });

    const renderer = TestBed.inject(Renderer2);
    eventListenerUtils = TestBed.inject(EventListenerUtils);
    eventListenerUtils.initialize(renderer);
  });

  describe('detachEventListeners', () => {
    it('should detach only event handlers for named events', () => {
      mockRenderer.endListenCallback = jasmine.createSpy();
      const eventCallback = () => {};

      const listeners = () => eventListenerUtils['listeners'];
      expect(listeners.length).toEqual(0);

      eventListenerUtils.attachEventListener(
        document,
        FAKE_EVENT_1,
        eventCallback
      );

      expect(listeners().length).toEqual(1);
      expect(listeners()[0].eventName).toEqual(FAKE_EVENT_1);
      expect(listeners()[0].nativeElement).toBe(document);
      expect(
        listeners()[0].endListener === mockRenderer.endListenCallback
      ).toEqual(true);
      expect(mockRenderer.endListenCallback).toHaveBeenCalledTimes(0);

      eventListenerUtils.detachEventListeners(document, FAKE_EVENT_2);
      expect(listeners().length).toEqual(1);
      expect(listeners()[0].eventName).toEqual(FAKE_EVENT_1);
      expect(listeners()[0].nativeElement).toBe(document);
      expect(
        listeners()[0].endListener === mockRenderer.endListenCallback
      ).toEqual(true);
      expect(mockRenderer.endListenCallback).toHaveBeenCalledTimes(0);
    });
  });

  describe('detachAllEventListeners', () => {
    it('should detach event handlers for all events', () => {
      mockRenderer.endListenCallback = jasmine.createSpy();
      const eventCallback1 = () => {};
      const eventCallback2 = () => {};

      const listeners = () => eventListenerUtils['listeners'];
      expect(listeners.length).toEqual(0);

      eventListenerUtils.attachEventListener(
        document,
        FAKE_EVENT_1,
        eventCallback1
      );

      expect(listeners().length).toEqual(1);
      expect(listeners()[0].eventName).toEqual(FAKE_EVENT_1);
      expect(listeners()[0].nativeElement).toBe(document);
      expect(
        listeners()[0].endListener === mockRenderer.endListenCallback
      ).toEqual(true);

      eventListenerUtils.attachEventListener(
        document,
        FAKE_EVENT_2,
        eventCallback2
      );

      expect(listeners().length).toEqual(2);
      expect(listeners()[0].eventName).toEqual(FAKE_EVENT_1);
      expect(listeners()[0].nativeElement).toBe(document);
      expect(
        listeners()[0].endListener === mockRenderer.endListenCallback
      ).toEqual(true);
      expect(listeners()[1].eventName).toEqual(FAKE_EVENT_2);
      expect(listeners()[1].nativeElement).toBe(document);
      expect(
        listeners()[1].endListener === mockRenderer.endListenCallback
      ).toEqual(true);

      eventListenerUtils.detachAllEventListeners(document);
      expect(listeners().length).toEqual(0);
      expect(mockRenderer.endListenCallback).toHaveBeenCalledTimes(2);
    });
  });
});
