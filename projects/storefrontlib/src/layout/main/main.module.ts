import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalMessageComponentModule } from '../../cms-components/misc/global-message/global-message.module';
import { UserComponentModule } from '../../cms-components/user/user.module';
import { SeoModule } from '../../cms-structure/index';
import { PageSlotModule } from '../../cms-structure/page/slot/page-slot.module';
import { CmsModule } from '../../lib/cms/cms.module';
import { PageLayoutModule } from '../../lib/cms/page-layout/page-layout.module';
import { OutletRefModule } from '../../lib/outlet/outlet-ref/outlet-ref.module';
import { PwaModule } from './../../lib/pwa/pwa.module';
import { StorefrontComponent } from './storefront.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GlobalMessageComponentModule,
    UserComponentModule,
    CmsModule,
    OutletRefModule,
    PwaModule,
    PageLayoutModule,
    SeoModule,
    PageSlotModule,
  ],
  declarations: [StorefrontComponent],
  exports: [StorefrontComponent],
})
export class MainModule {}
