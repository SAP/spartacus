import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterNavigationComponent } from './footer-navigation.component';
import { ConfigModule, UrlTranslationModule } from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';
import { GenericLinkModule } from '../../ui/components/generic-link/generic-link.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        FooterNavigationComponent: { selector: 'cx-footer-navigation' }
      }
    }),
    GenericLinkModule,
    UrlTranslationModule
  ],
  declarations: [FooterNavigationComponent],
  entryComponents: [FooterNavigationComponent],
  exports: [FooterNavigationComponent]
})
export class FooterNavigationModule {}
