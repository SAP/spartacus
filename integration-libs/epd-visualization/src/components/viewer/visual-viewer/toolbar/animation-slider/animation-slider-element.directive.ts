import {
  Directive,
  ElementRef,
  Renderer2,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';
import { EventListenerHelper } from './events/event-listener-helper';
import { EventListener } from './events/event-listener';

@Directive({
  selector: '[cxAnimationSliderElement]',
})
export class SliderElementDirective {
  private _position: number = 0;
  get position(): number {
    return this._position;
  }

  private _dimension: number = 0;
  get dimension(): number {
    return this._dimension;
  }

  @HostBinding('style.opacity')
  opacity: number = 1;

  @HostBinding('style.left')
  left: string = '';

  private eventListenerHelper: EventListenerHelper;
  private eventListeners: EventListener[] = [];

  constructor(
    protected elemRef: ElementRef,
    protected renderer: Renderer2,
    protected changeDetectionRef: ChangeDetectorRef
  ) {
    this.eventListenerHelper = new EventListenerHelper(this.renderer);
  }

  hide(): void {
    this.opacity = 0;
  }

  show(): void {
    this.opacity = 1;
  }

  isVisible(): boolean {
    return this.opacity !== 0;
  }

  setPosition(pos: number): void {
    if (this._position !== pos && !this.isRefDestroyed()) {
      this.changeDetectionRef.markForCheck();
    }
    this._position = pos;
    this.left = Math.round(pos) + 'px';
  }

  calculateDimension(): void {
    const val: ClientRect = this.getBoundingClientRect();
    this._dimension = val.right - val.left;
  }

  getBoundingClientRect(): ClientRect {
    return this.elemRef.nativeElement.getBoundingClientRect();
  }

  on(eventName: string, callback: (event: any) => void): void {
    const listener: EventListener =
      this.eventListenerHelper.attachEventListener(
        this.elemRef.nativeElement,
        eventName,
        callback
      );
    this.eventListeners.push(listener);
  }

  onPassive(eventName: string, callback: (event: any) => void): void {
    const listener: EventListener =
      this.eventListenerHelper.attachPassiveEventListener(
        this.elemRef.nativeElement,
        eventName,
        callback
      );
    this.eventListeners.push(listener);
  }

  off(eventName?: string): void {
    let listenersToKeep: EventListener[];
    let listenersToRemove: EventListener[];
    if (eventName !== undefined) {
      listenersToKeep = this.eventListeners.filter(
        (event: EventListener) => event.eventName !== eventName
      );
      listenersToRemove = this.eventListeners.filter(
        (event: EventListener) => event.eventName === eventName
      );
    } else {
      listenersToKeep = [];
      listenersToRemove = this.eventListeners;
    }

    for (const listener of listenersToRemove) {
      this.eventListenerHelper.detachEventListener(listener);
    }

    this.eventListeners = listenersToKeep;
  }

  private isRefDestroyed(): boolean {
    return (
      this.changeDetectionRef === undefined ||
      (this.changeDetectionRef as any)['destroyed']
    );
  }
}
