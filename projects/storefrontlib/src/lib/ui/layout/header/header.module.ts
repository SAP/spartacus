import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UrlTranslationModule } from '@spartacus/core';

import { CmsModule } from '../../../cms/cms.module';
import { PwaModule } from '../../../pwa/pwa.module';
import { LoginModule } from '../../../user/login/login.module';

import { HeaderComponent } from './header.component';

import { HeaderSkipperComponent } from './header-skipper/header-skipper.component';
import { HardcodedBreadcrumb } from './breadcrumb-slot.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    LoginModule,
    RouterModule,
    PwaModule,
    UrlTranslationModule
  ],
  declarations: [HeaderComponent, HeaderSkipperComponent],
  exports: [HeaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HardcodedBreadcrumb,
      multi: true
    }
  ]
})
export class HeaderModule {}
