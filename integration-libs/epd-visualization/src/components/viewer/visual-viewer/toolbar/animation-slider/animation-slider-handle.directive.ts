import {
  Directive,
  ElementRef,
  Renderer2,
  HostBinding,
  ChangeDetectorRef,
} from '@angular/core';
import { SliderElementDirective } from './animation-slider-element.directive';

@Directive({
  selector: '[cxAnimationSliderHandle]',
})
export class SliderHandleDirective extends SliderElementDirective {
  @HostBinding('class.cx-animation-slider-active')
  active: boolean = false;

  @HostBinding('attr.role')
  role: string = '';

  @HostBinding('attr.tabindex')
  tabindex: string = '';

  @HostBinding('attr.aria-orientation')
  ariaOrientation: string = '';

  @HostBinding('attr.aria-label')
  ariaLabel: string = '';

  @HostBinding('attr.aria-valuenow')
  ariaValueNow: string = '';

  @HostBinding('attr.aria-valuetext')
  ariaValueText: string = '';

  @HostBinding('attr.aria-valuemin')
  ariaValueMin: string = '';

  @HostBinding('attr.aria-valuemax')
  ariaValueMax: string = '';

  focus(): void {
    this.elemRef.nativeElement.focus();
  }

  constructor(
    elemRef: ElementRef,
    renderer: Renderer2,
    changeDetectionRef: ChangeDetectorRef
  ) {
    super(elemRef, renderer, changeDetectionRef);
  }
}
