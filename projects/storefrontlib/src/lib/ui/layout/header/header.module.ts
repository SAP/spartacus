import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UrlTranslationModule } from '@spartacus/core';

import { CmsModule } from '../../../cms';
import { LoginModule } from '../../../user';
import { PwaModule } from '../../../pwa/pwa.module';

import { HeaderComponent } from './header.component';
import { HardcodedSiteLinks } from './sitelinks-slot.interceptor';

import { HeaderSkipperComponent } from './header-skipper/header-skipper.component';

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
      useClass: HardcodedSiteLinks,
      multi: true
    }
  ]
})
export class HeaderModule {}
