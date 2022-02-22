import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { VisualViewerAnimationSliderService } from './visual-viewer-animation-slider.service';

@Component({
  selector: 'cx-epd-visualization-animation-slider',
  templateUrl: './visual-viewer-animation-slider.component.html',
  providers: [VisualViewerAnimationSliderService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualViewerAnimationSliderComponent implements AfterViewInit {
  constructor(
    protected visualViewerAnimationSliderService: VisualViewerAnimationSliderService
  ) {}

  ngAfterViewInit(): void {
    this.visualViewerAnimationSliderService.initialize();
  }

  @Input()
  set hidden(hidden: boolean) {
    this.visualViewerAnimationSliderService.hidden = hidden;
  }
  get hidden(): boolean {
    return this.visualViewerAnimationSliderService.hidden;
  }

  @Input()
  set value(value: number) {
    this.visualViewerAnimationSliderService.value = value;
  }
  get value(): number {
    return this.visualViewerAnimationSliderService.value;
  }
  @Output()
  valueChange = this.visualViewerAnimationSliderService.valueChange;

  get position(): number {
    return this.visualViewerAnimationSliderService.position;
  }

  @Input()
  set disabled(disabled: boolean) {
    this.visualViewerAnimationSliderService.disabled = disabled;
  }
  get disabled(): boolean {
    return this.visualViewerAnimationSliderService.disabled;
  }

  get initialized(): boolean {
    return this.visualViewerAnimationSliderService.initialized;
  }
  @Output()
  initializedChange: EventEmitter<boolean> =
    this.visualViewerAnimationSliderService.initializedChange;

  @ViewChild('bar')
  set barElement(barElement: ElementRef) {
    this.visualViewerAnimationSliderService.barElement = barElement;
  }

  @ViewChild('handle')
  set handleElement(handleElement: ElementRef) {
    this.visualViewerAnimationSliderService.handleElement = handleElement;
  }
}
