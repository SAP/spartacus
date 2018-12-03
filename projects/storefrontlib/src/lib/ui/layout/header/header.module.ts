import { RouterModule } from '@angular/router';
import { CurrencySelectorComponent } from './../../../site-context/currency-selector/currency-selector.component';
import { LanguageSelectorComponent } from './../../../site-context/language-selector/language-selector.component';
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
import { UrlTranslatorModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    SiteContextModule,
    CmsModule,
    LoginModule,
    RouterModule,
    PwaModule,
    UrlTranslatorModule
  ],
  declarations: [
    HeaderComponent,
    HeaderSkipperComponent,
    TertiaryBarComponent,
    MobileMenuComponent
  ],
  exports: [
    HeaderComponent,
    HeaderSkipperComponent,
    TertiaryBarComponent,
    MobileMenuComponent,
    LanguageSelectorComponent,
    CurrencySelectorComponent
  ]
})
export class HeaderModule {}
