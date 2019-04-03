import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UrlTranslationModule } from '@spartacus/core';
import { PageSlotModule } from '../../../../cms-structure/page/slot/page-slot.module';
import { CmsModule } from '../../../cms/cms.module';
import { PwaModule } from '../../../pwa/pwa.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    RouterModule,
    PwaModule,
    UrlTranslationModule,
    PageSlotModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
