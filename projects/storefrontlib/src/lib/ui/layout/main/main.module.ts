import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GlobalMessageModule } from '../../../global-message/global-message.module';
import { CmsModule } from '../../../cms/cms.module';
import { LoginModule } from '../../../user/components/login/login.module';
import { SiteContextModule } from '../../../site-context/site-context.module';
import { MaterialModule } from '../../../material.module';

import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GlobalMessageModule,
    CmsModule,
    LoginModule,
    SiteContextModule,
    MaterialModule
  ],
  declarations: [MainComponent, HeaderComponent, FooterComponent],
  exports: [MainComponent, HeaderComponent, FooterComponent]
})
export class MainModule {}
