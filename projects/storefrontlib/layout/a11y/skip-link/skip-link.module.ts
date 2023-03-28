/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  ConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { OutletPosition } from '../../../cms-structure/outlet/outlet.model';
import { OutletService } from '../../../cms-structure/outlet/outlet.service';
import { KeyboardFocusModule } from '../keyboard-focus/keyboard-focus.module';
import { SkipLinkComponent } from './component/skip-link.component';
import { defaultSkipLinkConfig } from './config/default-skip-link.config';
import { SkipLinkDirective } from './directive/skip-link.directive';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(defaultSkipLinkConfig),
    KeyboardFocusModule,
  ],
  declarations: [SkipLinkComponent, SkipLinkDirective],
  exports: [SkipLinkDirective],
  providers: [
    provideDefaultConfig(defaultSkipLinkConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: skipLinkFactory,
      deps: [OutletService],
      multi: true,
    },
  ],
})
export class SkipLinkModule {}

/**
 * Adds the skip link component before the cx-storefront.
 */
export function skipLinkFactory(outletService: OutletService): () => void {
  const isReady = () => {
    outletService.add(
      'cx-storefront',
      SkipLinkComponent,
      OutletPosition.BEFORE
    );
  };
  return isReady;
}
