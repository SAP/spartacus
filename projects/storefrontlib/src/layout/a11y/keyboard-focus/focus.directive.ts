import { Directive, Input } from '@angular/core';
import { FocusConfig } from './keyboard-focus.model';
import { LockFocusDirective } from './lock';

@Directive({
  selector: '[cxFocus]',
})
export class FocusDirective extends LockFocusDirective {
  protected defaultConfig: FocusConfig = {};
  // tslint:disable-next-line: no-input-rename
  @Input('cxFocus') protected config: FocusConfig = {};
}
