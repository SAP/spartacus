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
import { UiEvent } from './model';

@Directive({
  selector: '[cxClickEvent]',
  inputs: ['selector: cxClickEvent'],
})
export class ClickEventDirective implements OnInit {
  selector: string;

  constructor(
    private eventEmitter: EventEmitter,
    private elementRef: ElementRef,
    @Optional() private template: TemplateRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.attach(this.findElement());
  }

  private attach(element: HTMLElement) {
    if (!element) {
      return;
    }

    this.eventEmitter.attach(
      UiEvent,
      fromEvent(element, 'click').pipe(map(UiData => ({ UiData })))
    );
  }

  private findElement(): HTMLElement {
    let element = this.template
      ? this.template.elementRef.nativeElement
      : this.elementRef.nativeElement;

    if (this.selector === 'parent') {
      element = (<HTMLElement>element).parentElement;
    }
    if (this.selector === 'grandparent') {
      element = (<HTMLElement>element).parentElement.parentElement;
    }

    return element;
  }
}
