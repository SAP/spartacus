import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import { LoginComponent } from './login.component';

/**
 * @deprecated since 3.2, use @spartacus/user package instead.
 */
@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, PageSlotModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        LoginComponent: {
          component: LoginComponent,
        },
      },
    }),
  ],
  declarations: [LoginComponent],
  entryComponents: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
