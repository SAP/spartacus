import {
  HostListener,
  Input,
  ElementRef,
  Renderer2,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  Injectable,
} from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { supportsPassiveEvents } from 'detect-passive-events';
import { EventListener } from './events/event-listener';
import { EventListenerHelper } from './events/event-listener-helper';
import { SliderElementDirective } from './animation-slider-element.directive';
import { SliderHandleDirective } from './animation-slider-handle.directive';
import { TranslationService } from '@spartacus/core';

class ModelValues {
  constructor(public value: number) {}
  public static compare(x: ModelValues, y: ModelValues): boolean {
    return x.value === y.value;
  }
}

class ModelChange extends ModelValues {
  constructor(public value: number, public forceChange: boolean) {
    super(value);
  }
  public static compare(x: ModelChange, y: ModelChange): boolean {
    return x.value === y.value && x.forceChange === y.forceChange;
  }
}

class InputModelChange extends ModelChange {
  constructor(
    public value: number,
    public forceChange: boolean,
    public internalChange: boolean
  ) {
    super(value, forceChange);
  }
}

class OutputModelChange extends ModelChange {
  constructor(
    public value: number,
    public forceChange: boolean,
    public userEventInitiated: boolean
  ) {
    super(value, forceChange);
  }
}

@Injectable({
  providedIn: 'any',
})
export class AnimationSliderService {
  public constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private changeDetectionRef: ChangeDetectorRef,
    private translationService: TranslationService
  ) {
    this.eventListenerHelper = new EventListenerHelper(this.renderer);
  }

  // Model for slider value.
  @Input()
  set value(value: number) {
    if (this._value !== value) {
      this._value = value;
      this.inputModelChangeSubject.next({
        value: value,
        forceChange: false,
        internalChange: false,
      });
    }
  }
  get value() {
    return this._value;
  }
  private _value: number = 0;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  @Input() suppressValueChangeEvents = false;

  /** Minimum value of slider range.  */
  @Input() minValue: number = 0;

  /** Maximum value of slider range.  */
  @Input() maxValue: number = 1;

  /** Set to true to disable the slider. */
  @Input() set disabled(disabled: boolean) {
    if (this._disabled !== disabled) {
      this._disabled = disabled;
      this.sliderElementDisabledAttr = disabled ? 'disabled' : undefined;
    }
  }
  get disabled() {
    return this._disabled;
  }
  private _disabled: boolean = false;

  @Input() ariaLabel?: string = undefined;

  get rightToLeft(): boolean {
    return document.documentElement.dir === 'rtl';
  }

  private initHasRun = false;

  // Changes in model inputs are passed through this subject
  private inputModelChangeSubject = new Subject<InputModelChange>();
  private inputModelChangeSubscription?: Subscription = undefined;

  // Changes to model outputs are passed through this subject
  private outputModelChangeSubject: Subject<OutputModelChange> =
    new Subject<OutputModelChange>();
  private outputModelChangeSubscription?: Subscription = undefined;

  // View value synced to model value
  private viewValue: number = 0;

  // Half of the width or height of the slider handles
  private handleHalfDimension = 0;
  // Maximum position the slider handle can have
  private maxHandlePosition = 0;

  // Internal variable to keep track of the focus element
  private handleHasFocus = false;
  // Used to call onStart on the first keydown event
  private firstKeyDown = false;
  // Current touch id of touch event being handled
  private touchId?: number = undefined;

  // The slider bar
  barElement: SliderElementDirective;

  // The slider handle
  handleElement: SliderHandleDirective;

  public sliderElementDisabledAttr?: string = undefined;

  private eventListenerHelper: EventListenerHelper;
  private onMoveEventListener?: EventListener = undefined;
  private onEndEventListener?: EventListener = undefined;

  private resizeObserver?: ResizeObserver = undefined;
  private onTouchedCallback?: (value: any) => void = undefined;
  private onChangeCallback?: (value: any) => void = undefined;

  public initialize(): void {
    this.subscribeInputModelChangeSubject();
    this.subscribeOutputModelChangeSubject();
    this.renormalizeModelValues();
    this.viewValue = this.value;
    this.calculateViewDimensions();
    this.addAccessibility();
    this.initHandles();
    this.manageEventsBindings();
    this.subscribeResizeObserver();
    this.initHasRun = true;

    if (!this.isRefDestroyed()) {
      this.changeDetectionRef.detectChanges();
    }
  }

  public destroy(): void {
    this.unbindEvents();
    this.unsubscribeResizeObserver();
    this.unsubscribeInputModelChangeSubject();
    this.unsubscribeOutputModelChangeSubject();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.calculateViewDimensionsAndDetectChanges();
  }

  private subscribeInputModelChangeSubject(): void {
    this.inputModelChangeSubscription = this.inputModelChangeSubject
      .pipe(
        distinctUntilChanged((x, y) => ModelChange.compare(x, y)),
        filter(
          (modelChange: InputModelChange) =>
            !modelChange.forceChange && !modelChange.internalChange
        )
      )
      .subscribe((modelChange: InputModelChange) =>
        this.applyInputModelChange(modelChange)
      );
  }

  private subscribeOutputModelChangeSubject(): void {
    this.outputModelChangeSubscription = this.outputModelChangeSubject
      .pipe(distinctUntilChanged((x, y) => ModelChange.compare(x, y)))
      .subscribe((modelChange: OutputModelChange) =>
        this.publishOutputModelChange(modelChange)
      );
  }
  private isResizeObserverAvailable(): boolean {
    return (window as any).ResizeObserver !== undefined;
  }

  private subscribeResizeObserver(): void {
    if (this.isResizeObserverAvailable()) {
      this.resizeObserver = new ResizeObserver((): void =>
        this.calculateViewDimensionsAndDetectChanges()
      );
      this.resizeObserver.observe(this.elementRef.nativeElement);
    }
  }

  private unsubscribeResizeObserver(): void {
    if (this.isResizeObserverAvailable() && this.resizeObserver !== undefined) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }

  private unsubscribeOnMove(): void {
    if (this.onMoveEventListener !== undefined) {
      this.eventListenerHelper.detachEventListener(this.onMoveEventListener);
      this.onMoveEventListener = undefined;
    }
  }

  private unsubscribeOnEnd(): void {
    if (this.onEndEventListener !== undefined) {
      this.eventListenerHelper.detachEventListener(this.onEndEventListener);
      this.onEndEventListener = undefined;
    }
  }

  private unsubscribeInputModelChangeSubject(): void {
    if (this.inputModelChangeSubscription !== undefined) {
      this.inputModelChangeSubscription.unsubscribe();
      this.inputModelChangeSubscription = undefined;
    }
  }

  private unsubscribeOutputModelChangeSubject(): void {
    if (this.outputModelChangeSubscription !== undefined) {
      this.outputModelChangeSubscription.unsubscribe();
      this.outputModelChangeSubscription = undefined;
    }
  }

  private applyViewChange(): void {
    this.value = this.viewValue;

    this.outputModelChangeSubject.next({
      value: this.value,
      userEventInitiated: true,
      forceChange: false,
    });

    this.inputModelChangeSubject.next({
      value: this.value,
      forceChange: false,
      internalChange: true,
    });
  }

  private applyInputModelChange(modelChange: InputModelChange): void {
    const normalizedModelChange: ModelValues =
      this.normalizeModelValues(modelChange);

    const normalizationChange: boolean = !ModelValues.compare(
      modelChange,
      normalizedModelChange
    );

    if (normalizationChange) {
      this.value = normalizedModelChange.value;
    }
    this.viewValue = normalizedModelChange.value;

    this.updateHandle(this.valueToPosition(this.viewValue));
    this.updateAriaAttributes();

    this.outputModelChangeSubject.next({
      value: normalizedModelChange.value,
      forceChange: normalizationChange,
      userEventInitiated: false,
    });

    this.changeDetectionRef.detectChanges();
  }

  private publishOutputModelChange(modelChange: OutputModelChange): void {
    const emitOutputs: () => void = (): void => {
      this.valueChange.emit(modelChange.value);

      if (this.onChangeCallback !== undefined) {
        this.onChangeCallback(modelChange.value);
      }
      if (this.onTouchedCallback !== undefined) {
        this.onTouchedCallback(modelChange.value);
      }
    };

    emitOutputs();
    this.changeDetectionRef.detectChanges();
  }

  private normalizeModelValues(input: ModelValues): ModelValues {
    return new ModelValues(
      AnimationSliderService.clampToRange(
        input.value,
        this.minValue,
        this.maxValue
      )
    );
  }

  private renormalizeModelValues(): void {
    const previousModelValues: ModelValues = {
      value: this.value,
    };
    const normalizedModelValues: ModelValues =
      this.normalizeModelValues(previousModelValues);
    if (!ModelValues.compare(normalizedModelValues, previousModelValues)) {
      this.value = normalizedModelValues.value;

      this.outputModelChangeSubject.next({
        value: this.value,
        forceChange: true,
        userEventInitiated: false,
      });
    }
  }

  private manageEventsBindings(): void {
    if (this.disabled) {
      this.unbindEvents();
    } else {
      this.bindEvents();
    }
  }

  private getAllElements(): SliderElementDirective[] {
    return [this.barElement, this.handleElement];
  }

  private initHandles(): void {
    this.updateHandle(this.valueToPosition(this.viewValue));
  }

  private addAccessibility(): void {
    this.updateAriaAttributes();
    this.handleElement.role = 'slider';
    this.handleElement.tabindex = this.disabled ? '' : '0';
    this.handleElement.ariaOrientation = 'horizontal';

    if (this.ariaLabel !== undefined) {
      this.handleElement.ariaLabel = this.ariaLabel;
    }
  }

  private updateAriaAttributes(): void {
    this.handleElement.ariaValueNow = (+this.value).toString();
    this.handleElement.ariaValueText = (+this.value).toString();
    this.handleElement.ariaValueMin = this.minValue.toString();
    this.handleElement.ariaValueMax = this.maxValue.toString();
    if (this.ariaLabel) {
      this.handleElement.ariaLabel = this.ariaLabel;
    } else if (!this.handleElement.ariaLabel) {
      this.translationService
        .translate('viewer.visualViewer.toolbar.animationSlider.label')
        .subscribe(
          (translation) => (this.handleElement.ariaLabel = translation)
        );
    }
  }

  private calculateViewDimensions(): void {
    this.handleElement.calculateDimension();
    const handleWidth: number = this.handleElement.dimension;
    this.handleHalfDimension = handleWidth / 2;
    this.barElement.calculateDimension();
    this.maxHandlePosition = this.barElement.dimension - handleWidth;

    if (this.initHasRun) {
      this.initHandles();
    }
  }

  private calculateViewDimensionsAndDetectChanges(): void {
    this.calculateViewDimensions();
    if (!this.isRefDestroyed()) {
      this.changeDetectionRef.detectChanges();
    }
  }

  private isRefDestroyed(): boolean {
    return (
      this.changeDetectionRef === undefined ||
      (this.changeDetectionRef as any)['destroyed']
    );
  }

  private updateHandle(newPos: number): void {
    this.handleElement.setPosition(newPos);
  }

  private valueToPosition(val: number): number {
    let percent: number = AnimationSliderService.linearValueToPosition(
      AnimationSliderService.clampToRange(val, this.minValue, this.maxValue),
      this.minValue,
      this.maxValue
    );
    if (this.rightToLeft) {
      percent = 1 - percent;
    }
    return percent * this.maxHandlePosition;
  }

  private positionToValue(position: number): number {
    let percent: number = position / this.maxHandlePosition;
    if (this.rightToLeft) {
      percent = 1 - percent;
    }
    return AnimationSliderService.linearPositionToValue(
      percent,
      this.minValue,
      this.maxValue
    );
  }

  private getEventX(
    event: MouseEvent | TouchEvent,
    targetTouchId?: number
  ): number {
    if (event instanceof MouseEvent) {
      return event.clientX;
    }

    let touchIndex = 0;
    const touches: TouchList = event.touches;
    if (targetTouchId !== undefined) {
      for (let i = 0; i < touches.length; i++) {
        if (touches[i].identifier === targetTouchId) {
          touchIndex = i;
          break;
        }
      }
    }
    return touches[touchIndex].clientX;
  }

  private getEventPosition(
    event: MouseEvent | TouchEvent,
    targetTouchId?: number
  ): number {
    const sliderElementBoundingRect: ClientRect =
      this.elementRef.nativeElement.getBoundingClientRect();

    const sliderPos: number = sliderElementBoundingRect.left;
    let eventPos = this.getEventX(event, targetTouchId) - sliderPos;
    return eventPos - this.handleHalfDimension;
  }

  private bindEvents(): void {
    this.handleElement.on('mousedown', (event: MouseEvent): void =>
      this.onStart(event)
    );
    this.barElement.on('mousedown', (event: MouseEvent): void =>
      this.onStart(event, true)
    );
    this.handleElement.onPassive('touchstart', (event: TouchEvent): void =>
      this.onStart(event)
    );
    this.barElement.onPassive('touchstart', (event: TouchEvent): void =>
      this.onStart(event, true)
    );
    this.handleElement.on('focus', (): void => this.onPointerFocus());
  }

  private unbindEvents(): void {
    this.unsubscribeOnMove();
    this.unsubscribeOnEnd();

    for (const element of this.getAllElements()) {
      element.off();
    }
  }

  private isTouchEvent(event: any): boolean {
    if ((window as any).TouchEvent !== undefined) {
      return event instanceof TouchEvent;
    }
    return event.touches !== undefined;
  }

  private onStart(
    event: MouseEvent | TouchEvent,
    simulateImmediateMove?: boolean
  ): void {
    event.stopPropagation();
    if (!this.isTouchEvent(event) || !supportsPassiveEvents) {
      event.preventDefault();
    }

    this.calculateViewDimensions();
    this.handleHasFocus = true;

    const pointerElement: SliderHandleDirective = this.handleElement;
    pointerElement.active = true;
    pointerElement.focus();

    this.unsubscribeOnMove();

    const onMoveCallback: (e: MouseEvent | TouchEvent) => void = (
      e: MouseEvent | TouchEvent
    ): void => this.onMove(e);

    if (this.isTouchEvent(event)) {
      this.onMoveEventListener =
        this.eventListenerHelper.attachPassiveEventListener(
          document,
          'touchmove',
          onMoveCallback
        );
    } else {
      this.onMoveEventListener = this.eventListenerHelper.attachEventListener(
        document,
        'mousemove',
        onMoveCallback
      );
    }

    this.unsubscribeOnEnd();

    const onEndCallback: (e: MouseEvent | TouchEvent) => void = (
      e: MouseEvent | TouchEvent
    ): void => this.onEnd(e);

    if (this.isTouchEvent(event)) {
      this.onEndEventListener =
        this.eventListenerHelper.attachPassiveEventListener(
          document,
          'touchend',
          onEndCallback
        );
    } else {
      this.onEndEventListener = this.eventListenerHelper.attachEventListener(
        document,
        'mouseup',
        onEndCallback
      );
    }

    if (
      this.isTouchEvent(event) &&
      (event as TouchEvent).changedTouches !== undefined
    ) {
      if (this.touchId === undefined) {
        this.touchId = (event as TouchEvent).changedTouches[0].identifier;
      }
    }

    if (simulateImmediateMove) {
      this.onMove(event);
    }
  }

  private onMove(event: MouseEvent | TouchEvent): void {
    let touchForThisSlider: Touch | undefined;

    if (this.isTouchEvent(event)) {
      const changedTouches: TouchList = (event as TouchEvent).changedTouches;
      for (let i = 0; i < changedTouches.length; i++) {
        if (changedTouches[i].identifier === this.touchId) {
          touchForThisSlider = changedTouches[i];
          break;
        }
      }
      if (touchForThisSlider === undefined) {
        return;
      }
    }

    const newPos: number =
      touchForThisSlider !== undefined
        ? this.getEventPosition(event, touchForThisSlider.identifier)
        : this.getEventPosition(event);
    let newValue: number;
    if (newPos <= 0) {
      newValue = this.rightToLeft ? this.maxValue : this.minValue;
    } else if (newPos >= this.maxHandlePosition) {
      newValue = this.rightToLeft ? this.minValue : this.maxValue;
    } else {
      newValue = this.positionToValue(newPos);
    }
    this.positionTrackingHandle(newValue);
  }

  private onEnd(event: MouseEvent | TouchEvent): void {
    if (this.isTouchEvent(event)) {
      const changedTouches: TouchList = (event as TouchEvent).changedTouches;
      if (changedTouches[0].identifier !== this.touchId) {
        return;
      }
    }
    this.touchId = undefined;
    this.unsubscribeOnMove();
    this.unsubscribeOnEnd();
  }

  private onPointerFocus(): void {
    const pointerElement: SliderHandleDirective = this.handleElement;
    pointerElement.on('blur', (): void => this.onPointerBlur(pointerElement));
    pointerElement.on('keydown', (event: KeyboardEvent): void =>
      this.onKeyboardEvent(event)
    );
    pointerElement.on('keyup', (): void => this.onKeyUp());
    pointerElement.active = true;

    this.handleHasFocus = true;
    this.firstKeyDown = true;
  }

  private onKeyUp(): void {
    this.firstKeyDown = true;
  }

  private onPointerBlur(pointer: SliderHandleDirective): void {
    pointer.off('blur');
    pointer.off('keydown');
    pointer.off('keyup');
    pointer.active = false;
    if (this.touchId === undefined) {
      this.handleHasFocus = false;
    }
  }

  private getKeyActions(currentValue: number): { [key: string]: number } {
    const valueRange: number = this.maxValue - this.minValue;
    let increaseStep = currentValue + valueRange / 50;
    let decreaseStep = currentValue - valueRange / 50;
    let increasePage = currentValue + valueRange / 10;
    let decreasePage = currentValue - valueRange / 10;
    let stepLeft = this.rightToLeft ? increaseStep : decreaseStep;
    let stepRight = this.rightToLeft ? decreaseStep : increaseStep;

    const actions: { [key: string]: number } = {
      ArrowUp: increaseStep,
      ArrowDown: decreaseStep,
      ArrowLeft: stepLeft,
      ArrowRight: stepRight,
      PageUp: increasePage,
      PageDown: decreasePage,
      Home: this.minValue,
      End: this.maxValue,
    };

    return actions;
  }

  private onKeyboardEvent(event: KeyboardEvent): void {
    const currentValue: number = this.viewValue ?? 0;
    const actions: { [key: string]: number } = this.getKeyActions(currentValue);
    const key = event.code;
    const action: number = actions[key];

    if (action === undefined || !this.handleHasFocus) {
      return;
    }
    event.preventDefault();

    if (this.firstKeyDown) {
      this.firstKeyDown = false;
    }

    const actionValue: number = AnimationSliderService.clampToRange(
      action,
      this.minValue,
      this.maxValue
    );
    const newValue: number = actionValue;
    this.positionTrackingHandle(newValue);
  }

  private positionTrackingHandle(newValue: number): void {
    if (this.viewValue !== newValue) {
      this.viewValue = newValue;
      this.applyViewChange();
      this.updateHandle(this.valueToPosition(newValue));
      this.updateAriaAttributes();
    }
  }

  static clampToRange(
    value: number,
    minValue: number,
    maxValue: number
  ): number {
    return Math.min(Math.max(value, minValue), maxValue);
  }

  static linearValueToPosition(
    val: number,
    minVal: number,
    maxVal: number
  ): number {
    const range: number = maxVal - minVal;
    return (val - minVal) / range;
  }

  static linearPositionToValue(
    percent: number,
    minVal: number,
    maxVal: number
  ): number {
    return percent * (maxVal - minVal) + minVal;
  }
}
