import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule } from '@spartacus/core';
import { GlobalMessageComponentModule } from '../../cms-components/misc/global-message/global-message.module';
import { OutletRefModule } from '../../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { OutletModule } from '../../cms-structure/outlet/outlet.module';
import { PageLayoutModule } from '../../cms-structure/page/page-layout/page-layout.module';
import { PageSlotModule } from '../../cms-structure/page/slot/page-slot.module';
import { PwaModule } from '../../cms-structure/pwa/pwa.module';
import { SeoModule } from '../../cms-structure/seo/seo.module';
import { AnonymousConsentsDialogModule } from '../../shared/components/anonymous-consents-dialog/anonymous-consents-dialog.module';
import { KeyboardFocusModule } from '../a11y/keyboard-focus/keyboard-focus.module';
import { SkipLinkModule } from '../a11y/skip-link/skip-link.module';
import { StorefrontComponent } from './storefront.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GlobalMessageComponentModule,
    OutletModule,
    OutletRefModule,
    PwaModule,
    PageLayoutModule,
    SeoModule,
    PageSlotModule,
    AnonymousConsentsDialogModule,
    FeaturesConfigModule,

    SkipLinkModule,
    KeyboardFocusModule,
  ],
  declarations: [StorefrontComponent],
  exports: [StorefrontComponent],
})
export class MainModule {}
