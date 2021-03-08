import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FocusConfig } from './keyboard-focus.model';
import { LockFocusDirective } from './lock/lock-focus.directive';
import { KeyboardFocusService } from './services/keyboard-focus.service';

@Directive({
  selector: '[cxFocus]',
})
export class FocusDirective extends LockFocusDirective {
  protected defaultConfig: FocusConfig = {};
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('cxFocus') protected config: FocusConfig = {};

  constructor(
    protected elementRef: ElementRef,
    protected service: KeyboardFocusService,
    protected renderer: Renderer2
  ) {
    super(elementRef, service, renderer);
  }
}
