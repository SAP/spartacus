import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  UrlTranslationModule,
  UserModule,
} from '@spartacus/core';
// import { CmsModule } from '../../cms/cms.module';
// import { BootstrapModule } from '../../bootstrap.module';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // CmsModule,
    // BootstrapModule,
    UserModule,
    UrlTranslationModule,
    PageSlotModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        LoginComponent: {
          selector: 'cx-login',
        },
      },
    }),
  ],
  declarations: [LoginComponent],
  entryComponents: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
