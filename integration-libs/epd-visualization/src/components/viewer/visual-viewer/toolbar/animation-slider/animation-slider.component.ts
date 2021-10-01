import {
  Component,
  Input,
  Output,
  OnDestroy,
  AfterViewInit,
  HostBinding,
  ViewChild,
} from '@angular/core';

import { AnimationSliderService } from './animation-slider.service';

import { SliderElementDirective } from './animation-slider-element.directive';
import { SliderHandleDirective } from './animation-slider-handle.directive';

@Component({
  selector: 'cx-animation-slider',
  templateUrl: './animation-slider.component.html',
  providers: [AnimationSliderService],
})
export class AnimationSliderComponent implements AfterViewInit, OnDestroy {
  constructor(protected animationSliderService: AnimationSliderService) {}

  ngAfterViewInit(): void {
    this.animationSliderService.initialize();
  }
  ngOnDestroy(): void {
    this.animationSliderService.destroy();
  }

  @Input()
  set value(value: number) {
    if (
      typeof value === 'number' &&
      this.animationSliderService.value !== value
    ) {
      this.animationSliderService.value = value;
    }
  }
  get value(): number {
    return this.animationSliderService.value;
  }
  @Output()
  valueChange = this.animationSliderService.valueChange;

  @Input()
  set disabled(disabled: boolean) {
    if (this.animationSliderService.disabled !== disabled) {
      this.animationSliderService.disabled = disabled;
    }
  }
  get disabled(): boolean {
    return this.animationSliderService.disabled;
  }

  @Input() set ariaLabel(ariaLabel: string) {
    this.animationSliderService.ariaLabel = ariaLabel;
  }

  @ViewChild('bar', { read: SliderElementDirective })
  set barElement(barElement: SliderElementDirective) {
    this.animationSliderService.barElement = barElement;
  }

  @ViewChild('handle', { read: SliderHandleDirective })
  set handleElement(handleElement: SliderHandleDirective) {
    this.animationSliderService.handleElement = handleElement;
  }

  @HostBinding('attr.disabled')
  set sliderElementDisabledAttr(sliderElementDisabledAttr: string | undefined) {
    this.animationSliderService.sliderElementDisabledAttr =
      sliderElementDisabledAttr;
  }
}
