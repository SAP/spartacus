import { RouterModule } from '@angular/router';
import { CmsModule } from './../../../cms/cms.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SiteContextModule } from './../../../site-context/site-context.module';
import { HeaderComponent } from './header.component';
import { HeaderSkipperComponent } from './header-skipper/header-skipper.component';
import { TertiaryBarComponent } from './tertiary-bar/tertiary-bar.component';
import { LoginModule } from '../../../user/components/login/login.module';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { PwaModule } from '../../../pwa/pwa.module';
import {
  LanguageSelectorModule,
  CurrencySelectorModule
} from '../../../site-context';

@NgModule({
  imports: [
    CommonModule,
    SiteContextModule,
    LanguageSelectorModule,
    CurrencySelectorModule,
    CmsModule,
    LoginModule,
    RouterModule,
    PwaModule
  ],
  declarations: [
    HeaderComponent,
    HeaderSkipperComponent,
    TertiaryBarComponent,
    MobileMenuComponent
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
