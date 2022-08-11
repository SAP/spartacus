import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { HamburgerMenuComponent } from './hamburger-menu.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        HamburgerMenuComponent: {
          component: HamburgerMenuComponent,
        },
      },
    }),
  ],
  declarations: [HamburgerMenuComponent],
  exports: [HamburgerMenuComponent],
})
export class HamburgerMenuModule {}
