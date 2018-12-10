import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterNavigationComponent } from './footer-navigation.component';
import { ConfigModule } from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        FooterNavigationComponent: { selector: 'cx-footer-navigation' }
      }
    })
  ],
  declarations: [FooterNavigationComponent],
  entryComponents: [FooterNavigationComponent],
  exports: [FooterNavigationComponent]
})
export class FooterNavigationModule {}
