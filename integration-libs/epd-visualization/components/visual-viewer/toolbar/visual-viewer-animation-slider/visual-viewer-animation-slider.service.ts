import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Injectable,
  Renderer2,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { EventListenerUtils } from '@spartacus/epd-visualization/root';

@Injectable({
  providedIn: 'any',
})
export class VisualViewerAnimationSliderService {
  public constructor(
    private elementRef: ElementRef,
    private windowRef: WindowRef,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.eventListenerUtils.initialize(this.renderer);
  }

  public initialize(): void {
    this.updateEventBindings();
    this.setupResizeObserver();
    this.setInitialized();
  }

  private setInitialized() {
    this._initialized = true;
    this.initializedChange.emit(true);
    this.initializedChange.complete();
  }
  public get initialized(): boolean {
    return this._initialized;
  }
  private _initialized = false;
  public initializedChange = new EventEmitter<boolean>();

  /**
   * Slider value. Value is in the range [0-1].
   */
  set value(value: number) {
    value = this.clampToRange(value);
    if (this._value === value) {
      return;
    }
    this._value = value;
    this.valueChange.emit(this.value);
  }
  get value() {
    return this._value;
  }
  private _value: number = 0;
  valueChange: EventEmitter<number> = new EventEmitter();

  set disabled(disabled: boolean) {
    if (this._disabled === disabled) {
      return;
    }
    this._disabled = disabled;
    this.updateEventBindings();
  }
  get disabled() {
    return this._disabled;
  }
  private _disabled: boolean = false;

  set hidden(hidden: boolean) {
    if (this._hidden === hidden) {
      return;
    }
    this._hidden = hidden;
    // Ensure handle position is recalculated when the animation slider visibility changes
    // Fixes a bug in which the initial position of the slider handle is incorrect
    // because the bar width is calculated while the animation slider is hidden (noticeable in RTL mode)
    this.changeDetectorRef.detectChanges();
  }
  get hidden(): boolean {
    return this._hidden;
  }
  private _hidden: boolean;

  get position(): number {
    return this.valueToPosition(this.value);
  }

  get rightToLeft(): boolean {
    return this.windowRef.document.documentElement.dir === 'rtl';
  }

  set barElement(barElement: ElementRef) {
    this._barElement = barElement;
  }
  get barElement(): ElementRef {
    return this._barElement;
  }
  _barElement: ElementRef;

  set handleElement(handleElement: ElementRef) {
    this._handleElement = handleElement;
  }
  get handleElement(): ElementRef {
    return this._handleElement;
  }
  _handleElement: ElementRef;

  private set resizeObserver(resizeObserver: ResizeObserver | undefined) {
    this._resizeObserver = resizeObserver;
  }
  private get resizeObserver() {
    return this._resizeObserver;
  }
  private _resizeObserver?: ResizeObserver = undefined;
  private eventListenerUtils = new EventListenerUtils();

  private set touchIdentifier(touchIdentifier: number | undefined) {
    this._touchIdentifier = touchIdentifier;
  }
  private get touchIdentifier(): number | undefined {
    return this._touchIdentifier;
  }
  private _touchIdentifier?: number = undefined;

  private getClientWidth(elementRef: ElementRef): number | undefined {
    if (!elementRef || !elementRef.nativeElement) {
      return undefined;
    }
    const clientRect = this.getClientRect(elementRef);
    return clientRect.right - clientRect.left;
  }

  private getClientRect(elementRef: ElementRef): DOMRect {
    return elementRef.nativeElement.getBoundingClientRect();
  }

  private resizeObserverSupported(): boolean {
    return window.ResizeObserver !== undefined;
  }

  private setupResizeObserver() {
    if (this.resizeObserverSupported()) {
      this.resizeObserver = new ResizeObserver(this.onResize.bind(this));
      this.resizeObserver.observe(this.elementRef.nativeElement);
    }
  }

  private onResize() {
    // Ensure handle position is recalculated on resize
    this.changeDetectorRef.detectChanges();
  }
  sizeChange = new EventEmitter();

  private updateEventBindings(): void {
    if (this.disabled) {
      this.eventListenerUtils.detachAllEventListeners(document);
      this.eventListenerUtils.detachAllEventListeners(
        this.barElement.nativeElement
      );
      this.eventListenerUtils.detachAllEventListeners(
        this.handleElement.nativeElement
      );
    } else {
      this.eventListenerUtils.attachEventListener(
        this.handleElement.nativeElement,
        'mousedown',
        this.onMouseDown.bind(this)
      );
      this.eventListenerUtils.attachEventListener(
        this.barElement.nativeElement,
        'mousedown',
        this.onMouseDownOnBar.bind(this)
      );
      this.eventListenerUtils.attachEventListener(
        this.handleElement.nativeElement,
        'touchstart',
        this.onTouchStart.bind(this)
      );
      this.eventListenerUtils.attachEventListener(
        this.barElement.nativeElement,
        'touchstart',
        this.onTouchStartOnBar.bind(this)
      );
      this.eventListenerUtils.attachEventListener(
        this.handleElement.nativeElement,
        'focus',
        this.onHandleFocus.bind(this)
      );
    }
  }

  get handleWidth(): number {
    return this.getClientWidth(this.handleElement) ?? 0;
  }

  get barWidth(): number {
    return this.getClientWidth(this.barElement) ?? 0;
  }

  get handleMaxPosition(): number {
    return this.barWidth - this.handleWidth;
  }

  private valueToPosition(value: number): number {
    let position: number = this.clampToRange(value);
    if (this.rightToLeft) {
      position = 1 - position;
    }
    return position * this.handleMaxPosition;
  }

  private positionToValue(position: number): number {
    let value: number = position / this.handleMaxPosition;
    if (this.rightToLeft) {
      value = 1 - value;
    }
    return value;
  }

  private findTouch(
    touchList: TouchList,
    touchIdentifier?: number
  ): Touch | undefined {
    for (let i = 0; i < touchList.length; i++) {
      const touch = touchList.item(i) as Touch;
      if (touch.identifier === touchIdentifier) {
        return touch;
      }
    }
    return undefined;
  }

  private get sliderClientPosition(): number {
    return this.getClientRect(this.elementRef).left;
  }

  private onTouchStart(event: TouchEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.touchIdentifier !== undefined) {
      return;
    }

    this.eventListenerUtils.detachEventListeners(document, 'touchmove');
    this.eventListenerUtils.attachEventListener(
      document,
      'touchmove',
      this.onTouchMove.bind(this)
    );

    this.eventListenerUtils.detachEventListeners(document, 'touchend');
    this.eventListenerUtils.attachEventListener(
      document,
      'touchend',
      this.onTouchEnd.bind(this)
    );

    this.touchIdentifier = (event.changedTouches as TouchList)[0].identifier;
  }

  private onTouchStartOnBar(event: TouchEvent): void {
    this.onTouchStart(event);
    this.onTouchMove(event);
  }

  private onMouseDown(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.eventListenerUtils.detachEventListeners(document, 'mousemove');
    this.eventListenerUtils.attachEventListener(
      document,
      'mousemove',
      this.onMouseMove.bind(this)
    );

    this.eventListenerUtils.detachEventListeners(document, 'mouseup');
    this.eventListenerUtils.attachEventListener(
      document,
      'mouseup',
      this.onMouseUp.bind(this)
    );
  }

  private onMouseDownOnBar(event: MouseEvent): void {
    this.onMouseDown(event);
    this.onMouseMove(event);
  }

  private onMouseMove(event: MouseEvent): void {
    const position =
      event.clientX - this.sliderClientPosition - this.handleWidth / 2;
    this.applyValue(this.positionToValue(position));
  }

  private onMouseUp(_event: MouseEvent): void {
    this.eventListenerUtils.detachEventListeners(document, 'mousemove');
    this.eventListenerUtils.detachEventListeners(document, 'mouseup');
  }

  private onTouchMove(event: TouchEvent): void {
    let touchInitiatedOnSlider = this.findTouch(
      event.changedTouches,
      this.touchIdentifier
    );
    if (touchInitiatedOnSlider === undefined) {
      return;
    }
    let touch = this.findTouch(event.touches, this.touchIdentifier) as Touch;
    const position: number =
      touch.clientX - this.sliderClientPosition - this.handleWidth / 2;
    this.applyValue(this.positionToValue(position));
  }

  private onTouchEnd(event: TouchEvent): void {
    let touchInitiatedOnSlider = this.findTouch(
      event.changedTouches,
      this.touchIdentifier
    );
    if (touchInitiatedOnSlider === undefined) {
      return;
    }
    this.touchIdentifier = undefined;
    this.eventListenerUtils.detachEventListeners(document, 'touchmove');
    this.eventListenerUtils.detachEventListeners(document, 'touchend');
  }

  private onHandleFocus(): void {
    const nativeElement = this.handleElement.nativeElement;
    this.eventListenerUtils.attachEventListener(
      nativeElement,
      'blur',
      this.onHandleBlur.bind(this)
    );
    this.eventListenerUtils.attachEventListener(
      nativeElement,
      'keydown',
      this.onKeyboardEvent.bind(this)
    );
  }

  private onHandleBlur(): void {
    const nativeElement = this.handleElement.nativeElement;
    this.eventListenerUtils.detachEventListeners(nativeElement, 'blur');
    this.eventListenerUtils.detachEventListeners(nativeElement, 'keydown');
    this.eventListenerUtils.detachEventListeners(nativeElement, 'keyup');
  }

  private onKeyboardEvent(event: KeyboardEvent): void {
    const keyHandler = this.getKeyHandler(event.code, this.rightToLeft);
    if (keyHandler === undefined) {
      return;
    }
    event.preventDefault();
    this.applyValue(keyHandler(this.value));
  }

  protected readonly stepDelta = 1 / 50;
  protected readonly pageDelta = 1 / 10;

  private getKeyHandler(
    keyCode: string,
    rightToLeft: boolean
  ): ((value: number) => number) | undefined {
    let increaseStep = (currentValue: number) => currentValue + this.stepDelta;
    let decreaseStep = (currentValue: number) => currentValue - this.stepDelta;
    let increasePage = (currentValue: number) => currentValue + this.pageDelta;
    let decreasePage = (currentValue: number) => currentValue - this.pageDelta;
    let stepLeft = rightToLeft ? increaseStep : decreaseStep;
    let stepRight = rightToLeft ? decreaseStep : increaseStep;
    let home = () => 0;
    let end = () => 1;

    switch (keyCode) {
      case 'ArrowUp':
        return increaseStep;
      case 'ArrowDown':
        return decreaseStep;
      case 'ArrowLeft':
        return stepLeft;
      case 'ArrowRight':
        return stepRight;
      case 'PageUp':
        return increasePage;
      case 'PageDown':
        return decreasePage;
      case 'Home':
        return home;
      case 'End':
        return end;
      default:
        return undefined;
    }
  }

  private applyValue(value: number): void {
    value = this.clampToRange(value);
    if (this.value !== value) {
      this.value = value;
      this.valueChange.emit(this.value);
    }
  }

  private clampToRange(value: number): number {
    return Math.min(Math.max(value, 0), 1);
  }
}
