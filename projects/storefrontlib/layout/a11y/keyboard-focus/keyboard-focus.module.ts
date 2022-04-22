import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule, provideDefaultConfig } from '@spartacus/core';
import { defaultKeyboardFocusConfig } from './config/default-keyboard-focus.config';
import { FocusDirective } from './focus.directive';
import { OnNavigateFocusService } from './on-navigate/on-navigate-focus.service';

const directives = [
  // PersistFocusDirective,
  // VisibleFocusDirective,
  // BlockFocusDirective,
  // AutoFocusDirective,
  // EscapeFocusDirective,
  // LockFocusDirective,
  // TrapFocusDirective,
  // TabFocusDirective,
  FocusDirective,
];

/**
 * @deprecated since 4.2, refer to spartacus issues (#13762)
 * Remove the router module as well as it was part of the old initiative for scroll positiioning
 */
@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultKeyboardFocusConfig),
    RouterModule,
  ],
  declarations: [...directives],
  providers: [
    provideDefaultConfig(defaultKeyboardFocusConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: keyboardFocusFactory,
      deps: [OnNavigateFocusService],
      multi: true,
    },
  ],
  exports: [...directives],
})
export class KeyboardFocusModule {}

/**
 *  @deprecated since 4.2, refer to spartacus issues (#13762)
 *  Start keyboard focus services on app initialization.
 */
export function keyboardFocusFactory(
  onNavigateFocusService: OnNavigateFocusService
) {
  const isReady = () => onNavigateFocusService.initializeWithConfig();
  return isReady;
}
