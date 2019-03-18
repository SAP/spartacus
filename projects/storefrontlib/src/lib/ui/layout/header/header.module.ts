import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UrlTranslationModule } from '@spartacus/core';

import { CmsModule } from '../../../cms/cms.module';
import { PwaModule } from '../../../pwa/pwa.module';
import { LoginModule } from '../../../user/login/login.module';

import { HeaderComponent } from './header.component';

import { HeaderSkipperComponent } from './header-skipper/header-skipper.component';
import { PageSlotModule } from '../../../../cms-structure/page/slot/page-slot.module';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    LoginModule,
    RouterModule,
    PwaModule,
    UrlTranslationModule,
    PageSlotModule
  ],
  declarations: [HeaderComponent, HeaderSkipperComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
