import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './autofocus/index';
import { EscapeFocusDirective } from './escape/index';
import { FocusDirective } from './focus.directive';
import { KEYBOARD_FOCUS_TOKEN } from './keyboard-focus.token';
import { LockFocusDirective } from './lock/index';
import { PersistFocusDirective } from './persist/index';
import { TabFocusDirective } from './tab/index';
import { TrapFocusDirective } from './trap/index';

const directives = [
  PersistFocusDirective,
  AutoFocusDirective,
  EscapeFocusDirective,
  LockFocusDirective,
  TrapFocusDirective,
  TabFocusDirective,
  FocusDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...directives],
  exports: [...directives],
  providers: [{ provide: KEYBOARD_FOCUS_TOKEN, useValue: { focus } }],
})
export class KeyboardFocusModule {}
