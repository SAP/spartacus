import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseCoreModule } from '@spartacus/core';
import { GlobalMessageComponentModule } from './cms-components/misc/global-message/global-message.module';
import { OutletRefModule } from './cms-structure/outlet/outlet-ref/outlet-ref.module';
import { OutletModule } from './cms-structure/outlet/outlet.module';
import { PageComponentModule } from './cms-structure/page/component/page-component.module';
import { PageLayoutModule } from './cms-structure/page/page-layout/page-layout.module';
import { PageSlotModule } from './cms-structure/page/slot/page-slot.module';
import { PwaModule } from './cms-structure/pwa/pwa.module';
import { RoutingModule } from './cms-structure/routing/routing.module';
import { SeoModule } from './cms-structure/seo/seo.module';
import { KeyboardFocusModule } from './layout/a11y/keyboard-focus/keyboard-focus.module';
import { SkipLinkModule } from './layout/a11y/skip-link/skip-link.module';
import { LayoutModule } from './layout/layout.module';
import { StorefrontComponentModule } from './layout/main/storefront-component.module';
import { MediaModule } from './shared/components/media/media.module';

@NgModule({
  imports: [
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
    RoutingModule.forRoot(),
    MediaModule.forRoot(),
    OutletModule.forRoot(),
    StorefrontComponentModule,
  ],
  exports: [LayoutModule, StorefrontComponentModule],
})
export class BaseStorefrontModule {}
