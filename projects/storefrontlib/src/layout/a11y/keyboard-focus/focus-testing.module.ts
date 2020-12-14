import { Directive, Input, NgModule } from '@angular/core';
import { FocusConfig } from './keyboard-focus.model';

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboardFocusDirective {
  @Input('cxFocus') protected config: FocusConfig = {};
}

@NgModule({
  declarations: [MockKeyboardFocusDirective],
  exports: [MockKeyboardFocusDirective],
})
export class KeyboardFocusTestingModule {}
