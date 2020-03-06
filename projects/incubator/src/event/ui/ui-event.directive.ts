import {
  Directive,
  ElementRef,
  OnInit,
  Optional,
  TemplateRef,
} from '@angular/core';
import { EventService } from '@spartacus/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClickEvent,
  MouseDownEvent,
  MouseHoverEvent,
  MouseUpEvent,
} from './ui-event.model';

@Directive({
  selector: '[cxUiEvent]',
  inputs: ['uiEventType: cxUiEvent', 'target: cxUiEventTarget'],
})
export class UiEventDirective implements OnInit {
  target: string;
  uiEventType = 'click';

  constructor(
    private eventService: EventService,
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
      this.eventService.register(
        ClickEvent,
        fromEvent(element, 'click').pipe(
          map(ClickData => new ClickEvent({ ClickData }))
        )
      );
    }

    if (uiEventType === 'mousedown') {
      this.eventService.register(
        MouseDownEvent,
        fromEvent(element, 'mousedown').pipe(
          map(MouseDownData => new MouseDownEvent({ MouseDownData }))
        )
      );
    }
    if (uiEventType === 'mouseup') {
      this.eventService.register(
        MouseUpEvent,
        fromEvent(element, 'mouseup').pipe(
          map(MouseUpData => new MouseUpEvent({ MouseUpData }))
        )
      );
    }

    if (uiEventType === 'hover' || uiEventType === 'mouseover') {
      this.eventService.register(
        MouseHoverEvent,
        fromEvent(element, 'mouseover').pipe(
          map(MouseHoverData => new MouseHoverEvent({ MouseHoverData }))
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
