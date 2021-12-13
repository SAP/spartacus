import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Renderer2,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LanguageService, TranslationService } from '@spartacus/core';
import { EventListenerUtils } from '@spartacus/epd-visualization/root';
import { Observable, of } from 'rxjs';
import { DirectionMode } from '../../../../../../projects/storefrontlib/layout/direction/config/direction.model';
import { DirectionService } from '../../../../../../projects/storefrontlib/layout/direction/direction.service';
import { VisualViewerAnimationSliderService } from './visual-viewer-animation-slider.service';

class MockRenderer2 {}

class MockElementRef {}

class MockTranslationService {}

class MockChangeDetectorRef {
  markForCheck(): void {}
  detach(): void {}
  detectChanges(): void {}
  checkNoChanges(): void {}
  reattach(): void {}
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en');
  }
}

class MockDirectionService {
  getDirection(_languageCode: string): DirectionMode {
    return DirectionMode.LTR;
  }
}

class MockTouchList {
  constructor(public touches: Touch[]) {}

  get length(): number {
    return this.touches.length;
  }
  item(index: number): Touch | null {
    return this.touches[index];
  }

  asTouchList() {
    return this as any as TouchList;
  }
}

describe('VisualViewerAnimationSliderService', () => {
  let visualViewerAnimationSliderService: VisualViewerAnimationSliderService;
  let mockRenderer2: MockRenderer2;
  let mockElementRef: MockElementRef;
  let mockTranslationService: MockTranslationService;
  let mockLanguageService: MockLanguageService;
  let mockDirectionService: MockDirectionService;
  let mockChangeDetectorRef = new MockChangeDetectorRef();
  let applyValue: (value: number) => void;

  let clampToRange: (value: number) => number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Renderer2,
          useValue: mockRenderer2,
        },
        {
          provide: ElementRef,
          useValue: mockElementRef,
        },
        {
          provide: TranslationService,
          useValue: mockTranslationService,
        },
        {
          provide: LanguageService,
          useValue: mockLanguageService,
        },
        {
          provide: DirectionService,
          useValue: mockDirectionService,
        },
        {
          provide: ChangeDetectorRef,
          useValue: mockChangeDetectorRef,
        },
      ],
    });

    visualViewerAnimationSliderService = TestBed.inject(
      VisualViewerAnimationSliderService
    );

    applyValue = (
      visualViewerAnimationSliderService['applyValue'] as (
        value: number
      ) => void
    ).bind(visualViewerAnimationSliderService);

    clampToRange = (
      visualViewerAnimationSliderService['clampToRange'] as (
        value: number
      ) => number
    ).bind(visualViewerAnimationSliderService);
  });

  describe('initialize', () => {
    it('should update event bindings, setup resize observer and set initialized property', () => {
      const updateEventBindingsSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'updateEventBindings'
      );

      const setupResizeObserverSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'setupResizeObserver'
      );

      const setInitializedSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'setInitialized'
      );

      visualViewerAnimationSliderService.initialize();

      expect(updateEventBindingsSpy).toHaveBeenCalledTimes(1);
      expect(setupResizeObserverSpy).toHaveBeenCalledTimes(1);
      expect(setInitializedSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('setInitialized', () => {
    it('should set private field value and emit initializedChange event', () => {
      const initializedChange = visualViewerAnimationSliderService[
        'initializedChange'
      ] as EventEmitter<boolean>;
      const initializedChangeEmitSpy = spyOn(initializedChange, 'emit');
      const initializedChangeCompleteSpy = spyOn(initializedChange, 'complete');

      expect(visualViewerAnimationSliderService.initialized).toEqual(false);

      visualViewerAnimationSliderService['setInitialized']();

      expect(visualViewerAnimationSliderService.initialized).toEqual(true);
      expect(initializedChangeEmitSpy).toHaveBeenCalledTimes(1);
      expect(initializedChangeCompleteSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('input', () => {
    it('should not do anything when value (after clamping) has not changed', () => {
      expect(visualViewerAnimationSliderService.value).toEqual(0);

      const valueChangeEmitSpy = spyOn(
        visualViewerAnimationSliderService.valueChange,
        'emit'
      );

      visualViewerAnimationSliderService.value = 0;
      expect(visualViewerAnimationSliderService.value).toEqual(0);

      visualViewerAnimationSliderService.value = -1;
      expect(visualViewerAnimationSliderService.value).toEqual(0);

      expect(valueChangeEmitSpy).toHaveBeenCalledTimes(0);
    });

    it('should emit valueChange when value has changed', () => {
      expect(visualViewerAnimationSliderService.value).toEqual(0);
      const valueChangeEmitSpy = spyOn(
        visualViewerAnimationSliderService.valueChange,
        'emit'
      );

      visualViewerAnimationSliderService.value = 0.5;
      expect(visualViewerAnimationSliderService.value).toEqual(0.5);

      visualViewerAnimationSliderService.value = 0.6;
      expect(visualViewerAnimationSliderService.value).toEqual(0.6);

      expect(valueChangeEmitSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('disabled', () => {
    it('should not do anything when value has not changed', () => {
      expect(visualViewerAnimationSliderService.disabled).toEqual(false);
      const updateEventBindingsSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'updateEventBindings'
      );
      visualViewerAnimationSliderService.disabled = false;
      expect(visualViewerAnimationSliderService.disabled).toEqual(false);

      expect(updateEventBindingsSpy).toHaveBeenCalledTimes(0);
    });

    it('should update event bindings when value has changed', () => {
      expect(visualViewerAnimationSliderService.disabled).toEqual(false);
      const updateEventBindingsSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'updateEventBindings'
      );
      visualViewerAnimationSliderService.disabled = true;
      expect(visualViewerAnimationSliderService.disabled).toEqual(true);

      visualViewerAnimationSliderService.disabled = false;
      expect(visualViewerAnimationSliderService.disabled).toEqual(false);

      expect(updateEventBindingsSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('getClientWidth', () => {
    it('should return the width of the client bounding rectangle of the element', () => {
      const leftValue = 240;
      const rightValue = 250;
      const width = rightValue - leftValue;
      const mockElementRef = {
        nativeElement: {
          getBoundingClientRect: () => {
            return { left: leftValue, right: rightValue };
          },
        },
      };

      const getClientWidth = visualViewerAnimationSliderService[
        'getClientWidth'
      ].bind(visualViewerAnimationSliderService);

      const result = getClientWidth(mockElementRef);
      expect(result).toEqual(width);
    });
  });

  describe('setupResizeObserver', () => {
    it('should do nothing if resize observers not supported', () => {
      const resizeObserverConstructorSpy = spyOn(window, 'ResizeObserver');

      spyOn<any>(
        visualViewerAnimationSliderService,
        'resizeObserverSupported'
      ).and.returnValue(false);

      visualViewerAnimationSliderService['setupResizeObserver']();

      expect(resizeObserverConstructorSpy).toHaveBeenCalledTimes(0);
    });

    it('should construct resize observer and observe size changes to element if resize observers supported', () => {
      const mockResizeObserver = {
        observe: (_nativeElement: any) => {},
      };
      const mockElementRef = {
        nativeElement: {},
      };
      spyOn<any>(
        visualViewerAnimationSliderService,
        'resizeObserverSupported'
      ).and.returnValue(true);

      const resizeObserverConstructorSpy = spyOn<any>(
        window,
        'ResizeObserver'
      ).and.returnValue(mockResizeObserver);
      const setResizeObserverPropertySpy = spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'resizeObserver'
      ).and.callThrough();

      visualViewerAnimationSliderService['elementRef'] = mockElementRef;

      const resizeObserverObserveSpy = spyOn(mockResizeObserver, 'observe');

      visualViewerAnimationSliderService['setupResizeObserver']();

      expect(resizeObserverConstructorSpy).toHaveBeenCalledTimes(1);
      expect(setResizeObserverPropertySpy).toHaveBeenCalledTimes(1);
      expect(resizeObserverObserveSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onResize', () => {
    it('should trigger change detection', () => {
      const detectChangesSpy = spyOn<any>(
        mockChangeDetectorRef,
        'detectChanges'
      );

      visualViewerAnimationSliderService['onResize']();

      expect(detectChangesSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('updateEventBindings', () => {
    it('should detach all event listeners from document, bar and handle when disabled', () => {
      expect(visualViewerAnimationSliderService.disabled).toEqual(false);

      const eventListenerUtils: EventListenerUtils =
        visualViewerAnimationSliderService['eventListenerUtils'];

      const mockBarElementRef = {
        nativeElement: 'bar',
      };
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'barElement',
        'get'
      ).and.returnValue(mockBarElementRef);

      const mockHandleElementRef = {
        nativeElement: 'handle',
      };
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'handleElement',
        'get'
      ).and.returnValue(mockHandleElementRef);

      const detachAllEventListenersSpy = spyOn(
        eventListenerUtils,
        'detachAllEventListeners'
      );
      visualViewerAnimationSliderService.disabled = true;

      expect(detachAllEventListenersSpy).toHaveBeenCalledTimes(3);
      expect(detachAllEventListenersSpy).toHaveBeenCalledWith(document);
      expect(detachAllEventListenersSpy).toHaveBeenCalledWith(
        mockBarElementRef.nativeElement
      );
      expect(detachAllEventListenersSpy).toHaveBeenCalledWith(
        mockHandleElementRef.nativeElement
      );
    });

    it('should attach mousedown and touchstart event listeners on bar and mousedown, touchstart and focus event listeners on handle when enabled', () => {
      const eventListenerUtils: EventListenerUtils =
        visualViewerAnimationSliderService['eventListenerUtils'];

      visualViewerAnimationSliderService['_disabled'] = true;

      const mockHandleElementRef = {
        nativeElement: 'handle',
      };
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'handleElement',
        'get'
      ).and.returnValue(mockHandleElementRef);

      const mockBarElementRef = {
        nativeElement: 'bar',
      };
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'barElement',
        'get'
      ).and.returnValue(mockBarElementRef);

      const attachEventListenerSpy = spyOn(
        eventListenerUtils,
        'attachEventListener'
      );

      visualViewerAnimationSliderService.disabled = false;

      expect(attachEventListenerSpy).toHaveBeenCalledTimes(5);
      expect(attachEventListenerSpy).toHaveBeenCalledWith(
        mockHandleElementRef.nativeElement,
        'mousedown',
        jasmine.any(Function)
      );
      expect(attachEventListenerSpy).toHaveBeenCalledWith(
        mockBarElementRef.nativeElement,
        'mousedown',
        jasmine.any(Function)
      );
      expect(attachEventListenerSpy).toHaveBeenCalledWith(
        mockHandleElementRef.nativeElement,
        'touchstart',
        jasmine.any(Function)
      );
      expect(attachEventListenerSpy).toHaveBeenCalledWith(
        mockBarElementRef.nativeElement,
        'touchstart',
        jasmine.any(Function)
      );
      expect(attachEventListenerSpy).toHaveBeenCalledWith(
        mockHandleElementRef.nativeElement,
        'focus',
        jasmine.any(Function)
      );
    });
  });

  describe('valueToPosition', () => {
    it('should clamp to range and interpolate position, inverting for right to left', () => {
      const valueToPosition = visualViewerAnimationSliderService[
        'valueToPosition'
      ].bind(visualViewerAnimationSliderService) as (value: number) => number;

      const handleMaxPosition = 50;
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'handleMaxPosition'
      ).and.returnValue(handleMaxPosition);
      const rightToLeftSpy = spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'rightToLeft'
      ).and.returnValue(false);

      expect(valueToPosition(0)).toEqual(0);
      expect(valueToPosition(0.5)).toEqual(handleMaxPosition / 2);
      expect(valueToPosition(1)).toEqual(handleMaxPosition);

      expect(valueToPosition(-1)).toEqual(0);
      expect(valueToPosition(1.05)).toEqual(handleMaxPosition);

      rightToLeftSpy.and.returnValue(true);

      expect(valueToPosition(0)).toEqual(handleMaxPosition);
      expect(valueToPosition(0.5)).toEqual(handleMaxPosition / 2);
      expect(valueToPosition(1)).toEqual(0);

      expect(valueToPosition(-1)).toEqual(handleMaxPosition);
      expect(valueToPosition(1.05)).toEqual(0);
    });
  });

  describe('positionToValue', () => {
    it('should produce inverse of valueToPosition calculation (excluding out of range values)', () => {
      const valueToPosition = visualViewerAnimationSliderService[
        'valueToPosition'
      ].bind(visualViewerAnimationSliderService) as (value: number) => number;

      const positionToValue = visualViewerAnimationSliderService[
        'positionToValue'
      ].bind(visualViewerAnimationSliderService) as (
        position: number
      ) => number;

      const handleMaxPosition = 50;
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'handleMaxPosition'
      ).and.returnValue(handleMaxPosition);
      const rightToLeftSpy = spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'rightToLeft'
      ).and.returnValue(false);

      expect(positionToValue(valueToPosition(0))).toEqual(0);
      expect(positionToValue(valueToPosition(0.5))).toEqual(0.5);
      expect(positionToValue(valueToPosition(1))).toEqual(1);

      rightToLeftSpy.and.returnValue(true);

      expect(positionToValue(valueToPosition(0))).toEqual(0);
      expect(positionToValue(valueToPosition(0.5))).toEqual(0.5);
      expect(positionToValue(valueToPosition(1))).toEqual(1);
    });
  });

  describe('findTouch', () => {
    it('should return undefined when touch not found', () => {
      const touchList = new MockTouchList([]).asTouchList();
      const returnValue: Touch | undefined = visualViewerAnimationSliderService[
        'findTouch'
      ](touchList, 123);
      expect(returnValue).toBeUndefined();
    });

    it('should return touch when found', () => {
      const touch1 = <Touch>{
        identifier: 1,
      };
      const touch2 = <Touch>{
        identifier: 2,
      };
      const touch3 = <Touch>{
        identifier: 3,
      };

      const touchList = new MockTouchList([
        touch1,
        touch2,
        touch3,
      ]).asTouchList();

      const returnValue: Touch | undefined = visualViewerAnimationSliderService[
        'findTouch'
      ](touchList, 2);
      expect(returnValue).toBe(touch2);
    });
  });

  describe('sliderClientPosition', () => {
    it('should return the left value of the client bounding rectangle of the element', () => {
      const leftValue = 240;

      const clientRect = <ClientRect>{ left: leftValue };
      const mockElementRef = {
        nativeElement: {
          getBoundingClientRect: () => clientRect,
        },
      };

      visualViewerAnimationSliderService['elementRef'] = mockElementRef;

      const sliderClientPosition =
        visualViewerAnimationSliderService['sliderClientPosition'];

      const result = sliderClientPosition;
      expect(result).toEqual(leftValue);
    });
  });

  describe('onTouchStart', () => {
    it('should store touchIdentifier when new gesture started', () => {
      const eventListenerUtils = visualViewerAnimationSliderService[
        'eventListenerUtils'
      ] as EventListenerUtils;

      const onTouchStart = visualViewerAnimationSliderService[
        'onTouchStart'
      ].bind(visualViewerAnimationSliderService) as (event: TouchEvent) => void;

      const detachEventListenersSpy = spyOn(
        eventListenerUtils,
        'detachEventListeners'
      );
      const attachEventListenerSpy = spyOn(
        eventListenerUtils,
        'attachEventListener'
      );
      const touchEventWithChangedTouches = <TouchEvent>(<any>{
        stopPropagation: () => {},
        preventDefault: () => {},
        changedTouches: [
          <Touch>{
            identifier: 789,
          },
        ],
      });

      const stopPropagationSpy = spyOn(
        touchEventWithChangedTouches,
        'stopPropagation'
      );
      const preventDefault = spyOn(
        touchEventWithChangedTouches,
        'preventDefault'
      );

      onTouchStart(touchEventWithChangedTouches);

      expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
      expect(preventDefault).toHaveBeenCalledTimes(1);

      expect(detachEventListenersSpy).toHaveBeenCalledTimes(2);
      expect(attachEventListenerSpy).toHaveBeenCalledTimes(2);
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        jasmine.any(Object),
        'touchmove'
      );
      expect(attachEventListenerSpy).toHaveBeenCalledWith(
        jasmine.any(Object),
        'touchmove',
        jasmine.any(Function)
      );
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        jasmine.any(Object),
        'touchend'
      );
      expect(attachEventListenerSpy).toHaveBeenCalledWith(
        jasmine.any(Object),
        'touchend',
        jasmine.any(Function)
      );

      expect(visualViewerAnimationSliderService['touchIdentifier']).toBe(
        touchEventWithChangedTouches.changedTouches[0].identifier
      );
    });

    it('should not detach event listeners when new touch point added when gesture in progress', () => {
      const eventListenerUtils = visualViewerAnimationSliderService[
        'eventListenerUtils'
      ] as EventListenerUtils;

      const onTouchStart = visualViewerAnimationSliderService[
        'onTouchStart'
      ].bind(visualViewerAnimationSliderService) as (event: TouchEvent) => void;

      const detachEventListenersSpy = spyOn(
        eventListenerUtils,
        'detachEventListeners'
      );
      const attachEventListenerSpy = spyOn(
        eventListenerUtils,
        'attachEventListener'
      );

      const oldTouch = <Touch>{
        identifier: 789,
      };
      const newTouch = <Touch>{
        identifier: 780,
      };

      const touchEventWithAdditionalTouch = <TouchEvent>(<any>{
        stopPropagation: () => {},
        preventDefault: () => {},
        touches: new MockTouchList([oldTouch, newTouch]).asTouchList(),
        changedTouches: new MockTouchList([newTouch]).asTouchList(),
      });

      const stopPropagationSpy = spyOn(
        touchEventWithAdditionalTouch,
        'stopPropagation'
      );
      const preventDefault = spyOn(
        touchEventWithAdditionalTouch,
        'preventDefault'
      );

      // When a previous touch on the bar or handle has been initiated, the touchIdentifier property will have been set.
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'touchIdentifier',
        'get'
      ).and.returnValue(oldTouch.identifier);

      const setTouchIdentifierPropertySpy = spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'touchIdentifier',
        'set'
      );

      onTouchStart(touchEventWithAdditionalTouch);

      expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
      expect(preventDefault).toHaveBeenCalledTimes(1);

      expect(detachEventListenersSpy).toHaveBeenCalledTimes(0);
      expect(attachEventListenerSpy).toHaveBeenCalledTimes(0);

      expect(setTouchIdentifierPropertySpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('onTouchStartOnBar', () => {
    it('should call onTouchStart and then call on onTouchMove to bring slider to tapped point', () => {
      const onTouchStartOnBar = visualViewerAnimationSliderService[
        'onTouchStartOnBar'
      ].bind(visualViewerAnimationSliderService) as (event: TouchEvent) => void;

      const onTouchMoveSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'onTouchMove'
      );

      const touchEventWithoutChangedTouches = <TouchEvent>(<any>{
        stopPropagation: () => {},
        preventDefault: () => {},
      });

      const onTouchStartSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'onTouchStart'
      );

      onTouchStartOnBar(touchEventWithoutChangedTouches);

      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
      expect(onTouchStartSpy).toHaveBeenCalledWith(
        touchEventWithoutChangedTouches
      );

      expect(onTouchMoveSpy).toHaveBeenCalledTimes(1);
      expect(onTouchMoveSpy).toHaveBeenCalledWith(
        touchEventWithoutChangedTouches
      );
    });
  });

  describe('onMouseDown', () => {
    it('should not simulate mousemove when triggerMove is false', () => {
      const eventListenerUtils = visualViewerAnimationSliderService[
        'eventListenerUtils'
      ] as EventListenerUtils;

      const onMouseDown = visualViewerAnimationSliderService[
        'onMouseDown'
      ].bind(visualViewerAnimationSliderService) as (event: MouseEvent) => void;

      const detachEventListenersSpy = spyOn(
        eventListenerUtils,
        'detachEventListeners'
      );
      const attachEventListenerSpy = spyOn(
        eventListenerUtils,
        'attachEventListener'
      );
      const onTouchMoveSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'onMouseMove'
      );

      const mouseEvent = <MouseEvent>(<any>{
        stopPropagation: () => {},
        preventDefault: () => {},
      });

      const stopPropagationSpy = spyOn(mouseEvent, 'stopPropagation');
      const preventDefault = spyOn(mouseEvent, 'preventDefault');

      onMouseDown(mouseEvent);

      expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
      expect(preventDefault).toHaveBeenCalledTimes(1);

      expect(detachEventListenersSpy).toHaveBeenCalledTimes(2);
      expect(attachEventListenerSpy).toHaveBeenCalledTimes(2);
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        jasmine.any(Object),
        'mousemove'
      );
      expect(attachEventListenerSpy).toHaveBeenCalledWith(
        jasmine.any(Object),
        'mousemove',
        jasmine.any(Function)
      );
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        jasmine.any(Object),
        'mouseup'
      );
      expect(attachEventListenerSpy).toHaveBeenCalledWith(
        jasmine.any(Object),
        'mouseup',
        jasmine.any(Function)
      );

      expect(onTouchMoveSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('onMouseDownOnBar', () => {
    it('should simulate mousemove when triggerMove is true', () => {
      const onMouseDownOnBar = visualViewerAnimationSliderService[
        'onMouseDownOnBar'
      ].bind(visualViewerAnimationSliderService) as (event: MouseEvent) => void;

      const onMouseDownSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'onMouseDown'
      );
      const onMouseMoveSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'onMouseMove'
      );

      const mouseEvent = <MouseEvent>(<any>{
        stopPropagation: () => {},
        preventDefault: () => {},
      });

      onMouseDownOnBar(mouseEvent);

      expect(onMouseDownSpy).toHaveBeenCalledTimes(1);
      expect(onMouseDownSpy).toHaveBeenCalledWith(mouseEvent);

      expect(onMouseMoveSpy).toHaveBeenCalledTimes(1);
      expect(onMouseMoveSpy).toHaveBeenCalledWith(mouseEvent);
    });
  });

  describe('onMouseUp', () => {
    it('should detach mousemove and mouseup event listeners', () => {
      const eventListenerUtils: EventListenerUtils =
        visualViewerAnimationSliderService['eventListenerUtils'];

      const detachEventListenersSpy = spyOn(
        eventListenerUtils,
        'detachEventListeners'
      );

      const onMouseUp = visualViewerAnimationSliderService['onMouseUp'].bind(
        visualViewerAnimationSliderService
      ) as (event: MouseEvent) => void;

      const mouseEvent = <MouseEvent>{};

      onMouseUp(mouseEvent);

      expect(detachEventListenersSpy).toHaveBeenCalledTimes(2);
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        document,
        'mousemove'
      );
      expect(detachEventListenersSpy).toHaveBeenCalledWith(document, 'mouseup');
    });
  });

  describe('onMouseMove', () => {
    it('should calculate and apply position', () => {
      const onMouseMove = visualViewerAnimationSliderService[
        'onMouseMove'
      ].bind(visualViewerAnimationSliderService) as (event: MouseEvent) => void;

      const mouseEvent = <MouseEvent>{
        clientX: 430,
      };

      const sliderClientPosition = 400;
      const handleWidth = 10;

      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'sliderClientPosition'
      ).and.returnValue(sliderClientPosition);

      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'handleWidth'
      ).and.returnValue(handleWidth);

      const expectedPosition =
        mouseEvent.clientX - sliderClientPosition - handleWidth / 2;
      expect(expectedPosition).toEqual(25);

      const expectedValue = 0.25; // assume a handleMaxPosition of 100
      spyOn<any>(
        visualViewerAnimationSliderService,
        'positionToValue'
      ).and.returnValue(expectedValue);

      const applyValueSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'applyValue'
      );

      onMouseMove(mouseEvent);

      expect(applyValueSpy).toHaveBeenCalledTimes(1);
      expect(applyValueSpy).toHaveBeenCalledWith(expectedValue);
    });
  });

  describe('onTouchMove', () => {
    it('should not do anything when touch gesture not initiated on slider bar or handle', () => {
      const touchIdentifier = undefined;
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'touchIdentifier'
      ).and.returnValue(touchIdentifier);

      const onTouchMove = visualViewerAnimationSliderService[
        'onTouchMove'
      ].bind(visualViewerAnimationSliderService) as (event: TouchEvent) => void;

      const applyValueSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'applyValue'
      );

      const touch = <Touch>{
        identifier: 222,
      };
      const touchList = new MockTouchList([touch]).asTouchList();
      const touchEvent = <TouchEvent>{
        touches: touchList,
        changedTouches: touchList,
      };

      onTouchMove(touchEvent);

      expect(applyValueSpy).toHaveBeenCalledTimes(0);
    });

    it('should not do anything when no touch point matches one initiated on slider bar or handle', () => {
      const touchIdentifier = 888;
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'touchIdentifier'
      ).and.returnValue(touchIdentifier);

      const onTouchMove = visualViewerAnimationSliderService[
        'onTouchMove'
      ].bind(visualViewerAnimationSliderService) as (event: TouchEvent) => void;

      const applyValueSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'applyValue'
      );

      const touch = <Touch>{
        identifier: 222,
      };
      const touchList = new MockTouchList([touch]).asTouchList();
      const touchEvent = <TouchEvent>{
        touches: touchList,
        changedTouches: touchList,
      };

      onTouchMove(touchEvent);

      expect(applyValueSpy).toHaveBeenCalledTimes(0);
    });

    it('should calculate and apply position when gesture initiated on slider bar or handle', () => {
      const touchIdentifier = 222;
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'touchIdentifier'
      ).and.returnValue(touchIdentifier);

      const onTouchMove = visualViewerAnimationSliderService[
        'onTouchMove'
      ].bind(visualViewerAnimationSliderService) as (event: TouchEvent) => void;

      const touchClientX = 430;
      const touch = <Touch>{
        identifier: touchIdentifier,
        clientX: touchClientX,
      };
      const touchList = new MockTouchList([touch]).asTouchList();
      const touchEvent = <TouchEvent>{
        touches: touchList,
        changedTouches: touchList,
      };

      const sliderClientPosition = 400;
      const handleWidth = 10;

      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'sliderClientPosition'
      ).and.returnValue(sliderClientPosition);

      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'handleWidth'
      ).and.returnValue(handleWidth);

      const expectedPosition =
        touchClientX - sliderClientPosition - handleWidth / 2;
      expect(expectedPosition).toEqual(25);

      const expectedValue = 0.25; // assume a handleMaxPosition of 100
      spyOn<any>(
        visualViewerAnimationSliderService,
        'positionToValue'
      ).and.returnValue(expectedValue);

      const applyValueSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'applyValue'
      );

      onTouchMove(touchEvent);

      expect(applyValueSpy).toHaveBeenCalledTimes(1);
      expect(applyValueSpy).toHaveBeenCalledWith(expectedValue);
    });
  });

  describe('onTouchEnd', () => {
    it('should do nothing if gesture was not initiated on slider bar or handle', () => {
      const touchIdentifier = 222;
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'touchIdentifier'
      ).and.returnValue(touchIdentifier);

      const eventListenerUtils: EventListenerUtils =
        visualViewerAnimationSliderService['eventListenerUtils'];

      const detachEventListenersSpy = spyOn(
        eventListenerUtils,
        'detachEventListeners'
      );

      const onTouchEnd = visualViewerAnimationSliderService['onTouchEnd'].bind(
        visualViewerAnimationSliderService
      ) as (event: TouchEvent) => void;

      const touch = <Touch>{
        identifier: touchIdentifier + 2,
      };
      const touchList = new MockTouchList([touch]).asTouchList();
      const touchEvent = <TouchEvent>{
        touches: touchList,
        changedTouches: touchList,
      };

      onTouchEnd(touchEvent);

      expect(detachEventListenersSpy).toHaveBeenCalledTimes(0);
    });

    it('should detach touchmove and touchend event listeners if gesture was initiated on slider bar or handle', () => {
      const touchIdentifier = 222;
      spyOnProperty<any>(
        visualViewerAnimationSliderService,
        'touchIdentifier'
      ).and.returnValue(touchIdentifier);

      const eventListenerUtils: EventListenerUtils =
        visualViewerAnimationSliderService['eventListenerUtils'];

      const detachEventListenersSpy = spyOn(
        eventListenerUtils,
        'detachEventListeners'
      );

      const onTouchEnd = visualViewerAnimationSliderService['onTouchEnd'].bind(
        visualViewerAnimationSliderService
      ) as (event: TouchEvent) => void;

      const touch = <Touch>{
        identifier: touchIdentifier,
      };
      const touchList = new MockTouchList([touch]).asTouchList();
      const touchEvent = <TouchEvent>{
        touches: touchList,
        changedTouches: touchList,
      };

      onTouchEnd(touchEvent);

      expect(detachEventListenersSpy).toHaveBeenCalledTimes(2);
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        document,
        'touchmove'
      );
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        document,
        'touchend'
      );
    });
  });

  describe('onHandleFocus', () => {
    it('should attach blur and keydown event listeners', () => {
      const eventListenerUtils: EventListenerUtils =
        visualViewerAnimationSliderService['eventListenerUtils'];

      const attachEventListenersSpy = spyOn(
        eventListenerUtils,
        'attachEventListener'
      );

      const mockNativeElement = {};
      spyOnProperty(
        visualViewerAnimationSliderService,
        'handleElement',
        'get'
      ).and.returnValue({ nativeElement: mockNativeElement });

      const onHandleFocus = visualViewerAnimationSliderService[
        'onHandleFocus'
      ].bind(visualViewerAnimationSliderService) as () => void;

      onHandleFocus();

      expect(attachEventListenersSpy).toHaveBeenCalledTimes(2);
      expect(attachEventListenersSpy).toHaveBeenCalledWith(
        mockNativeElement,
        'blur',
        jasmine.any(Function)
      );
      expect(attachEventListenersSpy).toHaveBeenCalledWith(
        mockNativeElement,
        'keydown',
        jasmine.any(Function)
      );
    });
  });

  describe('onHandleBlur', () => {
    it('should detach blur, keydown and keyup event listeners', () => {
      const eventListenerUtils: EventListenerUtils =
        visualViewerAnimationSliderService['eventListenerUtils'];

      const detachEventListenersSpy = spyOn(
        eventListenerUtils,
        'detachEventListeners'
      );

      const mockNativeElement = {};
      spyOnProperty(
        visualViewerAnimationSliderService,
        'handleElement',
        'get'
      ).and.returnValue({ nativeElement: mockNativeElement });

      const onHandleBlur = visualViewerAnimationSliderService[
        'onHandleBlur'
      ].bind(visualViewerAnimationSliderService) as () => void;

      onHandleBlur();

      expect(detachEventListenersSpy).toHaveBeenCalledTimes(3);
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        mockNativeElement,
        'blur'
      );
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        mockNativeElement,
        'keydown'
      );
      expect(detachEventListenersSpy).toHaveBeenCalledWith(
        mockNativeElement,
        'keyup'
      );
    });
  });

  describe('onKeyboardEvent', () => {
    it('should not do anything if unhandled key pressed', () => {
      const applyValueSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'applyValue'
      );

      spyOn<any>(
        visualViewerAnimationSliderService,
        'getKeyHandler'
      ).and.returnValue(undefined);

      const onKeyboardEvent = visualViewerAnimationSliderService[
        'onKeyboardEvent'
      ].bind(visualViewerAnimationSliderService) as (
        event: KeyboardEvent
      ) => void;

      const event = <KeyboardEvent>{
        code: 'Backslash',
      };

      onKeyboardEvent(event);

      expect(applyValueSpy).toHaveBeenCalledTimes(0);
    });

    it('should prevent default action and apply modified value if handled key pressed', () => {
      const applyValueSpy = spyOn<any>(
        visualViewerAnimationSliderService,
        'applyValue'
      );
      const keyHandler = (value: number) => value + 0.02;
      spyOn<any>(
        visualViewerAnimationSliderService,
        'getKeyHandler'
      ).and.returnValue(keyHandler);

      const onKeyboardEvent = visualViewerAnimationSliderService[
        'onKeyboardEvent'
      ].bind(visualViewerAnimationSliderService) as (
        event: KeyboardEvent
      ) => void;

      const event = <KeyboardEvent>{
        code: 'ArrowRight',
        preventDefault: () => {},
      };

      const preventDefaultSpy = spyOn(event, 'preventDefault');

      onKeyboardEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      expect(applyValueSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getKeyHandler', () => {
    describe('ArrowUp', () => {
      it('should increment by stepDelta and clamp to range', () => {
        const getKeyHandler = visualViewerAnimationSliderService[
          'getKeyHandler'
        ].bind(visualViewerAnimationSliderService);
        const clampToRange = visualViewerAnimationSliderService[
          'clampToRange'
        ].bind(visualViewerAnimationSliderService);

        const stepDelta = visualViewerAnimationSliderService['stepDelta'];

        const arrowUpHandlerLtr = getKeyHandler('ArrowUp', false) as (
          value: number
        ) => number;
        expect(clampToRange(arrowUpHandlerLtr(0))).toEqual(stepDelta);
        expect(clampToRange(arrowUpHandlerLtr(0.5))).toEqual(0.5 + stepDelta);
        expect(clampToRange(arrowUpHandlerLtr(1))).toEqual(1);

        const arrowUpHandlerRtl = getKeyHandler('ArrowUp', true) as (
          value: number
        ) => number;
        expect(clampToRange(arrowUpHandlerRtl(0))).toEqual(stepDelta);
        expect(clampToRange(arrowUpHandlerRtl(0.5))).toEqual(0.5 + stepDelta);
        expect(clampToRange(arrowUpHandlerRtl(1))).toEqual(1);
      });
    });

    describe('ArrowDown', () => {
      it('should decrement by stepDelta and clamp to range', () => {
        const getKeyHandler = visualViewerAnimationSliderService[
          'getKeyHandler'
        ].bind(visualViewerAnimationSliderService);
        const clampToRange = visualViewerAnimationSliderService[
          'clampToRange'
        ].bind(visualViewerAnimationSliderService);

        const stepDelta = visualViewerAnimationSliderService['stepDelta'];

        const arrowDownHandlerLtr = getKeyHandler('ArrowDown', false) as (
          value: number
        ) => number;
        expect(clampToRange(arrowDownHandlerLtr(0))).toEqual(0);
        expect(clampToRange(arrowDownHandlerLtr(0.5))).toEqual(0.5 - stepDelta);
        expect(clampToRange(arrowDownHandlerLtr(1))).toEqual(1 - stepDelta);

        const arrowDownHandlerRtl = getKeyHandler('ArrowDown', true) as (
          value: number
        ) => number;
        expect(clampToRange(arrowDownHandlerRtl(0))).toEqual(0);
        expect(clampToRange(arrowDownHandlerRtl(0.5))).toEqual(0.5 - stepDelta);
        expect(clampToRange(arrowDownHandlerRtl(1))).toEqual(1 - stepDelta);
      });
    });

    describe('ArrowLeft', () => {
      it('should increment by step delta when in LTR mode/decrement by step delta when in RTL mode then clamp to range', () => {
        const getKeyHandler = visualViewerAnimationSliderService[
          'getKeyHandler'
        ].bind(visualViewerAnimationSliderService);
        const clampToRange = visualViewerAnimationSliderService[
          'clampToRange'
        ].bind(visualViewerAnimationSliderService);

        const stepDelta = visualViewerAnimationSliderService['stepDelta'];

        const arrowLeftHandlerLtr = getKeyHandler('ArrowLeft', false) as (
          value: number
        ) => number;

        expect(clampToRange(arrowLeftHandlerLtr(0))).toEqual(0);
        expect(clampToRange(arrowLeftHandlerLtr(0.5))).toEqual(0.5 - stepDelta);
        expect(clampToRange(arrowLeftHandlerLtr(1))).toEqual(1 - stepDelta);

        const arrowLeftHandlerRtl = getKeyHandler('ArrowLeft', true) as (
          value: number
        ) => number;

        expect(clampToRange(arrowLeftHandlerRtl(0))).toEqual(stepDelta);
        expect(clampToRange(arrowLeftHandlerRtl(0.5))).toEqual(0.5 + stepDelta);
        expect(clampToRange(arrowLeftHandlerRtl(1))).toEqual(1);
      });
    });

    describe('ArrowRight', () => {
      it('should decrement by step delta when in LTR mode/increment by step delta when in RTL mode then clamp to range', () => {
        const getKeyHandler = visualViewerAnimationSliderService[
          'getKeyHandler'
        ].bind(visualViewerAnimationSliderService);
        const clampToRange = visualViewerAnimationSliderService[
          'clampToRange'
        ].bind(visualViewerAnimationSliderService);

        const stepDelta = visualViewerAnimationSliderService['stepDelta'];

        const arrowRightHandlerLtr = getKeyHandler('ArrowRight', false) as (
          value: number
        ) => number;

        expect(clampToRange(arrowRightHandlerLtr(0))).toEqual(stepDelta);
        expect(clampToRange(arrowRightHandlerLtr(0.5))).toEqual(
          0.5 + stepDelta
        );
        expect(clampToRange(arrowRightHandlerLtr(1))).toEqual(1);

        const arrowRightHandlerRtl = getKeyHandler('ArrowRight', true) as (
          value: number
        ) => number;

        expect(clampToRange(arrowRightHandlerRtl(0))).toEqual(0);
        expect(clampToRange(arrowRightHandlerRtl(0.5))).toEqual(
          0.5 - stepDelta
        );
        expect(clampToRange(arrowRightHandlerRtl(1))).toEqual(1 - stepDelta);
      });
    });

    describe('PageUp', () => {
      it('should increment by page delta, then clamp to range', () => {
        const getKeyHandler = visualViewerAnimationSliderService[
          'getKeyHandler'
        ].bind(visualViewerAnimationSliderService);
        const clampToRange = visualViewerAnimationSliderService[
          'clampToRange'
        ].bind(visualViewerAnimationSliderService);

        const pageDelta = visualViewerAnimationSliderService['pageDelta'];

        const pageUpHandlerLtr = getKeyHandler('PageUp', false) as (
          value: number
        ) => number;
        expect(clampToRange(pageUpHandlerLtr(0))).toEqual(pageDelta);
        expect(clampToRange(pageUpHandlerLtr(0.5))).toEqual(0.5 + pageDelta);
        expect(clampToRange(pageUpHandlerLtr(1))).toEqual(1);

        const pageUpHandlerRtl = getKeyHandler('PageUp', true) as (
          value: number
        ) => number;
        expect(clampToRange(pageUpHandlerRtl(0))).toEqual(pageDelta);
        expect(clampToRange(pageUpHandlerRtl(0.5))).toEqual(0.5 + pageDelta);
        expect(clampToRange(pageUpHandlerRtl(1))).toEqual(1);
      });
    });

    describe('PageDown', () => {
      it('should decrement by page delta, then clamp to range', () => {
        const getKeyHandler = visualViewerAnimationSliderService[
          'getKeyHandler'
        ].bind(visualViewerAnimationSliderService);
        const clampToRange = visualViewerAnimationSliderService[
          'clampToRange'
        ].bind(visualViewerAnimationSliderService);

        const pageDelta = visualViewerAnimationSliderService['pageDelta'];

        const pageDownHandlerLtr = getKeyHandler('PageDown', false) as (
          value: number
        ) => number;
        expect(clampToRange(pageDownHandlerLtr(0))).toEqual(0);
        expect(clampToRange(pageDownHandlerLtr(0.5))).toEqual(0.5 - pageDelta);
        expect(clampToRange(pageDownHandlerLtr(1))).toEqual(1 - pageDelta);

        const pageDownHandlerRtl = getKeyHandler('PageDown', true) as (
          value: number
        ) => number;
        expect(clampToRange(pageDownHandlerRtl(0))).toEqual(0);
        expect(clampToRange(pageDownHandlerRtl(0.5))).toEqual(0.5 - pageDelta);
        expect(clampToRange(pageDownHandlerRtl(1))).toEqual(1 - pageDelta);
      });
    });

    describe('Home', () => {
      it('should jump to start of range (0)', () => {
        const getKeyHandler = visualViewerAnimationSliderService[
          'getKeyHandler'
        ].bind(visualViewerAnimationSliderService);

        const homeHandlerLtr = getKeyHandler('Home', false) as (
          value: number
        ) => number;
        expect(homeHandlerLtr(0)).toEqual(0);
        expect(homeHandlerLtr(0.5)).toEqual(0);
        expect(homeHandlerLtr(1)).toEqual(0);

        const homeHandlerRtl = getKeyHandler('Home', true) as (
          value: number
        ) => number;
        expect(homeHandlerRtl(0)).toEqual(0);
        expect(homeHandlerRtl(0.5)).toEqual(0);
        expect(homeHandlerRtl(1)).toEqual(0);
      });
    });

    describe('End', () => {
      it('should jump to end of range (1)', () => {
        const getKeyHandler = visualViewerAnimationSliderService[
          'getKeyHandler'
        ].bind(visualViewerAnimationSliderService);

        const endHandlerLtr = getKeyHandler('End', false) as (
          value: number
        ) => number;
        expect(endHandlerLtr(0)).toEqual(1);
        expect(endHandlerLtr(0.5)).toEqual(1);
        expect(endHandlerLtr(1)).toEqual(1);

        const endHandlerRtl = getKeyHandler('End', true) as (
          value: number
        ) => number;
        expect(endHandlerRtl(0)).toEqual(1);
        expect(endHandlerRtl(0.5)).toEqual(1);
        expect(endHandlerRtl(1)).toEqual(1);
      });
    });

    describe('Unhandled key', () => {
      it('should return undefined', () => {
        const getKeyHandler = visualViewerAnimationSliderService[
          'getKeyHandler'
        ].bind(visualViewerAnimationSliderService);

        expect(getKeyHandler('Backspace', false)).toBeUndefined();
        expect(getKeyHandler('Backspace', true)).toBeUndefined();
      });
    });
  });

  describe('applyValue', () => {
    it('should set value property if clamped value has changed', (done) => {
      expect(visualViewerAnimationSliderService.position).toEqual(0);

      spyOnProperty(
        visualViewerAnimationSliderService,
        'handleMaxPosition'
      ).and.returnValue(45);

      visualViewerAnimationSliderService.valueChange.subscribe((value) => {
        expect(value).toEqual(1);
        done();
      });

      applyValue(1.2);
    });

    it('should not do anything if clamped value has not changed', () => {
      expect(visualViewerAnimationSliderService.position).toEqual(0);

      const setValuePropertySpy = spyOnProperty(
        visualViewerAnimationSliderService,
        'value',
        'set'
      );

      applyValue(-1); // 0 after clamping

      expect(setValuePropertySpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('clampToRange', () => {
    it('should bring values below zero up to zero', () => {
      expect(clampToRange(-1)).toEqual(0);
    });
    it('should not modify number in range', () => {
      expect(clampToRange(0.2342342)).toEqual(0.2342342);
    });
    it('should bring values above 1 down to 1', () => {
      expect(clampToRange(1.01)).toEqual(1);
    });
  });
});
