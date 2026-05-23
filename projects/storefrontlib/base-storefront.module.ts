/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseCoreModule } from '@spartacus/core';
import { GlobalMessageComponentModule } from './cms-components/misc/global-message/global-message.module';
import { CmsLcpModule } from './cms-structure/cms-lcp-context/cms-lcp.module';
import { OutletRefModule } from './cms-structure/outlet/outlet-ref/outlet-ref.module';
import { OutletModule } from './cms-structure/outlet/outlet.module';
import { PageComponentModule } from './cms-structure/page/component/page-component.module';
import { PageLayoutModule } from './cms-structure/page/page-layout/page-layout.module';
import { PageSlotModule } from './cms-structure/page/slot/page-slot.module';
import { PwaModule } from './cms-structure/pwa/pwa.module';
import {
  RoutingModule,
  RoutingModuleV2,
} from './cms-structure/routing/routing.module';
import { SeoModule } from './cms-structure/seo/seo.module';
import { KeyboardFocusModule } from './layout/a11y/keyboard-focus/keyboard-focus.module';
import { SkipLinkModule } from './layout/a11y/skip-link/skip-link.module';
import { LayoutModule } from './layout/layout.module';
import { StorefrontComponentModule } from './layout/main/storefront-component.module';
import { MediaModule } from './shared/components/media/media.module';

const sharedImports = [
  BaseCoreModule.forRoot(),
  RouterModule,
  GlobalMessageComponentModule,
  OutletModule,
  OutletRefModule,
  PwaModule,
  PageLayoutModule,
  SeoModule,
  PageComponentModule.forRoot(),
  PageSlotModule,
  SkipLinkModule,
  KeyboardFocusModule,
  LayoutModule,
  MediaModule.forRoot(),
  OutletModule.forRoot(),
  CmsLcpModule.forRoot(),
  StorefrontComponentModule,
];

/**
 * Default Spartacus storefront module.
 *
 * Uses `initialNavigation: 'enabledBlocking'` via `RoutingModule.forRoot()`.
 * Identical to the baseline `develop` branch behavior.
 */
@NgModule({
  imports: [...sharedImports, RoutingModule.forRoot()],
  exports: [LayoutModule, StorefrontComponentModule],
})
export class BaseStorefrontModule {}

/**
 * New hydration-compatible Spartacus storefront module.
 *
 * Uses `RoutingModuleV2.forRoot()` which provides an `APP_INITIALIZER` that
 * manually triggers and awaits navigation instead of using `enabledBlocking`.
 * Compatible with Angular hydration (avoids NG05001).
 *
 * Use together with `AppRoutingModuleV2`.
 */
@NgModule({
  imports: [...sharedImports, RoutingModuleV2.forRoot()],
  exports: [LayoutModule, StorefrontComponentModule],
})
export class BaseStorefrontModuleV2 {}
