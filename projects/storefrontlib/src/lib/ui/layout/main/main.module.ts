import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalMessageComponentModule } from '../../../../cms-components/misc/global-message/global-message.module';
import { SeoModule } from '../../../../cms-structure/index';
import { PageSlotModule } from '../../../../cms-structure/page/slot/page-slot.module';
import { CmsModule } from '../../../cms/cms.module';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { OutletRefModule } from '../../../outlet/outlet-ref/outlet-ref.module';
import { UserComponentModule } from '../../../user/user.module';
import { UiFrameworkModule } from '../../ui-framework/ui-framework.module';
import { PwaModule } from './../../../pwa/pwa.module';
import { StorefrontComponent } from './storefront.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GlobalMessageComponentModule,
    UserComponentModule,
    CmsModule,
    UiFrameworkModule,
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
