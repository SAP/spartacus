import { CmsModule } from './../../../cms/cms.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SiteContextModule } from './../../../site-context/site-context.module';
import { HeaderComponent } from './header.component';
import { HeaderSkipperComponent } from './header-skipper/header-skipper.component';
import { TertiaryBarComponent } from './tertiary-bar/tertiary-bar.component';
import { LoginModule } from '../../../user/components/login/login.module';

@NgModule({
  imports: [CommonModule, SiteContextModule, CmsModule, LoginModule],
  declarations: [HeaderComponent, HeaderSkipperComponent, TertiaryBarComponent],
  exports: [HeaderComponent, HeaderSkipperComponent, TertiaryBarComponent]
})
export class HeaderModule {}
