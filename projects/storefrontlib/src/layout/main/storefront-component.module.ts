import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalMessageComponentModule } from '../../cms-components/misc/global-message/global-message.module';
import { OutletRefModule } from '../../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { OutletModule } from '../../cms-structure/outlet/outlet.module';
import { PageLayoutModule } from '../../cms-structure/page/page-layout/page-layout.module';
import { PageSlotModule } from '../../cms-structure/page/slot/page-slot.module';
import { StorefrontComponent } from './storefront.component';
import { KeyboardFocusModule } from '../a11y/keyboard-focus/keyboard-focus.module';
import { SkipLinkModule } from '../a11y/skip-link/skip-link.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GlobalMessageComponentModule,
    OutletModule,
    OutletRefModule,
    PageLayoutModule,
    PageSlotModule,
    KeyboardFocusModule,
    SkipLinkModule,
  ],
  declarations: [StorefrontComponent],
  exports: [StorefrontComponent],
})
export class StorefrontComponentModule {}
