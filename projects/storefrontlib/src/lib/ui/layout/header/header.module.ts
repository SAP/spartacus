import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { UrlTranslationModule } from '@spartacus/core';

import { CmsModule } from './../../../cms/cms.module';
import { PwaModule } from '../../../pwa/pwa.module';
import { LoginModule } from '../../../user/login/login.module';

import { HeaderComponent } from './header.component';

import { interceptors } from './';
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
  exports: [HeaderComponent]
})
export class HeaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HeaderModule,
      providers: [...interceptors]
    };
  }
}
