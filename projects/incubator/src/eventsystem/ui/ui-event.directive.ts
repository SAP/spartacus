import {
  Directive,
  ElementRef,
  OnInit,
  Optional,
  TemplateRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from '../events/event.emitter';
import {
  ClickEvent,
  MouseDownEvent,
  MouseHoverEvent,
  MouseUpEvent,
} from './model';

@Directive({
  selector: '[cxUiEvent]',
  inputs: ['uiEventType: cxUiEvent', 'target: cxUiEventTarget'],
})
export class UiEventDirective implements OnInit {
  target: string;
  uiEventType = 'click';

  constructor(
    private eventEmitter: EventEmitter,
    private elementRef: ElementRef,
    @Optional() private template: TemplateRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.attach(this.findElement(), this.uiEventType);
  }

  private attach(element: HTMLElement, uiEventType: string) {
    if (!element) {
      return;
    }

    if (uiEventType === 'click') {
      this.eventEmitter.attach(
        ClickEvent,
        fromEvent(element, 'click').pipe(map(ClickData => ({ ClickData })))
      );
    }

    if (uiEventType === 'mousedown') {
      this.eventEmitter.attach(
        MouseDownEvent,
        fromEvent(element, 'mousedown').pipe(
          map(MouseDownData => ({ MouseDownData }))
        )
      );
    }
    if (uiEventType === 'mouseup') {
      this.eventEmitter.attach(
        MouseUpEvent,
        fromEvent(element, 'mouseup').pipe(
          map(MouseUpData => ({ MouseUpData }))
        )
      );
    }

    if (uiEventType === 'hover' || uiEventType === 'mouseover') {
      this.eventEmitter.attach(
        MouseHoverEvent,
        fromEvent(element, 'mouseover').pipe(
          map(MouseHoverData => ({ MouseHoverData }))
        )
      );
    }
  }

  private findElement(): HTMLElement {
    let element = this.template
      ? this.template.elementRef.nativeElement
      : this.elementRef.nativeElement;

    if (this.target === 'parent') {
      element = (<HTMLElement>element).parentElement;
    }
    if (this.target === 'grandparent') {
      element = (<HTMLElement>element).parentElement.parentElement;
    }

    return element;
  }
}
